## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Implement bookmark editing as an end-to-end user flow. A user should be able to select an existing bookmark, have the form preload its values, see a clear edit mode, save changes back to the list and storage, or cancel without changing the saved record.

This slice should update the existing bookmark path rather than creating a duplicate and should preserve the bookmark identity and creation timestamp while updating the `updatedAt` timestamp.

## Acceptance criteria

- [ ] A user can select an existing bookmark for editing and see the current title, URL, and tags in the form.
- [ ] The interface clearly distinguishes edit mode from add mode.
- [ ] Saving an edit updates the existing bookmark in the UI and persisted storage.
- [ ] Canceling edit returns the form to add mode without changing the saved bookmark.

## Blocked by

- Blocked by `002-add-bookmark-with-persistence.md`
- Blocked by `003-tags-normalization-and-display.md`

## User stories addressed

- User story 10
- User story 11
- User story 12
- User story 13
- User story 27
