---
phase: 02-content-pages
plan: 09
subsystem: pages/about, pages/contact, pages/404
tags: [about, contact, form, 404, validation, mailto]
dependency_graph:
  requires: [02-04, 02-05, 02-06, 02-07, 02-08]
  provides: [about-page, contact-page, contact-form, 404-page]
  affects: [all-17-routes]
tech_stack:
  added: []
  patterns:
    - HTML5 native validation with custom error states and aria-live announcements
    - Mailto payload construction with encodeURIComponent for all form fields
    - Client component (ContactForm) wrapped by server component (contact/page.tsx) for metadata export
    - 404 page uses Button component for navigation, matching design system
key_files:
  created:
    - app/about/page.tsx
    - app/contact/page.tsx
    - components/forms/ContactForm.tsx
  modified:
    - app/not-found.tsx
decisions:
  - "HTML5 validation + custom error states chosen over React Hook Form — keeps bundle light, code straightforward for technical buyers who inspect source (per D-13)"
  - "ContactForm is a client component with a server component wrapper in contact/page.tsx — enables metadata export alongside use client form"
  - "mailto payload constructed with encodeURIComponent on all fields; TODO comment left for Resend/Formspree integration per DOC-03"
  - "aria-live='polite' + aria-invalid on all validated inputs for WCAG 2.1 AA compliance"
  - "404 page uses Button variant='secondary' for nav links, matching existing design system patterns"
metrics:
  duration: "2.5 min"
  completed: "2026-04-26"
  tasks: 2
  files: 4
requirements: [PAGE-04, PAGE-05, PAGE-06]
---

# Phase 2 Plan 9: About, Contact, and 404 Pages Summary

About and Contact are the final top-level pages. ContactForm uses HTML5 native validation with custom indigo error states, aria-live announcements, and constructs a mailto:hello@softwires.in payload. Custom 404 page has Softwires design system branding and navigation to all four main sections. Build exits 0 across all 17 routes.

## What Was Built

### Task 1: About page, Contact page, ContactForm (commit acb9fb1)

**app/about/page.tsx** — Complete About page with six sections:
1. HeroLight with "Engineers, not sloganeers." headline
2. "Why Softwires exists" origin section (4 paragraphs in narrow 720px column)
3. Three principles sections (01 failure mode, 02 latency, 03 the model is 10%)
4. Five-sector grid (Energy, Healthcare, Infrastructure, Insurance, Data Platforms)
5. Partnerships band with six placeholder logo boxes (TODO: PART-01)
6. CTABand

**components/forms/ContactForm.tsx** — Validated contact form:
- Eight fields: name, email, company, role (select), sector (select), description (textarea), timeline (optional), budget (optional)
- Blur-time and submit-time validation on four required fields
- Error messages with role="alert" and aria-live="polite"
- Error border switches to border-accent on invalid fields
- Submit constructs mailto:hello@softwires.in payload via encodeURIComponent
- TODO comment for Resend/Formspree integration (DOC-03)
- Post-submit confirmation message in text-accent

**app/contact/page.tsx** — Contact page with three sections:
1. HeroLight with "Tell us what you're building." headline
2. ContactForm in py-5xl section
3. Office strip (ADDRESS, PHONE, HOURS in 3-column grid) with TODO placeholders for address and phone

### Task 2: Branded 404 page (commit 0bd5268)

**app/not-found.tsx** — Replaced minimal 404 with full branded page:
- 404 Caption kicker, display-md headline "This page does not exist."
- Descriptive body text about mistyped/outdated URL
- Four Button (secondary) navigation links: Home, Services, Portfolio, Contact
- Centered layout with min-h-[60vh]

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- Partnership logos: six `<div>` placeholders with "Partner Logo" text and `{/* TODO: replace with real partner/client logos — see PART-01 */}` comment in app/about/page.tsx
- Office address and phone: placeholder text in app/contact/page.tsx with TODO comments
- Contact form submission: currently opens mailto:; TODO comment for Resend/Formspree integration (DOC-03)

These stubs are intentional per the plan spec and do not prevent the pages from achieving their stated goals.

## Task 3: Checkpoint — Human Verification Pending

Task 3 is a `checkpoint:human-verify` gate. Visual verification of all 17 routes is required before this plan can be marked complete.

## Self-Check: PASSED

- app/about/page.tsx — FOUND
- app/contact/page.tsx — FOUND
- components/forms/ContactForm.tsx — FOUND
- app/not-found.tsx — FOUND (modified)
- Commit acb9fb1 — Task 1 (About, Contact, ContactForm)
- Commit 0bd5268 — Task 2 (404 page)
- pnpm build exits 0 across all 17 routes
