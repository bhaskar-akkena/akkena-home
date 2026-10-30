# Bhaskar Akkena — Personal Portfolio

A responsive, four-page editorial portfolio built with plain HTML, local CSS, shared design tokens, Inter, JetBrains Mono, and Lucide icons. No build step is required.

## Pages

- `index.html`: introduction, three featured résumé projects and one Mero App placeholder, and social badges.
- `projects.html`: bento layout with accessible project filters.
- `resume.html`: experience timeline, technical skills, education, projects & research, and PDF download.
- `contact.html`: email, clipboard copy with status toast, and social links.

`styles.css` contains the shared layouts and responsive styling. `site.js` handles animated filters, keyboard shortcuts, clipboard feedback, the scrolled header state, icons, and the footer year. `tokens.css` is the shared design-token source; muted text has been brightened for readability.

## Preview

Run `python3 -m http.server 4173` in this folder and visit http://localhost:4173. You can also open `index.html` directly; clipboard support depends on browser permissions, with a fallback provided. Layout and project artwork are served locally, with no browser-side CSS compiler. Google Fonts and the pinned Lucide CDN enhance typography and icons; system fonts and text labels remain usable if those services are unavailable.

## Content maintenance

The name, title, work history, skills, education, research, email, and LinkedIn profile are based on the supplied résumé. The project showcases use five entries from the résumé. Mero App is the only project placeholder:

1. Add the Mero App description, preview, stack, and website URL in both home and projects pages. Its card is intentionally non-interactive until a real URL is supplied. Other cards link to their corresponding résumé entries; no repository or deployment URLs are assumed. Project illustrations are local SVG assets in `assets/`; they are conceptual artwork rather than product screenshots.
2. GitHub and LinkedIn use your supplied profile URLs. The unfinished X profile link has been removed.
3. The contact page uses the email from the supplied résumé in the visible address, `mailto:` links, and `data-copy-email`. Keep these synchronized when updating it.
4. `resume.html` contains the supplied experience, skills, education, and all five research/project entries. `assets/resume.pdf` is an unchanged copy of the supplied résumé. Keep the page and PDF synchronized with future updates.
5. Update page descriptions and favicon if desired. Keep project counts and filter counts synchronized when adding or removing projects.

Each HTML file includes its own semantic header/footer for direct serving without JavaScript rendering or a server-side include. Keep the shared header/footer markup consistent when changing navigation.

## Hosting

Upload the four HTML files, `styles.css`, `site.js`, `tokens.css`, and the `assets` directory to any static host. No secrets, API keys, analytics, or backend are required.

## Interaction behavior

- Overview, Projects, Résumé, and Let’s talk are the shared navigation links. Let’s talk remains visible on mobile and is active on the contact page.
- Project filters support mouse/touch, Tab, Left/Right arrows, Home, and End. The status region announces result counts. Filter controls are hidden if JavaScript is unavailable; all projects remain visible.
- Copy email confirms success on the button and in a status toast. Local-file/clipboard-denied environments attempt a legacy fallback and show a helpful failure message if necessary.
- Hover, focus, press, page entry, and filter transitions respect reduced-motion preferences. Navigation uses native browser links and supports back/forward restoration.
- Main navigation, buttons, and small standalone links have at least 44px-high targets; navigation links are also at least 44px wide.

## Release checks

Run `node --check site.js`, verify local links and the résumé download, and preview all four pages at desktop and narrow mobile widths. Check keyboard navigation, project filters, copy-email feedback, and reduced-motion behavior. Mero App is the only intentional unfinished project slot.
