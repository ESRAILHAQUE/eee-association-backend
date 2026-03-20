# EEE Association — Backend API

REST API for the **EEE Department Association Management System** at Sylhet Engineering College. Handles authentication, role-based access, fee tracking, events, attendance, forum, and more.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v22 |
| Framework | Express.js |
| Language | TypeScript |
| ORM | Prisma |
| Database | PostgreSQL (Neon Serverless) |
| Auth | JWT + bcryptjs |
| Validation | express-validator |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon connection string)

### Installation

```bash
cd eee-association-backend
npm install
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
PORT=4000
API_PREFIX="/api"
FRONTEND_URL="http://localhost:3000"
```

### Development

```bash
npm run dev          # tsx watch (hot reload)
```

### Build & Production

```bash
npm run build        # prisma generate + tsc → dist/
npm start            # node dist/server.js
```

### Database

```bash
npm run db:migrate   # Run pending migrations
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Open Prisma Studio (GUI)
```

> **Neon Free Tier:** The DB pauses when idle. Wake it up first, then run `npm run db:migrate`.

---

## Project Structure

```
src/
├── app.ts                     # Express app — CORS, middleware, routes
├── server.ts                  # HTTP server entry point
├── config.ts                  # Env config
├── database.ts                # Prisma client singleton
├── common/
│   └── middleware/
│       ├── authMiddleware.ts  # JWT verify + requireRoles()
│       ├── errorHandler.ts    # Global error handler
│       └── validate.ts        # express-validator wrapper
├── modules/
│   ├── auth/                  # Login, register, /me
│   ├── users/                 # User list, role/verify/block
│   ├── notices/               # Notice board (CR batch-scoped)
│   ├── events/                # Events + RSVP
│   ├── notifications/         # Push notifications by role/batch
│   ├── attendance/            # QR generation + scan
│   ├── certificates/          # Issue + fetch certificates
│   ├── feedback/              # Anonymous feedback (batch-scoped)
│   ├── leave/                 # Leave requests + CR/admin review
│   ├── resources/             # Study resources + approval flow
│   ├── clubs/                 # Club join/leave management
│   ├── projects/              # Student project showcase + likes
│   ├── mentorship/            # Mentor profiles + session requests
│   ├── documents/             # Official document repository
│   ├── forum/                 # Posts, comments, votes, moderation
│   ├── fees/                  # Association fee tracking + payments
│   ├── analytics/             # Aggregate stats (admin/super admin)
│   ├── logs/                  # Login history + audit logs
│   └── newsletter/            # Newsletter compose + history
└── routes/
    └── index.ts               # Central route registration
prisma/
├── schema.prisma              # Full DB schema
└── migrations/                # SQL migration files
```

---

## API Reference

Base URL: `http://localhost:4000/api`

### Health

```
GET /api/health
```

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register new account |
| POST | `/auth/login` | No | Login → access token |
| GET | `/auth/me` | Bearer | Get current user + profile |

### Users

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| GET | `/users` | admin, super_admin | List users (filter: role, batch, search) |
| PATCH | `/users/:id/role` | super_admin | Update role |
| PATCH | `/users/:id/verify` | admin, super_admin | Verify account |
| PATCH | `/users/:id/block` | admin, super_admin | Block / unblock |

### Notices

| Method | Endpoint | Roles |
|---|---|---|
| GET | `/notices` | All authenticated |
| POST | `/notices` | cr, admin, super_admin |
| DELETE | `/notices/:id` | cr, admin, super_admin |

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/events` | List events (filter: status, targetBatch) |
| POST | `/events` | Create event |
| PATCH | `/events/:id/status` | Publish / cancel / complete |
| POST | `/events/:id/rsvp` | RSVP |
| DELETE | `/events/:id/rsvp` | Cancel RSVP |
| DELETE | `/events/:id` | Delete event |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/notifications/my` | My notifications |
| POST | `/notifications/send` | Send to role/batch (admin, cr) |
| PATCH | `/notifications/read-all` | Mark all read |

### Attendance

| Method | Endpoint | Description |
|---|---|---|
| POST | `/attendance/qr/generate` | Generate QR token for event |
| GET | `/attendance/qr/:eventId` | Get active QR |
| POST | `/attendance/scan` | Scan QR to mark attendance |
| GET | `/attendance/my` | My attendance records |
| GET | `/attendance/event/:eventId` | Event attendance list |

### Certificates

