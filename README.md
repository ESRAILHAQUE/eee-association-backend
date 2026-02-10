# EEE Association Backend

TypeScript + Express + Prisma + PostgreSQL. Modular pattern, auth module ready.

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET`.
2. Install and generate Prisma client:
   ```bash
   npm install
   npx prisma generate
   ```
3. Create DB and tables:
   ```bash
   npx prisma db push
   ```
   Or use migrations: `npx prisma migrate dev --name init`
4. Run dev server:
   ```bash
   npm run dev
   ```

## API (default prefix `/api`)

- `POST /api/auth/register` – Register (body: email, password, name?, role?)
- `POST /api/auth/login` – Login (body: email, password)
- `GET /api/auth/me` – Current user (Header: `Authorization: Bearer <token>`)
- `GET /api/health` – Health check

## Schema

User schema is in `prisma/schema.prisma`. Apni schema pore diben, then `schema.prisma` update kore `prisma migrate dev` or `prisma db push` run korben.
