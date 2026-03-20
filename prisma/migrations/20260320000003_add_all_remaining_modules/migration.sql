-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('unread', 'read');

-- CreateEnum
CREATE TYPE "ForumPostStatus" AS ENUM ('active', 'flagged', 'removed');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('open', 'in_progress', 'resolved', 'dismissed');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ResourceStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('iot', 'matlab', 'power', 'embedded', 'software', 'research', 'other');

-- CreateTable: attendance_qrs
CREATE TABLE "attendance_qrs" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "token" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendance_qrs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "attendance_qrs_eventId_key" ON "attendance_qrs"("eventId");
CREATE UNIQUE INDEX "attendance_qrs_token_key" ON "attendance_qrs"("token");

-- CreateTable: attendances
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "attendances_eventId_userId_key" ON "attendances"("eventId", "userId");
CREATE INDEX "attendances_eventId_idx" ON "attendances"("eventId");
CREATE INDEX "attendances_userId_idx" ON "attendances"("userId");

-- CreateTable: certificates
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "issuedById" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "certificates_userId_eventId_key" ON "certificates"("userId", "eventId");
CREATE INDEX "certificates_userId_idx" ON "certificates"("userId");
CREATE INDEX "certificates_eventId_idx" ON "certificates"("eventId");

-- CreateTable: notifications
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'unread',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "notifications_userId_status_idx" ON "notifications"("userId", "status");

-- CreateTable: forum_categories
CREATE TABLE "forum_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "forum_categories_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "forum_categories_name_key" ON "forum_categories"("name");

-- CreateTable: forum_posts
CREATE TABLE "forum_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "status" "ForumPostStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "forum_posts_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "forum_posts_categoryId_idx" ON "forum_posts"("categoryId");
CREATE INDEX "forum_posts_authorId_idx" ON "forum_posts"("authorId");
CREATE INDEX "forum_posts_status_idx" ON "forum_posts"("status");

-- CreateTable: forum_comments
CREATE TABLE "forum_comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "forum_comments_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "forum_comments_postId_idx" ON "forum_comments"("postId");

-- CreateTable: forum_votes
CREATE TABLE "forum_votes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vote" INTEGER NOT NULL,
    CONSTRAINT "forum_votes_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "forum_votes_postId_userId_key" ON "forum_votes"("postId", "userId");

-- CreateTable: feedbacks
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "submittedById" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "batch" TEXT,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'open',
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "feedbacks_status_idx" ON "feedbacks"("status");
CREATE INDEX "feedbacks_batch_idx" ON "feedbacks"("batch");

-- CreateTable: leave_requests
CREATE TABLE "leave_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "leaveDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'pending',
    "reviewedById" TEXT,
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "leave_requests_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "leave_requests_userId_idx" ON "leave_requests"("userId");
CREATE INDEX "leave_requests_status_idx" ON "leave_requests"("status");

-- CreateTable: resources
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "subject" TEXT NOT NULL,
    "semester" INTEGER,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "status" "ResourceStatus" NOT NULL DEFAULT 'pending',
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "batch" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "resources_subject_idx" ON "resources"("subject");
CREATE INDEX "resources_status_idx" ON "resources"("status");
CREATE INDEX "resources_uploadedById_idx" ON "resources"("uploadedById");

-- CreateTable: clubs
CREATE TABLE "clubs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "clubs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "clubs_name_key" ON "clubs"("name");

-- CreateTable: club_members
CREATE TABLE "club_members" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "club_members_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "club_members_clubId_userId_key" ON "club_members"("clubId", "userId");
CREATE INDEX "club_members_clubId_idx" ON "club_members"("clubId");
CREATE INDEX "club_members_userId_idx" ON "club_members"("userId");

-- CreateTable: projects
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL DEFAULT 'other',
    "batch" TEXT,
    "githubUrl" TEXT,
    "docUrl" TEXT,
    "userId" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "projects_userId_idx" ON "projects"("userId");
CREATE INDEX "projects_batch_idx" ON "projects"("batch");

-- CreateTable: mentor_profiles
CREATE TABLE "mentor_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expertise" TEXT[],
    "bio" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "mentor_profiles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "mentor_profiles_userId_key" ON "mentor_profiles"("userId");

-- CreateTable: mentor_sessions
CREATE TABLE "mentor_sessions" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "mentor_sessions_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "mentor_sessions_mentorId_idx" ON "mentor_sessions"("mentorId");
CREATE INDEX "mentor_sessions_menteeId_idx" ON "mentor_sessions"("menteeId");

-- CreateTable: documents
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'all',
    "uploadedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "documents_category_idx" ON "documents"("category");
CREATE INDEX "documents_uploadedById_idx" ON "documents"("uploadedById");

-- AddForeignKeys: attendance_qrs
ALTER TABLE "attendance_qrs" ADD CONSTRAINT "attendance_qrs_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "attendance_qrs" ADD CONSTRAINT "attendance_qrs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: attendances
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKeys: certificates
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: notifications
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKeys: forum
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "forum_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "forum_comments" ADD CONSTRAINT "forum_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "forum_comments" ADD CONSTRAINT "forum_comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "forum_votes" ADD CONSTRAINT "forum_votes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "forum_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "forum_votes" ADD CONSTRAINT "forum_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKeys: feedbacks
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: leave_requests
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKeys: resources
ALTER TABLE "resources" ADD CONSTRAINT "resources_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: clubs
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "club_members" ADD CONSTRAINT "club_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKeys: projects
ALTER TABLE "projects" ADD CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: mentor_profiles
ALTER TABLE "mentor_profiles" ADD CONSTRAINT "mentor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "mentor_sessions" ADD CONSTRAINT "mentor_sessions_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "mentor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "mentor_sessions" ADD CONSTRAINT "mentor_sessions_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKeys: documents
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed default forum categories
INSERT INTO "forum_categories" ("id", "name") VALUES
  ('cat_general', 'General Discussion'),
  ('cat_academic', 'Academic Help'),
  ('cat_projects', 'Projects & Research'),
  ('cat_career', 'Career & Internships'),
  ('cat_events', 'Events & Activities');