| Method | Endpoint | Description |
|---|---|---|
| GET | `/certificates/my` | My certificates |
| POST | `/certificates/issue` | Bulk issue certificates |
| GET | `/certificates/event/:eventId` | Event certificates |

### Fees

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| GET | `/fees/my` | student | My semester fee records |
| GET | `/fees` | cr, admin, super_admin | All fees (CR auto-scoped to batch) |
| GET | `/fees/stats` | cr, admin, super_admin | Aggregate stats |
| POST | `/fees` | admin, cr | Create fee record |
| PATCH | `/fees/:id/payment` | admin, cr | Record payment |

### Feedback

| Method | Endpoint | Description |
|---|---|---|
| GET | `/feedback` | List (CR sees own batch) |
| POST | `/feedback` | Submit feedback |
| PATCH | `/feedback/:id` | Update status/resolution |

### Leave

| Method | Endpoint | Description |
|---|---|---|
| GET | `/leave/my` | My leave requests |
| GET | `/leave` | All requests (CR batch-scoped) |
| POST | `/leave` | Submit leave request |
| PATCH | `/leave/:id` | Approve / reject |

### Resources

| Method | Endpoint | Description |
|---|---|---|
| GET | `/resources` | Approved resources |
| GET | `/resources/pending` | Pending approval (cr, admin) |
| POST | `/resources` | Upload resource |
| PATCH | `/resources/:id/status` | Approve / reject |

### Clubs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/clubs` | All clubs |
| GET | `/clubs/my` | My clubs |
| POST | `/clubs` | Create club (admin) |
| POST | `/clubs/:id/join` | Join club |
| DELETE | `/clubs/:id/leave` | Leave club |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects` | List projects (filter: category, batch) |
| POST | `/projects` | Submit project |
| POST | `/projects/:id/like` | Like project |
| DELETE | `/projects/:id` | Delete project |

### Mentorship

| Method | Endpoint | Description |
|---|---|---|
| GET | `/mentorship/mentors` | Active mentors |
| POST | `/mentorship/register` | Register as mentor |
| POST | `/mentorship/sessions` | Request session |
| GET | `/mentorship/sessions/my` | My sessions |

### Forum

| Method | Endpoint | Description |
|---|---|---|
| GET | `/forum/categories` | Forum categories |
| GET | `/forum/posts` | Posts (filter: categoryId) |
| POST | `/forum/posts` | Create post |
| GET | `/forum/posts/:id/comments` | Post comments |
| POST | `/forum/posts/:id/comments` | Add comment |
| POST | `/forum/posts/:id/vote` | Vote (+1/-1) |
| PATCH | `/forum/posts/:id/status` | Moderate post |

### Documents

| Method | Endpoint | Roles |
|---|---|---|
| GET | `/documents` | All authenticated |
| POST | `/documents` | admin, super_admin |
| DELETE | `/documents/:id` | admin, super_admin |

### Analytics

| Method | Endpoint | Roles |
|---|---|---|
| GET | `/analytics/overview` | admin, super_admin |
| GET | `/analytics/batch/:batch` | cr, admin, super_admin |

### Logs

| Method | Endpoint | Roles |
|---|---|---|
| GET | `/logs/logins` | admin, super_admin |
| GET | `/logs/password-resets` | admin, super_admin |

### Newsletter

| Method | Endpoint | Roles |
|---|---|---|
| GET | `/newsletter` | admin, super_admin |
| POST | `/newsletter/send` | super_admin |

---

## Role System

| Role | Access Level |
|---|---|
| `student` | Read: notices, events, resources. Submit: feedback, leave, projects. |
| `cr` | Batch-scoped management: notices, attendance, fees, leave review, certificates. |
| `moderator` | Moderate: events, forum, resources, clubs, notifications. |
| `admin` | Full department management. All modules except system-level. |
| `super_admin` | Full system access: users, analytics, logs, newsletter, all modules. |

### CR Batch Scoping

All CR operations are automatically scoped to the CR's own batch. The service layer reads `UserProfile.batch` via the authenticated `userId` and filters all DB queries accordingly. A CR **cannot** access or modify data for other batches.

---

## CORS

Configured in `app.ts` to allow:
- Origin: `FRONTEND_URL` env var (default: `http://localhost:3000`)
- Credentials: `true`
- Methods: `GET, POST, PUT, PATCH, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`

---

## License

Private — EEE Association, Sylhet Engineering College. All rights reserved.
