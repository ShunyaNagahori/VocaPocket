import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSession() {
  const supabase = createServerComponentClient({ cookies });

  // セッションとユーザー情報を取得
  const [{ data: { session } }, { data: { user } }] = await Promise.all([
    supabase.auth.getSession(),
    supabase.auth.getUser()
  ]);

  // セッションがない、またはユーザー認証に失敗した場合
  if (!session || !user) {
    redirect('/login');
  }

  return { session, user };
}
