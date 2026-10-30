// Retail Multi-Segment Profiler - beginner-friendly JavaScript demo
// This prototype uses rule-based scoring, not a trained machine-learning model.

let customers = [];

const personas = ["Champions", "Loyal Regulars", "Promising New", "At-Risk Big Spenders", "Dormant / One-Time"];

document.getElementById("demoBtn").addEventListener("click", loadDemoData);
document.getElementById("fileInput").addEventListener("change", handleFile);
document.getElementById("searchInput").addEventListener("input", renderTable);
document.getElementById("personaFilter").addEventListener("change", renderTable);
document.getElementById("minScore").addEventListener("change", renderTable);

function loadDemoData() {
  const rows = [];
  const today = new Date();
  // A small, generated dataset to make the project usable immediately.
  for (let i = 1; i <= 120; i++) {
    const group = i % 5;
    let orders, spend, recency;
    if (group === 0) { orders = randomInt(12, 25); spend = randomInt(900, 2600); recency = randomInt(1, 20); }
    else if (group === 1) { orders = randomInt(7, 15); spend = randomInt(500, 1400); recency = randomInt(5, 45); }
    else if (group === 2) { orders = randomInt(1, 5); spend = randomInt(80, 500); recency = randomInt(1, 35); }
    else if (group === 3) { orders = randomInt(5, 12); spend = randomInt(700, 1900); recency = randomInt(80, 220); }
    else { orders = randomInt(1, 3); spend = randomInt(20, 250); recency = randomInt(100, 360); }
    rows.push({ customerId: "C" + String(1000 + i), orders, spend, recency, diversity: randomInt(1, 8) });
  }
  customers = buildCustomerProfiles(rows);
  document.getElementById("fileStatus").textContent = "Demo data loaded: 120 sample customers.";
  refreshDashboard();
}

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const rows = parseCSV(e.target.result);
      const profiles = aggregateTransactions(rows);
      if (!profiles.length) throw new Error("No valid customer records found. Check the CSV columns.");
      customers = buildCustomerProfiles(profiles);
      document.getElementById("fileStatus").textContent = `Loaded ${file.name}: ${customers.length} customers.`;
      refreshDashboard();
    } catch (error) {
      document.getElementById("fileStatus").textContent = "Could not read file: " + error.message;
    }
  };
  reader.readAsText(file);
}

// Basic CSV parser supporting quoted values and commas inside quotes.
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const splitLine = line => {
    const result = []; let value = ""; let quoted = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') { value += '"'; i++; }
        else quoted = !quoted;
      } else if (ch === "," && !quoted) { result.push(value); value = ""; }
      else value += ch;
    }
    result.push(value);
    return result;
  };
  const headers = splitLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ""));
  return lines.slice(1).map(line => {
    const values = splitLine(line);
    const row = {};
    headers.forEach((header, index) => row[header] = (values[index] || "").trim());
    return row;
  });
}

function aggregateTransactions(rows) {
  const grouped = {};
  rows.forEach(row => {
    const id = row.customerid || row.customer_id || row.customer;
    const invoice = row.invoice || row.invoiceno || row.invoicenumber;
    const quantity = Number(row.quantity);
    const price = Number(row.price || row.unitprice);
    const date = new Date(row.invoicedate || row.date);
    if (!id || !Number.isFinite(quantity) || !Number.isFinite(price) || quantity <= 0 || price < 0) return;
    if (invoice && invoice.toUpperCase().startsWith("C")) return; // skip cancellations in basic version
    if (!grouped[id]) grouped[id] = { customerId: id, invoices: new Set(), spend: 0, dates: [], products: new Set() };
    grouped[id].invoices.add(invoice || ("row-" + Math.random()));
    grouped[id].spend += quantity * price;
    if (!isNaN(date.getTime())) grouped[id].dates.push(date);
    const product = row.stockcode || row.description;
    if (product) grouped[id].products.add(product);
  });
  const allDates = Object.values(grouped).flatMap(c => c.dates);
  const cutoff = allDates.length ? new Date(Math.max(...allDates.map(d => d.getTime()))) : new Date();
  return Object.values(grouped).map(c => ({
    customerId: c.customerId,
    orders: c.invoices.size,
    spend: c.spend,
    recency: c.dates.length ? Math.round((cutoff - new Date(Math.max(...c.dates.map(d => d.getTime())))) / 86400000) : 0,
    diversity: c.products.size || 1
  }));
}

