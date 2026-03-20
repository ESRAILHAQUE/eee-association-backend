-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('draft', 'published', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('workshop', 'seminar', 'competition', 'cultural', 'meeting', 'other');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventType" "EventType" NOT NULL DEFAULT 'other',
    "status" "EventStatus" NOT NULL DEFAULT 'draft',
    "venue" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "targetBatch" TEXT,
    "maxCapacity" INTEGER,
    "createdById" TEXT NOT NULL,
    "approvedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_rsvps" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_status_idx" ON "events"("status");

-- CreateIndex
CREATE INDEX "events_startAt_idx" ON "events"("startAt");

-- CreateIndex
CREATE INDEX "events_targetBatch_idx" ON "events"("targetBatch");

-- CreateIndex
CREATE INDEX "events_createdById_idx" ON "events"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "event_rsvps_eventId_userId_key" ON "event_rsvps"("eventId", "userId");

-- CreateIndex
CREATE INDEX "event_rsvps_eventId_idx" ON "event_rsvps"("eventId");

-- CreateIndex
CREATE INDEX "event_rsvps_userId_idx" ON "event_rsvps"("userId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
