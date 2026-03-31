## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Implement live search across the saved bookmark collection so the user can filter by title, URL, or tags from a single query input. This slice should connect the search field, filtering logic, rendered list, and no-results messaging into one complete behavior.

Filtering should be case-insensitive and should restore the full list when the search query is cleared.

## Acceptance criteria

- [ ] Typing in the search field updates the visible bookmark list without a manual submit step.
- [ ] Search matches bookmark title, URL, and tags in a case-insensitive way.
- [ ] Clearing the search query restores the full bookmark list.
- [ ] When no bookmarks match the query, the app shows a clear no-results state.

## Blocked by

- Blocked by `002-add-bookmark-with-persistence.md`
- Blocked by `003-tags-normalization-and-display.md`

## User stories addressed

- User story 19
- User story 20
- User story 21
- User story 22
- User story 23
- User story 25
- User story 30
