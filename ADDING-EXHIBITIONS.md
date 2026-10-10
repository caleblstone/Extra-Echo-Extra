# Adding an exhibition

Everything happens in the CMS. You never touch code or folders.

1. Open Decap CMS (the `/admin/` page on the site) and choose
   **Exhibitions → New Exhibition**.
2. Fill in the fields:
   - **Title** — the show's title.
   - **Slug** — a short URL id, lowercase with hyphens (e.g. `spring-2027`).
     This becomes the show's web address; just leave the suggested value or
     type a clean one.
   - **Order** — lower numbers appear higher in the list on the home page.
   - **Date, Presents line, Artists, Dates, Hours, Opening, Contact, Flyer** —
     as needed.
   - **Images** — add each image, with an optional caption. Drag to reorder;
     that is the order they appear in the show's image scroll.
   - **Text (essay)** — the writing shown on the show's Text page.
3. Publish.

That's it. When the site rebuilds, the new exhibition automatically gets its
own landing page (flyer + details), Images page, and Text page, and it appears
in the list on the home page. No files to create, nothing to copy.

---

*For developers:* the per-exhibition pages are generated at build time by
`_plugins/exhibition_pages.rb`, which creates `/exhibitions/<slug>/`,
`/exhibitions/<slug>/images/`, and `/exhibitions/<slug>/text/` for every entry
in the `_exhibitions` collection. There is nothing to maintain per show.
