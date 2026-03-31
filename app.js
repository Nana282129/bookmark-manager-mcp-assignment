import {
  createBookmark,
  updateBookmark,
  validateBookmarkInput,
} from "./src/bookmarks.js";
import { createBookmarkStorage } from "./src/bookmarkStorage.js";
import { filterBookmarks } from "./src/filterBookmarks.js";

const state = {
  bookmarks: [],
  editingId: null,
  query: "",
  feedback: "",
};

const storage = createBookmarkStorage(window.localStorage);

const elements = {
  form: document.querySelector("#bookmark-form"),
  formTitle: document.querySelector("#bookmark-form-title"),
  formModeCopy: document.querySelector("#form-mode-copy"),
  titleInput: document.querySelector("#title"),
  urlInput: document.querySelector("#url"),
  tagsInput: document.querySelector("#tags"),
  titleError: document.querySelector("#title-error"),
  urlError: document.querySelector("#url-error"),
  submitButton: document.querySelector("#submit-button"),
  cancelButton: document.querySelector("#cancel-button"),
  searchInput: document.querySelector("#search"),
  bookmarkCount: document.querySelector("#bookmark-count"),
  feedback: document.querySelector("#feedback"),
  bookmarkList: document.querySelector("#bookmark-list"),
};

initialize();

function initialize() {
  state.bookmarks = storage.loadBookmarks();

  elements.form.addEventListener("submit", handleFormSubmit);
  elements.cancelButton.addEventListener("click", resetFormState);
  elements.searchInput.addEventListener("input", handleSearchInput);
  elements.bookmarkList.addEventListener("click", handleBookmarkAction);

  render();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formValues = {
    title: elements.titleInput.value,
    url: elements.urlInput.value,
    tags: elements.tagsInput.value,
  };
  const errors = validateBookmarkInput(formValues);

  renderErrors(errors);

  if (Object.keys(errors).length > 0) {
    return;
  }

  if (state.editingId) {
    state.bookmarks = state.bookmarks.map((bookmark) =>
      bookmark.id === state.editingId
        ? updateBookmark(bookmark, formValues)
        : bookmark,
    );
    state.feedback = "Bookmark updated.";
  } else {
    state.bookmarks = [createBookmark(formValues), ...state.bookmarks];
    state.feedback = "Bookmark saved.";
  }

  storage.saveBookmarks(state.bookmarks);
  resetFormState();
  render();
}

function handleSearchInput(event) {
  state.query = event.target.value;
  render();
}

function handleBookmarkAction(event) {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const { action, id } = actionButton.dataset;

  if (action === "edit") {
    startEditing(id);
    return;
  }

  if (action === "delete") {
    deleteBookmark(id);
  }
}

function startEditing(bookmarkId) {
  const bookmark = state.bookmarks.find(({ id }) => id === bookmarkId);

  if (!bookmark) {
    return;
  }

  state.editingId = bookmark.id;
  elements.titleInput.value = bookmark.title;
  elements.urlInput.value = bookmark.url;
  elements.tagsInput.value = bookmark.tags.join(", ");
  renderErrors({});
  render();
  elements.titleInput.focus();
}

function deleteBookmark(bookmarkId) {
  const bookmark = state.bookmarks.find(({ id }) => id === bookmarkId);

  if (!bookmark) {
    return;
  }

  const confirmed = window.confirm(`Delete "${bookmark.title}"?`);

  if (!confirmed) {
    return;
  }

  state.bookmarks = state.bookmarks.filter(({ id }) => id !== bookmarkId);
  storage.saveBookmarks(state.bookmarks);

  if (state.editingId === bookmarkId) {
    resetFormState();
  }

  state.feedback = "Bookmark deleted.";
  render();
}

function resetFormState() {
  state.editingId = null;
  elements.form.reset();
  renderErrors({});
  render();
}

function render() {
  const visibleBookmarks = filterBookmarks(state.bookmarks, state.query);
  const isEditing = state.editingId !== null;

  elements.formTitle.textContent = isEditing ? "Edit bookmark" : "Add bookmark";
  elements.formModeCopy.textContent = isEditing
    ? "Update the selected bookmark and save your changes."
    : "Save a title, URL, and optional category tags.";
  elements.submitButton.textContent = isEditing ? "Update bookmark" : "Save bookmark";
  elements.cancelButton.hidden = !isEditing;
  elements.feedback.textContent = state.feedback;
  elements.bookmarkCount.textContent = `${state.bookmarks.length} saved`;
  elements.bookmarkList.innerHTML = createBookmarkListMarkup(visibleBookmarks);
}

function renderErrors(errors) {
  elements.titleError.textContent = errors.title ?? "";
  elements.urlError.textContent = errors.url ?? "";
}

function createBookmarkListMarkup(bookmarks) {
  if (bookmarks.length === 0) {
    return `
      <article class="empty-state">
        <h3>${state.query.trim() ? "No matching bookmarks" : "No bookmarks saved yet"}</h3>
        <p>${
          state.query.trim()
            ? "Try a different search term or clear the current filter."
            : "Use the form to save your first bookmark."
        }</p>
      </article>
    `;
  }

  return bookmarks
    .map(
      (bookmark) => `
        <article class="bookmark-card">
          <div class="bookmark-header">
            <div>
              <h3>${escapeHtml(bookmark.title)}</h3>
              <a href="${escapeAttribute(bookmark.url)}" target="_blank" rel="noreferrer">
                ${escapeHtml(bookmark.url)}
              </a>
            </div>
            <div class="bookmark-actions">
              <button type="button" class="secondary" data-action="edit" data-id="${bookmark.id}">
                Edit
              </button>
              <button type="button" class="danger" data-action="delete" data-id="${bookmark.id}">
                Delete
              </button>
            </div>
          </div>
          <ul class="tag-list">
            ${
              bookmark.tags.length > 0
                ? bookmark.tags
                    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
                    .join("")
                : '<li class="tag-placeholder">No tags</li>'
            }
          </ul>
        </article>
      `,
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
