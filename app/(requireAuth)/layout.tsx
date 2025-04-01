import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from 'lucide-react';

export default function WordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            {/* タイトルとロゴ */}
            <Link href="/" className="flex items-center space-x-2 mr-6">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-xl">VocaPocket</span>
            </Link>

            {/* デスクトップナビゲーション */}
            <div className="hidden md:block">
              <MainNav />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* モバイルメニュー */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <MainNav mobile />
                  <DropdownMenuItem>
                    <ModeToggle mobile />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* デスクトップモードトグル */}
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {/* ボキャブラリー追加ボタン */}
            <Link
              href="/vocabulary/add"
              className={buttonVariants({
                variant: "gradient",
                className: "md:w-auto"
              })}
            >
              <Plus className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">追加</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
