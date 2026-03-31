# Bookmark Manager PRD

## Problem Statement

People often need a lightweight place to save and organize a small set of links without using the browser's full bookmark system. Native browser bookmarks are optimized for folders and long-lived collections, which can feel cumbersome when someone mainly wants to capture links quickly, label them with simple category tags, and find them later through search.

This project should solve that problem with a small web app built in HTML, CSS, and JavaScript. It must run entirely in the browser, persist data with `localStorage`, and remain understandable enough to maintain as a static frontend project.

## Solution

The product is a single-page bookmark manager for one user in one browser. The interface should let the user add bookmarks with a title, URL, and optional category tags; edit or delete existing bookmarks; search bookmarks by title, URL, or tags; and automatically retain data between sessions using `localStorage`.

The experience should feel immediate for a small dataset. The user should be able to open the page, save a bookmark, see it appear instantly, search the collection live, and return later without losing previously saved data. The implementation should stay modular enough that storage, validation, and rendering logic can be evolved later without rewriting the whole app.

## User Stories

1. As a user, I want to add a bookmark with a title, so that I can recognize saved links later.
2. As a user, I want to add a bookmark with a URL, so that I can open the saved destination directly.
3. As a user, I want title and URL to be required, so that incomplete bookmarks are not saved.
4. As a user, I want invalid URLs to be rejected with a clear message, so that I know how to fix the input.
5. As a user, I want to add optional category tags, so that I can group related bookmarks without building folders.
6. As a user, I want tags to be normalized by trimming whitespace and deduplicating repeated values, so that my categories stay clean.
7. As a user, I want to save a bookmark and see it appear immediately, so that the interface feels responsive.
8. As a user, I want my bookmarks to remain available after refreshing the page, so that the app is useful across sessions.
9. As a user, I want the app to load previously saved bookmarks on startup, so that I can continue where I left off.
10. As a user, I want to edit an existing bookmark, so that I can correct the title, URL, or tags later.
11. As a user, I want the form to preload the existing bookmark when editing, so that I do not need to retype unchanged values.
12. As a user, I want the UI to clearly indicate when I am editing rather than adding, so that I do not accidentally create duplicates.
13. As a user, I want to cancel an edit, so that I can return to add mode without changing saved data.
14. As a user, I want to delete a bookmark, so that I can remove stale or unwanted links.
15. As a user, I want a confirmation step before deletion, so that I do not remove a bookmark by accident.
16. As a user, I want deleted bookmarks to disappear immediately, so that the interface matches the saved state.
17. As a user, I want each bookmark to show its title, URL, and tags, so that I can scan the list quickly.
18. As a user, I want the saved URL to be clickable, so that I can open the destination directly from the app.
19. As a user, I want a single search field, so that I can quickly narrow the list without learning multiple filters.
20. As a user, I want search to match titles, URLs, and tags, so that I can find bookmarks using whatever detail I remember.
21. As a user, I want search to update while I type, so that finding a bookmark takes minimal effort.
22. As a user, I want search to be case-insensitive, so that I do not need exact capitalization.
23. As a user, I want the full list to return when I clear the search, so that I can resume browsing all bookmarks.
24. As a user, I want a clear empty state when no bookmarks exist yet, so that the app does not feel broken on first use.
25. As a user, I want a clear empty state when search returns no matches, so that I understand the filter result.
26. As a user, I want malformed stored data to fail safely, so that the app still loads instead of crashing.
27. As a user, I want bookmark timestamps to be tracked internally, so that the app can support future sorting or auditing needs.
28. As a maintainer, I want storage logic isolated behind a simple interface, so that it can be replaced later without touching UI code everywhere.
29. As a maintainer, I want validation rules isolated from DOM code, so that the business rules are easy to test.
30. As a maintainer, I want filtering and normalization logic extracted into pure functions, so that the core behaviors can be verified without relying on browser interactions.
31. As a maintainer, I want the app to use semantic HTML and responsive CSS, so that the UI remains usable on desktop and mobile screens.

## Implementation Decisions

- The app will be a static frontend with no backend, authentication, or network dependency.
- The primary workflow will be single-screen: form, search input, and bookmark list on one page.
- Each bookmark will contain a unique `id`, `title`, `url`, `tags`, `createdAt`, and `updatedAt`.
- The bookmark collection will be stored as a JSON array under a dedicated `localStorage` key.
- URL validation will happen before save. Invalid entries will not be persisted.
- Tags will be entered as comma-separated text and normalized into a consistent array representation.
- Search will be live and case-insensitive across title, URL, and tags.
- Delete will require explicit confirmation before the record is removed.
- The app should recover to an empty collection if stored data is missing, malformed, or structurally invalid.
- Duplicate URLs are allowed in MVP. The user may intentionally save the same destination under different titles or tag sets.
- The design should separate responsibilities into deep modules with simple interfaces:
- A bookmark domain module will own normalization, validation, and bookmark object creation or update rules.
- A storage module will own reading and writing the bookmark collection to `localStorage`, including safe parsing and fallback behavior.
- A state or controller module will coordinate user actions such as add, edit, delete, cancel-edit, initial load, and search updates.
- A rendering module will translate application state into DOM updates for the form, list, empty states, and feedback messages.
- A filtering module or pure utility layer will encapsulate search matching and tag parsing so the logic remains independent from the DOM.
- The implementation should be small, but not monolithic. Even if the code lives in a few files, the module boundaries above should stay conceptually clean.
- The UX should distinguish add mode from edit mode with visible form-state cues and button labeling.
- The interface should include inline validation messages and concise empty states rather than relying on browser alerts for normal errors.
- The app should optimize for small personal collections and in-memory operations; pagination, server persistence, and background sync are unnecessary for MVP.

## Testing Decisions

- Good tests should verify externally observable behavior and stable interfaces, not internal implementation details such as private variables or exact DOM structure beyond what the user depends on.
- The bookmark domain module should be tested for required-field validation, URL validation, tag normalization, timestamp handling, and safe object shaping.
- The storage module should be tested for successful save/load behavior, empty-state fallback, malformed JSON handling, and invalid stored-structure recovery.
- The filtering logic should be tested for case-insensitive matching across title, URL, and tags, plus no-match scenarios.
- The controller-level behavior should be tested where practical for add, edit, delete, cancel-edit, and search-driven rendering updates.
- If DOM tests are added, they should focus on user-visible outcomes such as error messages, mode changes, and rendered bookmark items.
- The current repo only contains placeholder Vitest tests, so there is no strong prior art yet. New tests should establish the pattern by targeting pure functions first and UI orchestration second.
- The most valuable initial test coverage is the domain, storage, and filtering logic because those pieces contain the highest behavior density and are easiest to verify in isolation.

## Out of Scope

- User accounts or authentication
- Sync across browsers or devices
- Shared collections or collaboration
- Import or export in the first release
- Browser extension integration
- Nested folders or complex taxonomy management
- Rich previews, screenshots, favicon fetching, or metadata scraping
- Advanced sorting controls, pinning, favorites, or notes
- Offline installability, service workers, or PWA packaging

## Further Notes

- The target user is one person using one browser on one device.
- The MVP should favor reliability and clarity over feature breadth.
- The UI should be responsive enough for both desktop and mobile layouts.
- Because `localStorage` is the only persistence layer, the product should clearly tolerate missing or broken stored data instead of assuming storage contents are trustworthy.
- A sensible storage key for the collection is `bookmarkManager.bookmarks`.
- Future extensions that fit this architecture include import/export, sortable views, clickable tag filters, notes, and richer metadata.
