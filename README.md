# The Porter House

Marketing website for **The Porter House** — a structured transitional housing
program in Baltimore City, part of the **ELVT'D Wellness Center**.

The design is intentionally sleek, structured, and confident, built on a muted
earth-tone palette (espresso, terracotta, sand, cream) with an abstract
topographic hero motif — geometric color blocking softened by fluid, sweeping
planes.

## Structure

```
.
├── index.html      # Single-page site (About · Services · Programs · Contact)
├── css/styles.css  # Design system + layout + responsive rules
└── js/main.js      # Nav, scroll reveals, form handling
```

## Sections

- **Hero** — mission statement, abstract topographic art, values marquee
- **About** — Mission, Vision, Values
- **Services** — Behavioral Health, PHP & Recovery, Housing Coordination, Life Skills
- **Programs & Community** — Men's & Women's Units, Partnerships, Wellness + Grooming
- **Contact** — details + request form (name, phone, email, referral source,
  service needed, best time to contact)

## Running locally

It's a static site — no build step. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

- Fonts (Fraunces + Inter) load from Google Fonts.
- The contact form validates in the browser and shows a confirmation message.
  To capture submissions, wire the form to an email service or backend endpoint
  (e.g. Formspree, Netlify Forms, or a custom handler).
- Update the business **phone number** in `index.html` (Contact section and
  footer) once it's available.

© 2026 Elvt'd Wellness Center. All Rights Reserved.
