# ELVT'D Wellness Center

Marketing website for **ELVT'D Wellness Center** — a Baltimore City nonprofit
delivering behavioral health support, recovery programming, supportive housing
(**The Porter House**), and life skills.

**Tagline:** *Wellness with Baltimore Heart.*

The design is bold and civic: black + Maryland gold + cream, oversized condensed
type (Anton), a Baltimore skyline motif, and Maryland-flag accents — high
contrast with big personality.

## Structure

```
.
├── index.html       # Single-page site
├── css/styles.css   # Bold Baltimore design system
├── js/main.js       # Nav, elevation rail, reveals, parallax, form
└── assets/
    ├── logo.png     # ELVT'D Wellness Center badge (transparent)
    └── skyline.png  # Baltimore skyline silhouette (used as CSS mask, also
                     #  inlined as a data URI in the stylesheet)
```

## Sections

- **Hero** — "Wellness with Baltimore Heart", logo badge, Donate + Get Involved
- **About** — Mission, Vision, Values
- **Programs** — Behavioral Health, PHP & Recovery, Supportive Housing (The
  Porter House), Life Skills & Workforce Readiness
- **Impact band** — bold statement over the gold skyline
- **Get Involved** — Donate, Volunteer, Partner
- **Contact** — request/referral form (support, donate, volunteer, partner)

## Features

- Persistent **elevation rail** (desktop) with scroll-progress + active section
- Motion (all `prefers-reduced-motion`-safe, fine-pointer only): hero parallax,
  staggered reveals, magnetic CTAs
- Fully responsive; hamburger menu below 720px

## Running locally

Static site — serve it (the skyline mask needs http, not `file://`):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## To finish before launch

- **Donation link** — the Donate buttons currently point to the contact form.
  Wire them to your donation platform (e.g. Givebutter, Donorbox, PayPal).
- **Phone number** — placeholder in the Contact section and footer.
- **Form handling** — validates + confirms in-browser; connect to an email
  service or backend to actually receive submissions.
- **Nonprofit details** — add EIN / 501(c)(3) status to the footer if desired.

© 2026 ELVT'D Wellness Center. A Baltimore City nonprofit.
