/*
  Warnings:

  - You are about to drop the column `definition` on the `Vocabulary` table. All the data in the column will be lost.
  - Added the required column `meaning` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "definition",
ADD COLUMN     "meaning" TEXT NOT NULL;
