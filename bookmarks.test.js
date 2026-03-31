import { describe, expect, it } from "vitest";
import {
  createBookmark,
  updateBookmark,
  validateBookmarkInput,
} from "./src/bookmarks.js";
import { createBookmarkStorage } from "./src/bookmarkStorage.js";
import { filterBookmarks } from "./src/filterBookmarks.js";

describe("createBookmark", () => {
  it("creates a normalized bookmark from valid input", () => {
    const bookmark = createBookmark({
      title: "  MDN Web Docs  ",
      url: "developer.mozilla.org/en-US/",
      tags: " docs, javascript, docs ",
    });

    expect(bookmark).toMatchObject({
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/",
      tags: ["docs", "javascript"],
    });
    expect(bookmark.id).toEqual(expect.any(String));
    expect(bookmark.createdAt).toEqual(expect.any(String));
    expect(bookmark.updatedAt).toBe(bookmark.createdAt);
  });
});

describe("updateBookmark", () => {
  it("preserves identity while updating normalized fields and timestamps", () => {
    const existingBookmark = {
      id: "bookmark-1",
      title: "Old title",
      url: "https://example.com/old",
      tags: ["legacy"],
      createdAt: "2026-03-31T00:00:00.000Z",
      updatedAt: "2026-03-31T00:00:00.000Z",
    };

    const updatedBookmark = updateBookmark(existingBookmark, {
      title: "  New title  ",
      url: "example.com/new",
      tags: " docs, reference, docs ",
    });

    expect(updatedBookmark).toMatchObject({
      id: "bookmark-1",
      title: "New title",
      url: "https://example.com/new",
      tags: ["docs", "reference"],
      createdAt: "2026-03-31T00:00:00.000Z",
    });
    expect(updatedBookmark.updatedAt).toEqual(expect.any(String));
    expect(new Date(updatedBookmark.updatedAt).getTime()).toBeGreaterThanOrEqual(
      new Date(existingBookmark.updatedAt).getTime(),
    );
  });
});

describe("validateBookmarkInput", () => {
  it("reports missing required fields", () => {
    expect(validateBookmarkInput({ title: " ", url: " " })).toEqual({
      title: "Title is required.",
      url: "URL is required.",
    });
  });

  it("reports malformed URLs", () => {
    expect(
      validateBookmarkInput({ title: "Docs", url: "https://exa mple.com" }),
    ).toEqual({
      url: "Enter a valid URL.",
    });
  });

  it("returns no errors for valid bookmark input", () => {
    expect(
      validateBookmarkInput({
        title: "MDN Web Docs",
        url: "developer.mozilla.org/en-US/",
      }),
    ).toEqual({});
  });
});

describe("filterBookmarks", () => {
  const bookmarks = [
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      tags: ["docs", "javascript"],
    },
    {
      title: "Vitest",
      url: "https://vitest.dev/",
      tags: ["testing"],
    },
  ];

  it("matches bookmarks by title, URL, and tags without case sensitivity", () => {
    expect(filterBookmarks(bookmarks, "mdn")).toEqual([bookmarks[0]]);
    expect(filterBookmarks(bookmarks, "VITEST.DEV")).toEqual([bookmarks[1]]);
    expect(filterBookmarks(bookmarks, "JavaScript")).toEqual([bookmarks[0]]);
  });

  it("returns all bookmarks for an empty query", () => {
    expect(filterBookmarks(bookmarks, "")).toEqual(bookmarks);
  });

  it("returns no bookmarks when nothing matches", () => {
    expect(filterBookmarks(bookmarks, "css tricks")).toEqual([]);
  });
});

describe("createBookmarkStorage", () => {
  it("loads an empty collection when nothing has been stored yet", () => {
    const storage = createMemoryStorage();
    const bookmarkStorage = createBookmarkStorage(storage);

    expect(bookmarkStorage.loadBookmarks()).toEqual([]);
  });

  it("saves bookmarks and loads them back from storage", () => {
    const storage = createMemoryStorage();
    const bookmarkStorage = createBookmarkStorage(storage);
    const bookmarks = [
      createBookmark({
        title: "MDN Web Docs",
        url: "developer.mozilla.org/en-US/",
        tags: "docs,javascript",
      }),
    ];

    bookmarkStorage.saveBookmarks(bookmarks);

    expect(bookmarkStorage.loadBookmarks()).toEqual(bookmarks);
  });

  it("falls back to an empty collection when stored JSON is malformed", () => {
    const storage = createMemoryStorage({
      "bookmarkManager.bookmarks": "{not-valid-json",
    });
    const bookmarkStorage = createBookmarkStorage(storage);

    expect(bookmarkStorage.loadBookmarks()).toEqual([]);
  });

  it("falls back to an empty collection when stored data is not an array", () => {
    const storage = createMemoryStorage({
      "bookmarkManager.bookmarks": JSON.stringify({ title: "Not an array" }),
    });
    const bookmarkStorage = createBookmarkStorage(storage);

    expect(bookmarkStorage.loadBookmarks()).toEqual([]);
  });
});

function createMemoryStorage(initialEntries = {}) {
  const store = new Map(Object.entries(initialEntries));

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}
