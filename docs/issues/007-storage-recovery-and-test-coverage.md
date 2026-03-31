## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Harden the bookmark manager so it fails safely when storage data is malformed and add behavior-focused automated coverage around the core modules and user flows. This slice should validate the PRD requirement that broken or missing stored data does not crash the app and should leave the project with durable tests around the highest-value behaviors.

This issue is the reliability pass that closes the loop on domain, storage, filtering, and controller behavior.

## Acceptance criteria

- [ ] The app loads successfully when the configured `localStorage` entry is missing, malformed JSON, or not a valid bookmark array.
- [ ] Invalid stored data falls back to an empty collection rather than crashing the page.
- [ ] Automated tests cover bookmark validation, filtering, storage recovery, and the main CRUD state transitions through public interfaces.
- [ ] The resulting test suite can be run through the project test script in the current repo environment.

## Blocked by

- Blocked by `002-add-bookmark-with-persistence.md`
- Blocked by `003-tags-normalization-and-display.md`
- Blocked by `004-edit-bookmark-flow.md`
- Blocked by `005-delete-bookmark-flow.md`
- Blocked by `006-live-search.md`

## User stories addressed

- User story 26
- User story 28
- User story 29
- User story 30
- User story 31
