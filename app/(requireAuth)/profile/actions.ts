"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

type ProfileFormData = {
  name: string;
  email: string;
};


export async function updateProfile(formData: ProfileFormData): Promise<{ success: boolean }> {
  try {
    const { user } = await getSession();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const { name, email } = formData;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    throw error;
  }
}
