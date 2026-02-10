# EEE Association Backend

REST API backend for the EEE Association platform — member management, authentication, academic & fee tracking, and association engagement.

---

## Features

- **Authentication** — JWT-based login/register with institutional email; login history and failed-attempt tracking
- **User model** — Identity, contact, academic profile, association finance, roles, and lifecycle (student / alumni / teacher)
- **Modular architecture** — Feature-based modules (auth, user, etc.) with clear separation of concerns
- **Validation** — Request validation with `express-validator`
- **Database** — PostgreSQL with Prisma ORM; migrations and type-safe queries

---

## Tech Stack

| Layer        | Technology        |
| ------------ | ----------------- |
| Runtime      | Node.js           |
| Language     | TypeScript        |
| Framework    | Express           |
| ORM          | Prisma            |
| Database     | PostgreSQL        |
| Auth         | JWT, bcryptjs     |
| Validation   | express-validator |

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **PostgreSQL** 14+
- **npm** or **yarn**

---

## Getting Started

### 1. Clone and install

```bash
cd eee-association-backend
npm install
```

### 2. Environment variables

Copy the example env file and set your values:

```bash
cp .env.example .env
```

| Variable           | Description                    | Example                          |
| ------------------ | ------------------------------ | -------------------------------- |
| `NODE_ENV`         | Environment                    | `development` / `production`     |
| `PORT`             | Server port                    | `4000`                           |
| `API_PREFIX`       | Global API path prefix         | `/api`                           |
| `DATABASE_URL`     | PostgreSQL connection string   | `postgresql://user:pass@host:5432/dbname` |
| `JWT_SECRET`       | Secret for signing JWTs        | Strong random string             |
| `JWT_EXPIRES_IN`   | Access token expiry            | `7d`                             |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry (if used) | `30d`                    |

### 3. Database setup

Generate the Prisma client and create/sync the database schema:

```bash
npm run db:generate
npm run db:push
```

For versioned migrations instead:

```bash
npm run db:migrate
```

(When prompted, use a migration name like `init`.)

### 4. Run the server

**Development** (watch mode):

```bash
npm run dev
```

**Production** (build then run):

```bash
npm run build
npm start
```

Base URL: `http://localhost:4000` (or your `PORT`). API root: `http://localhost:4000/api`.

---

## Project Structure

```
eee-association-backend/
├── prisma/
│   └── schema.prisma          # Database schema & migrations
├── src/
│   ├── index.ts               # Entry point
│   ├── app.ts                 # Express app (middleware, routes)
│   ├── server.ts              # HTTP server
│   ├── config/                # App configuration (env)
│   ├── database/              # Prisma client
│   ├── common/                # Shared code
│   │   ├── middleware/        # Auth, error handling, validation
│   │   ├── constants/         # Roles, etc.
│   │   ├── types/
│   │   └── utils/
│   ├── modules/               # Feature modules
│   │   └── auth/             # Auth (login, register, me)
│   │       ├── auth.controller.ts
│   │       ├── auth.service.ts
│   │       ├── auth.repository.ts
│   │       ├── auth.routes.ts
│   │       └── auth.types.ts
│   └── routes/               # Route composition (mount modules)
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start dev server with hot reload     |
| `npm run build`    | Compile TypeScript to `dist/`        |
| `npm start`        | Run production build                 |
| `npm run db:generate` | Generate Prisma client            |
| `npm run db:push`  | Push schema to DB (no migration file)|
| `npm run db:migrate` | Create and run migrations          |
| `npm run db:studio`  | Open Prisma Studio (DB GUI)       |

---

## API Reference

All endpoints are prefixed with `API_PREFIX` (default: `/api`).

### Health

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| GET    | `/api/health`   | API health check |

**Response:** `{ success, message, env, timestamp }`

---

### Authentication

| Method | Endpoint             | Auth required | Description   |
| ------ | -------------------- | ------------- | ------------- |
| POST   | `/api/auth/register` | No           | Register user |
| POST   | `/api/auth/login`    | No           | Login         |
| GET    | `/api/auth/me`       | Yes (Bearer) | Current user  |

#### POST `/api/auth/register`

**Body (JSON):**

| Field               | Type   | Required | Description                |
| ------------------- | ------ | -------- | -------------------------- |
| fullName            | string | Yes      | Full name                  |
| email               | string | Yes      | Institutional email        |
| password            | string | Yes      | Min 6 characters           |
| registrationNumber  | string | No       | University registration no |
| rollNumber          | string | No       | Roll number                |
| batch               | string | No       | Batch                      |
| session             | string | No       | Session                    |
| department          | string | No       | Department                 |
| program             | string | No       | Program                    |
| enrollmentYear      | number | No       | Year of enrollment         |
| graduationStatus   | string | No       | `studying` \| `graduated` \| `dropped` |
| accountType        | string | No       | `student` \| `alumni` \| `teacher` |
| personalEmail      | string | No       | Personal email             |
| phoneNumber        | string | No       | Phone                      |
| address            | string | No       | Address                    |
| currentRole        | string | No       | `student` \| `cr` \| `moderator` \| `admin` \| `super_admin` |

**Success (201):** `{ success: true, data: { user, accessToken, expiresIn } }`

#### POST `/api/auth/login`

**Body (JSON):**

| Field    | Type   | Required | Description             |
| -------- | ------ | -------- | ----------------------- |
| email    | string | Yes      | Institutional email     |
| password | string | Yes      | Password                |

**Success (200):** `{ success: true, data: { user, accessToken, expiresIn } }`

#### GET `/api/auth/me`

**Headers:** `Authorization: Bearer <accessToken>`

**Success (200):** `{ success: true, data: { user } }` — user includes `id`, `fullName`, `institutionalEmail`, `currentRole`, `accountType`, `emailVerified`.

---

## Database Schema (Overview)

- **User** — Identity, contact, auth, academic summary, fee summary, roles, system metadata, lifecycle; optional JSON for engagement, analytics, compliance.
- **LoginHistory** — Per-user login events (timestamp, IP, user agent).
- **PasswordResetHistory** — Password reset events.
- **AssociationFee** — Semester-wise fees (1–8) per user.
- **AcademicSemester** — Per-user semester records (year, semester number, GPA, result status).
- **AcademicSubject** — Subjects per semester (code, title, credit, marks, grade).
- **RoleHistory** — Role change history per user.

Full schema: `prisma/schema.prisma`.

---

## License

Private — EEE Association. All rights reserved.
