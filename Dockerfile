# syntax=docker.io/docker/dockerfile:1

# Задаем базовый образ Node.js Alpine для всех этапов сборки
FROM node:18-alpine AS base

# Установка зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы управления зависимостями
COPY package.json package-lock.json* ./
# Устанавливаем зависимости в чистом режиме
RUN npm ci

# Сборка приложения
FROM base AS builder
WORKDIR /
# Копируем файлы Prisma для генерации клиента
COPY ./prisma ./prisma

WORKDIR /app
# Устанавливаем tsx для выполнения TypeScript
RUN npm install tsx
# Копируем установленные зависимости и исходный код
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерируем клиент Prisma
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Подготовка продакшн-образа
FROM base AS runner
WORKDIR /app

# Устанавливаем режим production
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем статические файлы
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копируем файлы Prisma
COPY --from=builder --chown=nextjs:nodejs /prisma ./prisma

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем миграции, сидирование базы данных и сервер
CMD \
    npx prisma migrate deploy; npx tsx ./prisma/seed.ts; node server.js;