-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('lowPriority', 'mediumPriority', 'highPriority');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority";
