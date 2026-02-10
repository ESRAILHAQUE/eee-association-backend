/*
  Warnings:

  - You are about to drop the column `academicStanding` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `accessLevel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `accountType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `analyticsTracking` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `approvalStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `archiveStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `associationEngagement` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `backlogHistory` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `batch` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cgpa` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `communicationFeedback` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `complianceDiscipline` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dataConsent` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `enrollmentYear` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `feeComplianceStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `graduationStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isAlumni` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastReviewedByAdmin` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `personalEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleHistoryJson` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rollNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `session` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalCreditsCompleted` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalDue` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalPaid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `totalPayable` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `transcriptMetadata` on the `users` table. All the data in the column will be lost.
  - Made the column `registrationNumber` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "academicStanding",
DROP COLUMN "accessLevel",
DROP COLUMN "accountType",
DROP COLUMN "address",
DROP COLUMN "analyticsTracking",
DROP COLUMN "approvalStatus",
DROP COLUMN "archiveStatus",
DROP COLUMN "associationEngagement",
DROP COLUMN "backlogHistory",
DROP COLUMN "batch",
DROP COLUMN "cgpa",
DROP COLUMN "communicationFeedback",
DROP COLUMN "complianceDiscipline",
DROP COLUMN "dataConsent",
DROP COLUMN "department",
DROP COLUMN "emailVerified",
DROP COLUMN "enrollmentYear",
DROP COLUMN "feeComplianceStatus",
DROP COLUMN "graduationStatus",
DROP COLUMN "isActive",
DROP COLUMN "isAlumni",
DROP COLUMN "lastReviewedByAdmin",
DROP COLUMN "personalEmail",
DROP COLUMN "phoneNumber",
DROP COLUMN "program",
DROP COLUMN "roleHistoryJson",
DROP COLUMN "rollNumber",
DROP COLUMN "session",
DROP COLUMN "totalCreditsCompleted",
DROP COLUMN "totalDue",
DROP COLUMN "totalPaid",
DROP COLUMN "totalPayable",
DROP COLUMN "transcriptMetadata",
ALTER COLUMN "registrationNumber" SET NOT NULL;

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "rollNumber" TEXT,
    "batch" TEXT,
    "session" TEXT,
    "department" TEXT,
    "program" TEXT,
    "enrollmentYear" INTEGER,
    "graduationStatus" "GraduationStatus" DEFAULT 'studying',
    "accountType" "AccountType" NOT NULL DEFAULT 'student',
    "personalEmail" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "totalCreditsCompleted" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION,
    "academicStanding" "AcademicStanding",
    "totalPayable" DECIMAL(12,2),
    "totalPaid" DECIMAL(12,2),
    "totalDue" DECIMAL(12,2),
    "feeComplianceStatus" "FeeComplianceStatus",
    "approvalStatus" TEXT,
    "accessLevel" TEXT,
    "lastReviewedByAdmin" TIMESTAMP(3),
    "dataConsent" BOOLEAN NOT NULL DEFAULT false,
    "archiveStatus" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAlumni" BOOLEAN NOT NULL DEFAULT false,
    "roleHistoryJson" JSONB,
    "transcriptMetadata" JSONB,
    "backlogHistory" JSONB,
    "associationEngagement" JSONB,
    "communicationFeedback" JSONB,
    "analyticsTracking" JSONB,
    "complianceDiscipline" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_registrationNumber_key" ON "user_profiles"("registrationNumber");

-- CreateIndex
CREATE INDEX "user_profiles_registrationNumber_idx" ON "user_profiles"("registrationNumber");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
