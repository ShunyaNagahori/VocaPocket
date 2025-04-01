"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const BackButton = ({ label, href }: { label: string, href: string }) => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      className="px-0 sm:mb-6 hover:bg-transparent"
      onClick={() => router.push(href)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

export default BackButton
