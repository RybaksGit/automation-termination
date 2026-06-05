FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

COPY . .

ENV CI=true
ENV HEADLESS=true

CMD ["pnpm", "exec", "playwright", "test", "--project=chromium", "--grep", "@smoke|@api"]
