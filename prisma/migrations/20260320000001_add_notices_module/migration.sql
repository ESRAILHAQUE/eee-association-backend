-- CreateEnum
CREATE TYPE "NoticeTarget" AS ENUM ('all', 'batch_specific');

-- CreateTable
CREATE TABLE "notices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "targetType" "NoticeTarget" NOT NULL DEFAULT 'all',
    "batch" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notices_batch_idx" ON "notices"("batch");

-- CreateIndex
CREATE INDEX "notices_createdById_idx" ON "notices"("createdById");

-- AddForeignKey
ALTER TABLE "notices" ADD CONSTRAINT "notices_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
