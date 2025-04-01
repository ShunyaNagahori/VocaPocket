"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const EditDeleteButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const handleDelete = () => {
    toast({
      title: "ボキャブラリーを削除しました",
      description: "リストから削除されました。",
    });
    router.push("/vocabulary");
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:text-primary" onClick={() => router.push(`/vocabulary/edit/${id}`)}>
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={handleDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default EditDeleteButton
