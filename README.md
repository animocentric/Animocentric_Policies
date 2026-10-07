> **Moved.** The live policies are now served by the main website at
> **https://animocentric.com/policies/** (short links: `animocentric.com/delete-account`,
> `animocentric.com/privacy/<app>`, `animocentric.com/terms/<app>`), from the
> `policies/` folder of the client-website repo, which auto-deploys. Edit
> `client-website/policies/assets/data.js` there. This repo and
> policies.animocentric.com are kept only as the old copy.

# policies.animocentric.com

Privacy Policy / Terms of Service site for all Animocentric products. Plain HTML, CSS, and JavaScript — no Node.js, no build step, no server-side process required.

## Structure

```
public/                    The entire deployable site — upload this folder as-is
  index.html                Thin shell, lists every product
  privacy/<app>.html         Thin shell per product's Privacy Policy
  terms/<app>.html           Thin shell per product's Terms of Service
  assets/
    data.js                  Single source of truth: entity info + per-product facts
    render.js                Builds each page's content in the browser from data.js
    style.css                Shared styling
```

Every page under `privacy/` and `terms/` is a near-empty HTML file — just `<body data-page="privacy" data-app="petfolio">` plus a `<div id="root">` and two `<script>` tags. When the page loads, `render.js` reads `data.js`, figures out which product and document type the page is for (from those `data-*` attributes), and writes the full policy into the page.

## Editing content

Never hand-edit the `<div id="root">` content in any page — it's overwritten by JavaScript on every load. Instead, edit `public/assets/data.js`:

- Company info, contact details, address, effective date, jurisdiction, or a third-party service's description → the `entity` object at the top of the file
- What a specific product collects, its device permissions, its third parties, or its Terms clauses → find that product's entry in the `apps` array

Save the file, reload the page in a browser — no build step, no server needed to see the change (you can even open the file directly from disk, e.g. `file:///.../public/index.html`).

## Adding a new product

1. Add an entry to the `apps` array in `data.js` (copy an existing one as a template; keep `key` filesystem-safe — it becomes the filename). Set `audience` to `"public"` or `"internal"`.
2. Copy an existing shell file, e.g. `public/privacy/petfolio.html` → `public/privacy/<new-key>.html`, and change `data-app="petfolio"` to `data-app="<new-key>"`. Do the same under `terms/`.
3. It automatically gets a card on the homepage — `index.html` reads the same `apps` array.

## Shared logic

`render.js` holds the templates (what a Privacy Policy page looks like, what a Terms page looks like, what the homepage looks like) as plain functions. To change wording that's common to every product, or add a new shared legal section, edit the relevant function there — it applies to all pages the next time they're loaded, again with no build step.

## Deploying to Hostinger (policies.animocentric.com)

Point the `policies.animocentric.com` subdomain's document root at the contents of `public/` — upload that folder's contents (not the whole `policies-site/` directory; `README.md` and `INTERNAL-REVIEW-NOTES.md` aren't meant to be public). It's static files only; nothing needs to run on the server.

## Before this goes live

See `INTERNAL-REVIEW-NOTES.md` — a short list of items drafted with reasonable generic language that should get a real look (ideally from a lawyer) before you rely on this in a dispute.
