"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteVocabulary } from "./actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const EditDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteVocabulary(id);
      toast({
        title: "ボキャブラリーを削除しました",
        description: "リストから削除されました。",
      });
      router.push("/vocabulary");
    } catch (error) {
      toast({
        title: "エラー",
        description: "ボキャブラリーの削除に失敗しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:text-primary" onClick={() => router.push(`/vocabulary/edit/${id}`)}>
        <Edit className="h-4 w-4" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/90">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は元に戻せません。このボキャブラリーが完全に削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover:bg-primary/10 hover:text-primary">キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default EditDeleteButton
