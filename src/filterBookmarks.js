export function filterBookmarks(bookmarks, query) {
  const normalizedQuery = String(query ?? "").trim().toLowerCase();

  if (!normalizedQuery) {
    return bookmarks;
  }

  return bookmarks.filter((bookmark) => {
    const haystacks = [
      bookmark.title,
      bookmark.url,
      ...(bookmark.tags ?? []),
    ];

    return haystacks.some((value) =>
      String(value ?? "").toLowerCase().includes(normalizedQuery),
    );
  });
}
