"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { PartOfSpeech } from "@prisma/client";

interface Example {
  id: string;
  text: string;
  translation: string;
}

type VocabularyFormData = {
  id: string;
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
  tags: {id: string | null, name: string}[];
};

export async function updateVocabulary(formData: VocabularyFormData) {
  try {
    const { user } = await getSession();

    // 既存のボキャブラリーを確認
    const existingVocabulary = await prisma.vocabulary.findUnique({
      where: {
        id: formData.id,
        userId: user.id,
      },
      include: {
        examples: true,
        tags: true,
      },
    });

    if (!existingVocabulary) {
      return {
        success: false,
        error: "ボキャブラリーが見つかりません。",
      };
    }


    const existingTagIds = existingVocabulary.tags.map(tag => tag.id);
    // 削除すべきタグ（既存のタグIDのうち、フォームから送られてこなかったもの）
    const tagIdsToRemove = existingTagIds.filter(id => !formData.tags.some(tag => tag.id === id));
    // 新規追加するタグ（フォームから送られてきたがIDがないもの）
    const newTagNames = formData.tags.filter(tag => !tag.id).map(tag => tag.name);
    const newTagObjects = await Promise.all(
      newTagNames.map(async (tagName) => {
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


    // ボキャブラリーを更新
    const updatedVocabulary = await prisma.vocabulary.update({
      where: {
        id: formData.id,
        userId: user.id,
      },
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
        tags: {
          connect: newTagObjects.map(tag => ({ id: tag.id })),
          disconnect: tagIdsToRemove.map(id => ({ id })),
        },
      }
    });

    // 例文の処理
    // 1. 既存の例文IDを取得
    const existingExampleIds = existingVocabulary.examples.map(example => example.id);

    // 2. 削除された例文を特定（既存の例文のうち、フォームから送られてこなかったもの）
    const exampleIdsToDelete = existingExampleIds.filter(
      id => !formData.examples.some(example => example.id === id)
    );

    // 3. 削除対象の例文を削除
    if (exampleIdsToDelete.length > 0) {
      await prisma.exampleSentence.deleteMany({
        where: {
          id: {
            in: exampleIdsToDelete
          }
        }
      });
    }

    // 4. 例文の更新と追加
    for (const example of formData.examples) {
      const isExisting = existingExampleIds.includes(example.id);

      if (isExisting) {
        // 既存の例文を更新
        await prisma.exampleSentence.update({
          where: {
            id: example.id
          },
          data: {
            text: example.text,
            translation: example.translation
          }
        });
      } else {
        // 新しい例文を追加
        await prisma.exampleSentence.create({
          data: {
            text: example.text,
            translation: example.translation,
            vocabularyId: formData.id
          }
        });
      }
    }

    // ボキャブラリーと紐づいていないタグを削除
    const tagsWithNoVocabulary = await prisma.tag.findMany({
      where: {
        vocabulary: {
          none: {}
        }
      }
    });

    await prisma.tag.deleteMany({
      where: {
        id: {
          in: tagsWithNoVocabulary.map(tag => tag.id),
        },
      },
    });

    // キャッシュを更新
    revalidatePath("/vocabulary");
    revalidatePath(`/vocabulary/${formData.id}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("ボキャブラリー更新エラー:", error);
    return {
      success: false,
      error: "ボキャブラリーの更新中にエラーが発生しました。",
    };
  }
}
