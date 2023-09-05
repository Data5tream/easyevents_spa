FROM node:20.5-alpine AS builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm i --frozen-lockfile

COPY svelte.config.js tsconfig.json vite.config.ts ./
COPY static/ static
COPY src/ src
RUN pnpm run build

FROM node:20.5-alpine

WORKDIR /app
COPY --from=builder /app/package.json /app/build ./

EXPOSE 3000
CMD ["node", "."]
