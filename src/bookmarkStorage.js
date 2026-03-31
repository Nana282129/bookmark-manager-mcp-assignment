const DEFAULT_STORAGE_KEY = "bookmarkManager.bookmarks";

export function createBookmarkStorage(
  storage,
  storageKey = DEFAULT_STORAGE_KEY,
) {
  return {
    loadBookmarks() {
      const serializedBookmarks = storage.getItem(storageKey);

      if (!serializedBookmarks) {
        return [];
      }

      try {
        const parsedBookmarks = JSON.parse(serializedBookmarks);
        return Array.isArray(parsedBookmarks) ? parsedBookmarks : [];
      } catch {
        return [];
      }
    },
    saveBookmarks(bookmarks) {
      storage.setItem(storageKey, JSON.stringify(bookmarks));
    },
  };
}
