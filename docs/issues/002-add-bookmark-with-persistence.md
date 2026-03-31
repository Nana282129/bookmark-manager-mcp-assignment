## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Implement the end-to-end add-bookmark flow so a user can enter a title, URL, and optional tags, receive inline validation feedback, save a bookmark, and still see it after reload because it is persisted in `localStorage`.

This slice should cover the full path from user input through validation, bookmark creation, rendering, and storage writes. It should follow the PRD decisions around required fields, URL validation, bookmark timestamps, and isolated domain or storage logic.

## Acceptance criteria

- [ ] A user can submit valid bookmark data and see the new bookmark appear immediately in the list.
- [ ] Blank title or blank URL input shows inline validation errors and does not save.
- [ ] Invalid URLs show a clear inline validation error and do not save.
- [ ] Saved bookmarks persist across page refresh using the configured `localStorage` key.

## Blocked by

- Blocked by `001-bootstrap-app-shell.md`

## User stories addressed

- User story 1
- User story 2
- User story 3
- User story 4
- User story 7
- User story 8
- User story 9
- User story 27
- User story 28
- User story 29
