/*
  Warnings:

  - You are about to drop the column `academicDapertmentId` on the `students` table. All the data in the column will be lost.
  - Added the required column `academicDepartmentId` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_academicDapertmentId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "academicDapertmentId",
ADD COLUMN     "academicDepartmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_academicDepartmentId_fkey" FOREIGN KEY ("academicDepartmentId") REFERENCES "academic_depertment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
