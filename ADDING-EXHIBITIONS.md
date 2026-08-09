# Adding an exhibition

The site is built around one collection of exhibitions. Each exhibition has a
landing page (flyer + details), an Images page, and a Text page. Everything for
a show — its details, its images, and its text — lives in that one exhibition
entry, so images can never end up on the wrong show.

## 1. Create the exhibition entry (in the CMS)

In Decap CMS: **Exhibitions → New Exhibition**. Fill in:

- **Slug** — a short URL id, lowercase with hyphens, e.g. `spring-2027`.
  This must match the folder name in step 2.
- **Order** — lower numbers appear first in the list on the home page.
- **Title, Date, Artists, Dates, Hours, Opening, Contact, Flyer** — as needed.
- **Images** — add each image here, with an optional caption. Drag to reorder;
  that is the order they appear in the exhibition's scroll.
- **Text (essay)** — the writing shown on the exhibition's Text page.

(By hand: copy `_exhibitions/evil-rat.md` to `_exhibitions/<slug>.md` and edit.)

## 2. Create the exhibition's pages

Duplicate the folder `exhibitions/evil-rat/` and rename it to your slug, e.g.
`exhibitions/spring-2027/`. Inside it are three files:

- `index.html`
- `images/index.html`
- `text/index.html`

In all three, change the line `exhibition_slug: evil-rat` to your slug
(`exhibition_slug: spring-2027`). Nothing else needs to change.

That's it — the new exhibition appears in the list on the home page, with its
own flyer, image scroll, and text.
