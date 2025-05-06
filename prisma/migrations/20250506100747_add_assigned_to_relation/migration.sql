-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedToId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
