/*
  Warnings:

  - You are about to drop the `CourseToPrerequisite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseToPrerequisite" DROP CONSTRAINT "CourseToPrerequisite_preRequisiteId_fkey";

-- DropTable
DROP TABLE "CourseToPrerequisite";

-- CreateTable
CREATE TABLE "courseToPrerequisites" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "courseToPrerequisites_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "courseToPrerequisites" ADD CONSTRAINT "courseToPrerequisites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseToPrerequisites" ADD CONSTRAINT "courseToPrerequisites_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
