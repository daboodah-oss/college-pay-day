# College Pay Day

Family scholarship quest board for Matthew Bandera (HSE Class of 2027, IU Indianapolis, Computer Science). Gamified checklist: quests pay out for effort and submissions, bosses are the big scholarship deadlines, and Dad/Mom support quests feed the Party Bonus Bank.

**Family page:** https://daboodah-oss.github.io/college-pay-day/

## How it works

- `index.html` is a single self-contained page (sounds inlined). It is an export of the Muse artifact `college-pay-day`, which remains the editing master — edit there, then re-export and push the new `index.html` here.
- Shared state (claims, bank, pot) lives in the Google Sheet "College Pay Day — Shared Board State", reached through an Apps Script web app endpoint wired into the page. The Sheet stays private; the endpoint is the only door. State shape: `{done, extraApps, jackpot, bank, bankSpentTotal, bankPaid, muted}` with optimistic version checks.
- Everyone opens the same page; the "Who's playing?" choice is stored per device. No logins, no family code (Jeff's call, 2026-11-02).

## Why GitHub Pages

The board was originally shared as a Muse link, but that hosting sat between the page and the Google endpoint and the sync never connected reliably from phones (persistent "Offline" on Android and iPhone, 2026-11-02). Hosted here, the page talks straight to Google. First published 2026-11-02.
