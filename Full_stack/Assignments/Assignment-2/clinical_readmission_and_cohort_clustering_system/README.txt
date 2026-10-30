# Retail Multi-Segment Profiler — Basic HTML/CSS/JS

A beginner-friendly browser prototype based on the uploaded internship report, **Retail Multi-Segment Profiler & High-Value Customer Classifier**.

## Files
- `index.html` — page structure
- `style.css` — styling and responsive layout
- `script.js` — demo data, CSV reading, customer aggregation, simple persona labels, score and table filters

## Run
1. Extract the ZIP.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Click **Load Demo Data** if needed, or upload a CSV.

No installation or server is required.

## CSV format
The easiest format uses these headers:
`CustomerID,Invoice,Quantity,Price,InvoiceDate,StockCode`

The program groups transaction lines by customer. It skips rows with missing customer IDs, invalid values, negative quantities/prices, and invoice IDs beginning with `C` (cancellations).

## Important project note
This is a basic front-end demonstration. It uses a transparent weighted score and simple behavior-based persona rules. It does **not** train K-Means or Gradient Boosting models. The report describes those models as the full project methodology; real model training would typically be implemented in Python with scikit-learn and then connected to a web dashboard.
