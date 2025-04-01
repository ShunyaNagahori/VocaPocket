'use server';

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { PartOfSpeech } from "@prisma/client";

type Example = {
  text: string;
  translation: string;
};

type VocabularyFormData = {
  content: string;
  genre: "word" | "phrase" | "grammar";
  partOfSpeech: string | null | undefined;
  meaning: string;
  notes?: string;
  plural?: string;
  comparative?: string;
  superlative?: string;
  pastTense?: string;
  pastParticiple?: string;
  presentParticiple?: string;
  presentTense?: string;
  thirdPersonSingular?: string;
  possessive?: string;
  objective?: string;
  reflexive?: string;
  examples: Example[];
  tags: string[];
};

export async function addVocabulary(formData: VocabularyFormData) {
  try {
    const { user } = await getSession();

    const tagObjects = await Promise.all(
      formData.tags.map(async (tagName) => {
        const existingTag = await prisma.tag.findUnique({
          where: { name: tagName },
        });

        if (existingTag) {
          return existingTag;
        }

        return await prisma.tag.create({
          data: { name: tagName },
        });
      })
    );

    const vocabulary = await prisma.vocabulary.create({
      data: {
        content: formData.content,
        genre: formData.genre,
        partOfSpeech: formData.partOfSpeech as PartOfSpeech | null,
        meaning: formData.meaning,
        notes: formData.notes,
        // 名詞の変化形
        plural: formData.plural,
        // 動詞の変化形
        pastTense: formData.pastTense,
        pastParticiple: formData.pastParticiple,
        presentParticiple: formData.presentParticiple,
        presentTense: formData.presentTense,
        thirdPersonSingular: formData.thirdPersonSingular,
        // 形容詞・副詞の変化形
        comparative: formData.comparative,
        superlative: formData.superlative,
        // 代名詞の変化形
        possessive: formData.possessive,
        objective: formData.objective,
        reflexive: formData.reflexive,
        // リレーション
        userId: user.id,
        tags: {
          connect: tagObjects.map((tag) => ({ id: tag.id })),
        },
        examples: {
          create: formData.examples.map((example) => ({
            text: example.text,
            translation: example.translation,
          })),
        },
      },
    });

    revalidatePath('/vocabulary');

    return { success: true, vocabulary };
  } catch (error) {
    console.error('ボキャブラリー追加エラー:', error);
    return { success: false, error: '登録中にエラーが発生しました。' };
  }
}
