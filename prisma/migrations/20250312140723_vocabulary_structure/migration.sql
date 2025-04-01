/*
  Warnings:

  - You are about to drop the column `wordId` on the `ExampleSentence` table. All the data in the column will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToWord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `vocabularyId` to the `ExampleSentence` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('word', 'phrase', 'grammar');

-- DropForeignKey
ALTER TABLE "ExampleSentence" DROP CONSTRAINT "ExampleSentence_wordId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TagToWord" DROP CONSTRAINT "_TagToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToWord" DROP CONSTRAINT "_TagToWord_B_fkey";

-- AlterTable
ALTER TABLE "ExampleSentence" DROP COLUMN "wordId",
ADD COLUMN     "vocabularyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "_TagToWord";

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "genre" "Genre" NOT NULL DEFAULT 'word',
    "definition" TEXT NOT NULL,
    "partOfSpeech" "PartOfSpeech",
    "notes" TEXT,
    "lastReviewed" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plural" TEXT,
    "pastTense" TEXT,
    "pastParticiple" TEXT,
    "presentParticiple" TEXT,
    "presentTense" TEXT,
    "thirdPersonSingular" TEXT,
    "comparative" TEXT,
    "superlative" TEXT,
    "possessive" TEXT,
    "objective" TEXT,
    "reflexive" TEXT,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToVocabulary" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TagToVocabulary_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TagToVocabulary_B_index" ON "_TagToVocabulary"("B");

-- AddForeignKey
ALTER TABLE "ExampleSentence" ADD CONSTRAINT "ExampleSentence_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToVocabulary" ADD CONSTRAINT "_TagToVocabulary_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToVocabulary" ADD CONSTRAINT "_TagToVocabulary_B_fkey" FOREIGN KEY ("B") REFERENCES "Vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
