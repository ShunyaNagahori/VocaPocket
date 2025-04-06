"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ProfileFormData = {
  name: string;
  email: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
};

export async function updateProfile(formData: ProfileFormData) {
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

export async function updatePassword(formData: PasswordFormData): Promise<{ success: boolean, error?: string }> {
  try {
    const supabase = createServerActionClient({ cookies });
    const { currentPassword, newPassword } = formData;
    const { user } = await getSession();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // 現在のパスワードを検証するために、現在のメールアドレスと現在のパスワードでサインインを試みる
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email || '',
      password: currentPassword
    });

    if (signInError) {
      throw new Error("現在のパスワードが正しくありません。");
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      throw new Error("パスワードの更新に失敗しました。");
    }

    return {
      success: true
    };
  } catch (error) {
    throw error;
  }
}
