# harness-demo

A tiny to-do app that Agent Harness agents build features into, in public, for the product demo. Everything here is sample data.

- `npm test` runs the tests (Node's built-in runner, no dependencies).
- `python3 -m http.server` then open http://localhost:8000 to use it (browsers block ES modules on `file://`, so opening `index.html` directly leaves the list dead).
- Settings > Appearance picks System, Light or Dark; it's saved in `localStorage` and both pages follow it. Colors live in `src/theme.css` as custom properties.
