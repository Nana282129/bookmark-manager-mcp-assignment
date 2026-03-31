## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Implement deletion as a complete user flow with confirmation, immediate UI removal, and persisted storage updates. This slice should let a user remove stale bookmarks confidently without requiring a page refresh or leaving the UI in an inconsistent state.

The confirmation mechanism may use the browser confirm dialog or a lightweight in-app confirmation pattern, but the interaction must be explicit.

## Acceptance criteria

- [ ] Each rendered bookmark exposes a delete action.
- [ ] Delete requires explicit confirmation before removal.
- [ ] Confirmed deletion removes the bookmark from the rendered list immediately.
- [ ] Deleted bookmarks are removed from persisted storage and do not return after refresh.

## Blocked by

- Blocked by `002-add-bookmark-with-persistence.md`

## User stories addressed

- User story 14
- User story 15
- User story 16
