# Document generators

Scripts that render the CharmEd Minds training deliverables from
`CharmEd-Minds-Employee-Training-Guide.md` (the source of truth).

| Script | Output | Run |
|--------|--------|-----|
| `md2docx.js` | `CharmEd Minds Employee Training Guide.docx` (also used for the two competency assessment docs) | `node md2docx.js ../CharmEd-Minds-Employee-Training-Guide.md "../CharmEd Minds Employee Training Guide.docx"` |
| `build_deck.js` | `CharmEd Minds Onboarding Deck.pptx` (includes the Knowledge Check section) | `node build_deck.js` |
| `build_gradebook.py` | `CharmEd Minds Competency Scoring Grid.xlsx` | `python3 build_gradebook.py` |

The JS scripts depend on npm packages (`docx`, `pptxgenjs`) — `npm install docx pptxgenjs`
if `require()` fails. The gradebook script needs `openpyxl` (`pip install openpyxl`).
After generating the `.xlsx`, open it in Excel/LibreOffice once so its formulas cache values.

To keep the Word doc and deck in sync, edit the Markdown guide first, then
re-run the generators.
