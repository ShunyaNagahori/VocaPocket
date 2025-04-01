/*
  Warnings:

  - You are about to drop the column `word` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the `WordVariation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WordVariation" DROP CONSTRAINT "WordVariation_wordId_fkey";

-- DropIndex
DROP INDEX "Word_word_idx";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "word",
ADD COLUMN     "comparative" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "pastParticiple" TEXT,
ADD COLUMN     "pastTense" TEXT,
ADD COLUMN     "plural" TEXT,
ADD COLUMN     "presentParticiple" TEXT,
ADD COLUMN     "superlative" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "WordVariation";
