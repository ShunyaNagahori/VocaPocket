'use server';

import { prisma } from '@/lib/prisma';

export async function createUser(data: { id: string; email: string; name: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error('ユーザー作成エラー:', error);
    return { success: false, error: 'ユーザーの作成に失敗しました' };
  }
}
