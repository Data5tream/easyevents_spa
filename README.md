# Easy Events Organizer SPA

This webapp allows organizers to create and manage events.

For server-side, take a look at [easyevents_api](https://github.com/Data5tream/easyevents_api).

## Deploying

```bash
docker run --rm --init -p 3000:3000 -e PUBLIC_API_HOST=[YOUR_API_HOST] easyevents-spa:latest
```

## Developing

```bash
pnpm i
pnpm run dev
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `npm run preview`.
