import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import EditForm from "./EditForm";
import { notFound } from "next/navigation";

export default async function EditVocabularyPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = await getSession();

  // ボキャブラリーを取得
  const vocabulary = await prisma.vocabulary.findUnique({
    where: {
      id: id,
      userId: user.id
    },
    include: {
      tags: true,
      examples: true,
    }
  });

  // ボキャブラリーが見つからない場合は404
  if (!vocabulary) {
    notFound();
  }

  return (
    <div>
      <EditForm vocabulary={vocabulary} />
    </div>
  );
}
