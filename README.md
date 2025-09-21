# Mas Rico — Website Requirements Form

A single-page form to collect website requirements from non-technical customers. Includes multi-language support (EN, ES, FR, IT, DE), responsive layout, and a clean summary generation workflow.

## Highlights
- **Multi-language UI (i18n)** loaded from JSON files in `translations/`
- **Mobile-friendly layout** with non-overlapping language selector
- **Domain & Hosting** question with a simple one-line explanation
- **Conditional fields** (e.g., Additional Pages appears for 6–10, 11–20, 20+)
- **Copy-to-clipboard summary** after submit
- **No build step required** — pure HTML/CSS/JS

## Project structure
```
New folder/
├─ message.html          # Main HTML
├─ styles.css            # Styles (extracted from HTML)
├─ app.js                # Logic, i18n, form handling
├─ masrico-no-background.png
└─ translations/
   ├─ en.json
   ├─ es.json
   ├─ fr.json
   ├─ it.json
   └─ de.json
```

## Quick start (recommended)
Serve the folder over HTTP so the browser can load JSON translation files.

- **Python (Windows compatible)**
  1. Open a terminal in this folder
  2. Run:
     ```bash
     py -3 -m http.server 5500
     ```
  3. Open:
     - http://localhost:5500/
     - or directly: http://localhost:5500/message.html

- **Node.js (alternative)**
  1. Open a terminal in this folder
  2. Run:
     ```bash
     npx http-server -p 5500
     ```
  3. Open:
     - http://localhost:5500/
     - or directly: http://localhost:5500/message.html

Note: Opening `message.html` with the `file://` scheme may block `fetch()` for local JSON files. Use one of the servers above.

## Usage
- Click a language button (EN/ES/FR/IT/DE) to switch the interface.
- Fill out the form. Required fields are marked with `*`.
- Selecting page count `6–10`, `11–20`, or `20+` reveals the **Additional pages** textarea.
- Select your **Domain & Hosting** status. Help text explains: “Domain = your website name (example.com). Hosting = the server that stores and runs your site.”
- Agree to the terms and submit. A success alert shows, and a full summary is copied to your clipboard.

## Managing translations
- Files are in `translations/<lang>.json` (e.g., `translations/en.json`).
- To add a language:
  1. Copy `translations/en.json` to `translations/<new>.json`
  2. Translate values
  3. Add a button in `message.html`:
     ```html
     <li><button type="button" class="lang-btn" data-lang="pt">PT</button></li>
     ```
- `app.js` loads `translations/<code>.json`. If a selected language fails to load, the app falls back to `translations/en.json`. If that also fails, an alert will appear.

## Customization
- **Default language**: At the bottom of `app.js`, change:
  ```js
  setLanguage('es'); // or 'en', 'fr', 'it', 'de'
  ```
- **Logo size**: Adjust in `styles.css` under `.header .logo { max-width: ... }`.
- **Help text styling**: Tweak `.help-text` in `styles.css` (e.g., smaller font, muted color, spacing).
- **Form sections**: All labels and placeholders have element IDs for i18n.

## Troubleshooting
- **Translations not loading**: Make sure you are serving over HTTP (see Quick Start) and the `translations/` folder exists.
- **404 favicon.ico**: Harmless. Add a `favicon.ico` at project root to remove the message.
- **Clipboard permissions**: Some browsers require user interaction for `navigator.clipboard.writeText`. Triggered by form submission here, so it should work.

## License
Internal project asset for Mas Rico. Update as needed.
