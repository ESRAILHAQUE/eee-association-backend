-- DropForeignKey
ALTER TABLE "forum_votes" DROP CONSTRAINT "forum_votes_userId_fkey";

-- AlterTable
ALTER TABLE "attendance_qrs" ALTER COLUMN "token" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "forum_votes" ADD CONSTRAINT "forum_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
