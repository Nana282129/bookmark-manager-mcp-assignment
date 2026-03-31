function normalizeTitle(title) {
  return String(title ?? "").trim();
}

function normalizeUrl(url) {
  const rawUrl = String(url ?? "").trim();

  if (!rawUrl) {
    return "";
  }

  const prefixedUrl = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;

  return new URL(prefixedUrl).toString();
}

function isValidUrl(url) {
  try {
    normalizeUrl(url);
    return true;
  } catch {
    return false;
  }
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return [...new Set(tags.map((tag) => String(tag).trim()).filter(Boolean))];
  }

  return [...new Set(String(tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean))];
}

export function validateBookmarkInput({ title, url } = {}) {
  const errors = {};
  const normalizedTitle = normalizeTitle(title);
  const rawUrl = String(url ?? "").trim();

  if (!normalizedTitle) {
    errors.title = "Title is required.";
  }

  if (!rawUrl) {
    errors.url = "URL is required.";
  } else if (!isValidUrl(rawUrl)) {
    errors.url = "Enter a valid URL.";
  }

  return errors;
}

export function createBookmark({ title, url, tags } = {}) {
  const errors = validateBookmarkInput({ title, url });

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid bookmark input.");
  }

  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: normalizeTitle(title),
    url: normalizeUrl(url),
    tags: normalizeTags(tags),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function updateBookmark(bookmark, { title, url, tags } = {}) {
  const errors = validateBookmarkInput({ title, url });

  if (Object.keys(errors).length > 0) {
    throw new Error("Invalid bookmark input.");
  }

  return {
    ...bookmark,
    title: normalizeTitle(title),
    url: normalizeUrl(url),
    tags: normalizeTags(tags),
    updatedAt: new Date().toISOString(),
  };
}
