# Document generators

Scripts that render the CharmEd Minds training deliverables from
`CharmEd-Minds-Employee-Training-Guide.md` (the source of truth).

| Script | Output | Run |
|--------|--------|-----|
| `md2docx.js` | `CharmEd Minds Employee Training Guide.docx` | `node md2docx.js ../CharmEd-Minds-Employee-Training-Guide.md "../CharmEd Minds Employee Training Guide.docx"` |
| `build_deck.js` | `CharmEd Minds Onboarding Deck.pptx` | `node build_deck.js` |

Both depend on npm packages (`docx`, `pptxgenjs`). Install with
`npm install docx pptxgenjs` if `require()` fails.

To keep the Word doc and deck in sync, edit the Markdown guide first, then
re-run the generators.
