# Verification record

Verified locally on Windows, 17 October 2026.

## Automated checks

- Production build: passed with Next.js 16.4.2, React 19.3.1, TypeScript 7.0.2 and Tailwind CSS 4.3.3.
- TypeScript checking: passed standalone and during the final build.
- Six Node tests passed: valid/trimmed input; invalid payload types; email/consent/programme validation; length and honeypot restrictions; request-ID/path rejection; persistence, retry deduplication and conflicting ID rejection.
- Eight live HTTP checks passed: creation (201), retry (200), conflicting content (409), invalid fields (422), unrelated origin (403), wrong content type (415), malformed JSON (400), oversized body (413).
- Production dependency audit: no known vulnerabilities reported at check time. This is not a complete security audit.
- Pattern-based source scan found no private-key blocks or common API-token patterns. Test/runtime data and dependencies were excluded. The scan is not proof against every possible secret format.

## Browser checks

- Page rendered in the Codex Chromium-based browser.
- 360, 768 and 1440 CSS-pixel viewports: document did not overflow horizontally.
- Mobile menu opened, navigation worked, menu closed after selecting a destination.
- Personal and Foundation programme buttons selected the correct form option.
- Empty form displayed validation errors and focused the first invalid input.
- Synthetic submission saved successfully and displayed an ID with the explicit no-email notice.
- FAQ expanded and displayed its answer.
- Initial Tab navigation focused the skip link.
- Server-stop simulation produced an error and re-enabled submission. Restarting the server and retrying the same form succeeded.
- Browser error/warning log was empty during normal successful operation; the deliberate offline test is excluded from this statement.

## Fixes made during verification

The first browser submission failed because Next.js internally represented the request origin differently from the public loopback address. An explicit local origin allowlist now accepts localhost and 127.0.0.1 on port 3100 while rejecting unrelated origins; browser submission and HTTP checks passed after the fix.

The initial offline error exposed a raw fetch message. It was replaced with a clearer message that tells the visitor the form values remain available. The updated code passed the production build; the offline/retry behaviour was exercised before this wording-only improvement.

## Limits

No real mobile hardware, Safari or Firefox testing. No comprehensive WCAG audit, load testing, distributed concurrency testing or external penetration test. No public deployment. Local file storage is a demo implementation, not a production database. Only synthetic example.com data was used. `.data/` and `.test-data/` are excluded from the source archive and Git.

Screenshots: `mobile-360.png`, `tablet-768.png`. Full-page screenshot stitching in the embedded browser produced artefacts, so only inspected viewport screenshots are included.