function buildCustomerProfiles(rows) {
  const maxOrders = Math.max(...rows.map(c => c.orders), 1);
  const maxSpend = Math.max(...rows.map(c => c.spend), 1);
  const maxRecency = Math.max(...rows.map(c => c.recency), 1);
  return rows.map(c => {
    const orderScore = c.orders / maxOrders;
    const spendScore = c.spend / maxSpend;
    const recencyScore = 1 - (c.recency / maxRecency);
    const score = Math.max(1, Math.min(99, Math.round((orderScore * 30 + spendScore * 35 + recencyScore * 25 + Math.min(c.diversity / 8, 1) * 10) * 100)));
    let persona;
    if (c.orders >= maxOrders * .65 && c.spend >= maxSpend * .45 && c.recency < maxRecency * .25) persona = "Champions";
    else if (c.orders >= maxOrders * .4 && c.recency < maxRecency * .45) persona = "Loyal Regulars";
    else if (c.spend >= maxSpend * .35 && c.recency >= maxRecency * .45) persona = "At-Risk Big Spenders";
    else if (c.recency < maxRecency * .3 && c.orders <= maxOrders * .35) persona = "Promising New";
    else persona = "Dormant / One-Time";
    return { ...c, score, persona };
  });
}

function refreshDashboard() {
  document.getElementById("totalCustomers").textContent = customers.length.toLocaleString();
  const revenue = customers.reduce((sum, c) => sum + c.spend, 0);
  document.getElementById("totalRevenue").textContent = formatMoney(revenue);
  document.getElementById("highValueCount").textContent = customers.filter(c => c.score >= 70).length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  document.getElementById("avgOrderValue").textContent = formatMoney(totalOrders ? revenue / totalOrders : 0);
  const filter = document.getElementById("personaFilter");
  const selected = filter.value;
  filter.innerHTML = '<option value="all">All personas</option>' + personas.map(p => `<option value="${p}">${p}</option>`).join("");
  filter.value = personas.includes(selected) ? selected : "all";
  renderPersonaChart();
  renderTable();
}

function renderPersonaChart() {
  const counts = Object.fromEntries(personas.map(p => [p, customers.filter(c => c.persona === p).length]));
  const max = Math.max(...Object.values(counts), 1);
  document.getElementById("personaChart").innerHTML = personas.map(p => {
    const count = counts[p], percent = Math.round(count / Math.max(customers.length, 1) * 100);
    return `<div class="bar-row"><span>${p}</span><div class="bar-track"><div class="bar-fill" style="width:${count / max * 100}%"></div></div><b>${percent}%</b></div>`;
  }).join("");
}

function renderTable() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const persona = document.getElementById("personaFilter").value;
  const minimum = Number(document.getElementById("minScore").value);
  const filtered = customers.filter(c => c.customerId.toLowerCase().includes(search) && (persona === "all" || c.persona === persona) && c.score >= minimum)
    .sort((a, b) => b.score - a.score);
  const tbody = document.getElementById("customerTable");
  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty">No customers match these filters.</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.slice(0, 250).map(c => `<tr>
    <td><b>${escapeHTML(c.customerId)}</b></td>
    <td><span class="persona-tag">${c.persona}</span></td>
    <td>${c.orders}</td>
    <td>${formatMoney(c.spend)}</td>
    <td>${c.recency}</td>
    <td class="score">${c.score}%</td>
  </tr>`).join("");
}

function formatMoney(value) { return "£" + Number(value || 0).toLocaleString("en-GB", { maximumFractionDigits: 2 }); }
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

// Load the sample dashboard automatically on first opening.
loadDemoData();
