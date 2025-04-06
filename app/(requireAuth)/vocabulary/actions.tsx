"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function deleteVocabulary(id: string): Promise<{ success: boolean }> {
  try {
    const { user } = await getSession();

    await prisma.vocabulary.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    revalidatePath("/vocabulary");

    return { success: true };
  } catch (error) {
    throw error;
  }
}
