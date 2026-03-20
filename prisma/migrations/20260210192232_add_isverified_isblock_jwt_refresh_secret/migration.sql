-- CreateEnum
CREATE TYPE "GraduationStatus" AS ENUM ('studying', 'graduated', 'dropped');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('student', 'alumni', 'teacher');




-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('paid', 'partial', 'unpaid');

-- CreateEnum
CREATE TYPE "ResultStatus" AS ENUM ('published', 'withheld');

-- CreateEnum
CREATE TYPE "AcademicStanding" AS ENUM ('good', 'probation', 'warning');

-- CreateEnum
CREATE TYPE "FeeComplianceStatus" AS ENUM ('clear', 'pending');

-- CreateEnum
CREATE TYPE "CurrentRole" AS ENUM ('student', 'cr', 'moderator', 'admin', 'super_admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "registrationNumber" TEXT,
    "rollNumber" TEXT,
    "batch" TEXT,
    "session" TEXT,
    "department" TEXT,
    "program" TEXT,
    "enrollmentYear" INTEGER,
    "graduationStatus" "GraduationStatus" DEFAULT 'studying',
    "accountType" "AccountType" NOT NULL DEFAULT 'student',
    "institutionalEmail" TEXT NOT NULL,
    "personalEmail" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "passwordHash" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBlock" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "accountLocked" BOOLEAN NOT NULL DEFAULT false,
    "totalCreditsCompleted" INTEGER DEFAULT 0,
    "cgpa" DOUBLE PRECISION,
    "academicStanding" "AcademicStanding",
    "totalPayable" DECIMAL(12,2),
    "totalPaid" DECIMAL(12,2),
    "totalDue" DECIMAL(12,2),
    "feeComplianceStatus" "FeeComplianceStatus",
    "currentRole" "CurrentRole" NOT NULL DEFAULT 'student',
    "approvalStatus" TEXT,
    "accessLevel" TEXT,
    "accountCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "lastReviewedByAdmin" TIMESTAMP(3),
    "dataConsent" BOOLEAN NOT NULL DEFAULT false,
    "archiveStatus" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isAlumni" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "roleHistoryJson" JSONB,
    "transcriptMetadata" JSONB,
    "backlogHistory" JSONB,
    "associationEngagement" JSONB,
    "communicationFeedback" JSONB,
    "analyticsTracking" JSONB,
    "complianceDiscipline" JSONB,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "login_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenUsed" TEXT,

    CONSTRAINT "password_reset_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "association_fees" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "feeAmount" DECIMAL(12,2) NOT NULL,
    "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "dueAmount" DECIMAL(12,2) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'unpaid',
    "paymentMethod" TEXT,
    "transactionReference" TEXT,
    "paymentDate" TIMESTAMP(3),

    CONSTRAINT "association_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_semesters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semesterNumber" INTEGER NOT NULL,
    "semesterGPA" DOUBLE PRECISION,
    "resultStatus" "ResultStatus",

    CONSTRAINT "academic_semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_subjects" (
    "id" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,
    "subjectTitle" TEXT NOT NULL,
    "credit" DOUBLE PRECISION NOT NULL,
    "theoryMarks" DOUBLE PRECISION,
    "practicalMarks" DOUBLE PRECISION,
    "totalMarks" DOUBLE PRECISION,
    "grade" TEXT,
    "gradePoint" DOUBLE PRECISION,

    CONSTRAINT "academic_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_history" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "role_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_registrationNumber_key" ON "users"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_institutionalEmail_key" ON "users"("institutionalEmail");

-- CreateIndex
CREATE INDEX "login_history_userId_idx" ON "login_history"("userId");

-- CreateIndex
CREATE INDEX "password_reset_history_userId_idx" ON "password_reset_history"("userId");

-- CreateIndex
CREATE INDEX "association_fees_userId_idx" ON "association_fees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "association_fees_userId_semesterNumber_key" ON "association_fees"("userId", "semesterNumber");

-- CreateIndex
CREATE INDEX "academic_semesters_userId_idx" ON "academic_semesters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "academic_semesters_userId_year_semesterNumber_key" ON "academic_semesters"("userId", "year", "semesterNumber");

-- CreateIndex
CREATE INDEX "academic_subjects_semesterId_idx" ON "academic_subjects"("semesterId");

-- CreateIndex
CREATE INDEX "role_history_userId_idx" ON "role_history"("userId");

-- AddForeignKey
ALTER TABLE "login_history" ADD CONSTRAINT "login_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_history" ADD CONSTRAINT "password_reset_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "association_fees" ADD CONSTRAINT "association_fees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_semesters" ADD CONSTRAINT "academic_semesters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_subjects" ADD CONSTRAINT "academic_subjects_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "academic_semesters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_history" ADD CONSTRAINT "role_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
