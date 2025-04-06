'use server';

import { prisma } from '@/lib/prisma';

export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return { success: true, user };
  } catch (error) {
    throw error;
  }
}
