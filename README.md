# Cherry

A single-page study and wellness app: daily plans, study habits, focus timer, health and exercise tracking, tasks, exam results, dreams, and an AI coach through OpenRouter. It has 10 animated themes and 5 simple ones, a live coach that gives you commands while you work, and installs as a PWA.

No build step and no dependencies. It is plain HTML, CSS and JavaScript.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

The service worker and install prompt need `http://localhost` or HTTPS.

## Publish on GitHub Pages

1. Create a repository and push this folder to the `main` branch.
2. In the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` deploys on every push to `main`.
4. Open the site URL on your phone and choose **Add to Home Screen**.

```bash
git init -b main
git add .
git commit -m "Cherry app"
git remote add origin https://github.com/<you>/cherry.git
git push -u origin main
```

## AI setup (OpenRouter)

Open **Cherry AI**, paste your key from https://openrouter.ai/keys, and type or pick a model. **Load all models** fetches the full list. The key is stored in your browser's local storage and sent only to openrouter.ai.

## Project layout

```
index.html              page shell, loads the scripts in order
css/styles.css          design tokens, layout, components
js/utils.js             date, escape and id helpers
js/icons.js             icon set and the cherry logo
js/themes.js            15 themes and applyTheme()
js/fx.js                canvas backdrops for the 10 animated themes
js/state.js             saved state, example data, data helpers
js/ui.js                rings, meters, bar and line charts
js/engines.js           sound, voice, focus timer, guided workout, coach
js/ai.js                OpenRouter chat and model list
js/views-a.js           Home, Plan, Study, Focus, Health, Exercise
js/views-b.js           Tasks, Results, Dreams, Cherry AI, Style
js/app.js               navigation, actions, forms, boot
sw.js                   offline cache
manifest.webmanifest    PWA manifest
icons/                  app icons (SVG, 192, 512, maskable)
```

Scripts share one global scope and must load in the order listed in `index.html`.

## Adding a theme

Add an entry to the `T` array in `js/themes.js` with a colour set. For an animated theme, add a matching renderer to `M` in `js/fx.js` and set `fx` to its key.

## Data

Everything is saved in `localStorage` under `cherry.v1`. Clearing site data erases it.
