# Clint Humphrey Photography — website ops doc

A professional storefront for selling fine-art wildlife prints. Static site
(HTML/CSS/JS, zero dependencies, zero hosting cost on Vercel/Netlify/GitHub Pages).

## Current status (2026-10-03)

Site is BUILT with 3 products and draft pricing. Not yet live — waiting on:
1. Full-resolution originals (chat uploads downscale to 1320px; need true files)
2. Clint's three free accounts (below)
3. Stripe Payment Links pasted into `js/site.js`
4. Price/margin confirmation against Gelato's catalog

## Clint's account checklist (all free, ~20 min total)

1. **Gelato** (gelato.com) — print-on-demand. Free plan, no monthly fee.
   Upload full-resolution originals here directly (dashboard handles 30MB+
   files, no compression). Add a payment card for per-order print+shipping costs.
2. **Stripe** (stripe.com) — payments. No monthly fee (2.9% + 30¢ per sale).
   Identity verification + bank account required for payouts. Create one
   **Payment Link** per size option in `js/site.js` (11 total) and paste the
   URLs into the matching `stripe:` fields.
3. **Vercel** (vercel.com) + GitHub — free hosting. Connect the repo, deploy.

## How fulfillment works (Clint touches nothing)

1. Customer buys on the site → Stripe collects payment → payout to Clint's bank.
2. Strider checks Stripe for new paid orders daily (cron) and submits each
   order to Gelato via the Gelato dashboard/API using Clint's account.
3. Gelato prints and ships directly to the customer with tracking.
4. Clint keeps: retail price − Gelato base cost − Gelato shipping − Stripe fee.

## Money math (verify before launch)

Prices in `js/site.js` are DRAFT, benchmarked to wildlife-print market rates
(FAA/Etsy). Before launch, check each option's margin:
  margin = retail − (Gelato product cost + Gelato shipping + Stripe 2.9% + $0.30)
Keep minimum ~40% margin. Raise retail or drop the size option if it doesn't clear.

## Adding new photos

1. Clint uploads the full-res original to his Gelato account (creates the product there).
2. Export a web version (1600px long edge, JPEG ~80%) → `website/images/`.
3. Add an entry to `PRODUCTS` in `js/site.js` with honest max size for the file's resolution.
4. Create the Stripe Payment Links for its sizes, paste URLs in.
5. Redeploy (automatic on Vercel via GitHub push).

## Resolution rules (from the 2026-10-03 review)

- 300 DPI = gallery-sharp. 150 DPI = fine for wall art viewed at a few feet.
- Twin Ospreys (_DSC3017): 45MP original → up to 24×36.
- The Dive (_DSC1017): 3MP crop → max 11×14.
- Talons Out (_DSC1174): 7MP crop → max 16×20.
- Never offer a size the file can't support. When in doubt, cap it lower.
