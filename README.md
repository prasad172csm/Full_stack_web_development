# Projects Repository

This repository contains two beginner-friendly web development projects:

1.  **Uttarandhra Odyssey** -- a tourism website showcasing
    destinations, culture, food, and trip planning in the Uttarandhra
    region.
2.  **Retail Multi-Segment Profiler** -- a browser-based dashboard
    prototype for exploring customer segments using rule-based scoring.

------------------------------------------------------------------------

## 1. Uttarandhra Odyssey

### Overview

Uttarandhra Odyssey is a tourism website focused on the Uttarandhra
region of Andhra Pradesh. It provides information about destinations,
local culture, food, and travel planning.

### Main features

-   Destination pages for Visakhapatnam, Vizianagaram, and Srikakulam
-   Culture and food information
-   Itinerary and trip-planning page
-   Shared styling and JavaScript files for page behavior

### Main files

-   `index(1).html` -- main website page
-   `visakhapatnam.html` -- Visakhapatnam destination page
-   `vizianagaram.html` -- Vizianagaram destination page
-   `srikakulam.html` -- Srikakulam destination page
-   `culture.html` -- culture and food information
-   `itinerary.html` -- itinerary and trip planner
-   `data.js`, `main.js`, `planner.js` -- JavaScript data and page
    functionality
-   `style.css`, `components.css` -- website styles

### How to run

1.  Download or clone this repository.
2.  Open the Uttarandhra Odyssey project folder.
3.  Open the main HTML file in a web browser, or open the folder in
    Visual Studio Code and use the Live Server extension.

------------------------------------------------------------------------

## 2. Retail Multi-Segment Profiler

### Overview

Retail Multi-Segment Profiler is a beginner-friendly browser prototype
that explores customer segmentation through weighted, rule-based scoring
and persona rules.

**Note:** This version is a rule-based prototype. It does not implement
a trained K-Means clustering model or a trained Gradient Boosting model.

### Expected CSV columns

The dashboard expects customer transaction data with these columns:

-   `CustomerID`
-   `Invoice`
-   `Quantity`
-   `Price`
-   `InvoiceDate`
-   `StockCode`

### Main files

-   `index(2).html` -- dashboard page
-   `script.js` -- dashboard logic
-   `style(1).css` -- dashboard styles
-   `README.txt` -- original project notes

### How to run

1.  Download or clone this repository.
2.  Open the Retail Multi-Segment Profiler project folder.
3.  Open its HTML file in a web browser.
4.  If the dashboard provides a CSV upload option, select a dataset
    containing the expected columns listed above.

No package installation or local server is required for the browser
prototype as currently described.

------------------------------------------------------------------------

## Technologies

The uploaded project files indicate use of: - HTML - CSS - JavaScript

------------------------------------------------------------------------

## Repository structure

The projects should be kept in separate folders to avoid mixing files
with similar names:

``` text
projects-repository/
├── README.md
├── uttarandhra-odyssey/
│   ├── index.html
│   ├── visakhapatnam.html
│   ├── vizianagaram.html
│   ├── srikakulam.html
│   ├── culture.html
│   ├── itinerary.html
│   ├── data.js
│   ├── main.js
│   ├── planner.js
│   ├── style.css
│   └── components.css
└── retail-multi-segment-profiler/
    ├── index.html
    ├── script.js
    ├── style.css
    └── README.txt
```

The names shown in this structure are suggested folder/file names for a
clean repository layout. If your actual files currently have names such
as `index(1).html`, `index(2).html`, `style(1).css`, or `style.css`,
rename or move them carefully so each project has its own `index.html`
and stylesheet.

------------------------------------------------------------------------

## Future improvements

-   Add screenshots or GIFs demonstrating each project.
-   Add a sample CSV file for the Retail Multi-Segment Profiler.
-   Document any additional setup steps if the projects are expanded.
-   Add deployment links when the projects are published online.

------------------------------------------------------------------------

## Author

Add your name and GitHub profile link here.
