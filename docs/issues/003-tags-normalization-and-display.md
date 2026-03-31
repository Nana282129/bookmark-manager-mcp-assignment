## Parent PRD

[docs/PRD.md](../PRD.md)

## What to build

Extend the add-bookmark flow so category tags are accepted, normalized, stored, and displayed as part of each bookmark item. This slice should ensure tag input behaves consistently end-to-end and integrates with the existing bookmark render flow rather than being implemented as a disconnected helper.

This issue should follow the PRD decisions around comma-separated input, whitespace trimming, duplicate removal, and consistent tag presentation.

## Acceptance criteria

- [ ] A user can enter category tags as comma-separated text when saving a bookmark.
- [ ] Saved tags are normalized by trimming whitespace and removing duplicates.
- [ ] Tags are stored as part of the bookmark record and rendered with each bookmark item.
- [ ] Bookmarks without tags still save and render correctly.

## Blocked by

- Blocked by `002-add-bookmark-with-persistence.md`

## User stories addressed

- User story 5
- User story 6
- User story 17
- User story 30
