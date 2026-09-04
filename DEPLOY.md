# Deploying to GitHub Pages

## One-time setup

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. `.github/workflows/deploy.yml` builds and deploys.

Live at `https://<username>.github.io/<repo-name>/`.

## Build-time environment variables

| Variable        | Purpose                                          | Default |
| --------------- | ------------------------------------------------ | ------- |
| `VITE_BASE`     | Path prefix for built assets                     | `/`     |
| `VITE_SITE_URL` | Absolute origin for `og:url` and `og:image`      | `/`     |

The workflow derives both from the repository name, so nothing needs editing by
hand. Local `npm run dev` and `npm run build` default to `/` and are unaffected.

## Custom domain or user page

For `https://<username>.github.io/` (a repo named `<username>.github.io`) or a
custom domain, the base must stay `/`. Edit the `env:` block in the workflow:

```yaml
env:
  VITE_BASE: /
  VITE_SITE_URL: https://your-domain.com/
```

For a custom domain also add `public/CNAME` containing the domain.

## Testing a subpath build locally

```bash
VITE_BASE=/<repo>/ VITE_SITE_URL=https://<user>.github.io/<repo>/ npm run build
mkdir -p /tmp/pages/<repo> && cp -r dist/* /tmp/pages/<repo>/
cd /tmp/pages && python3 -m http.server 8080
# open http://localhost:8080/<repo>/
```

Serving `dist/` at the root hides base-path bugs. Always test the subdirectory.

## Firebase / Firestore

The Ashirvad wall reads and writes the `wishes` collection in Firestore. The
web config in `firebase-applet-config.json` is not a secret — Firebase web keys
identify the project, they do not authorise it — so committing it is expected.
Access is controlled by `firestore.rules`.

Two things to verify after the first deploy, because both are configured
outside this repository:

1. **API key referrer restrictions.** If the key is restricted to the AI Studio
   Cloud Run origin in Google Cloud Console (APIs & Services → Credentials),
   Firestore calls from `github.io` will be rejected. Add the Pages origin, or
   leave the key unrestricted and rely on the Firestore rules.
2. **Rules are deployed.** `firestore.rules` in this repo is a copy of the
   intended policy; it is not applied by pushing here. Deploy it from the
   Firebase console or with `firebase deploy --only firestore:rules`.

The current rules allow anyone to read all wishes and create new ones subject to
field validation, with updates and deletes denied. That is appropriate for a
public blessings wall, but it does mean an unauthenticated visitor can add
entries. If that becomes a problem, add App Check or a rate limit.

## Notes

- No `404.html` is needed: single page, no client-side router.
- No `.nojekyll` is needed: Vite emits no underscore-prefixed paths.
- Personalisation is gated behind `?edit=true`, and its edits are stored only in
  the editor's own browser. Anything guests must see belongs in
  `src/data/eventData.ts`, committed and rebuilt.
