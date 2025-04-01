import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, GraduationCap, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-2xl font-bold">VocaPocket</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="secondary" size="sm">ログイン</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary via-primary/90 to-secondary/80 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">英語語彙をマスター</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            総合的な学習ツールで体系的に語彙力を構築
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                始める
              </Button>
            </Link>
            <Link href="/vocabulary">
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                機能を探る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">強力な学習機能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BookText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">包括的な単語詳細</h3>
              <p className="text-muted-foreground">
                品詞、比較形、複数形などを含む単語を記録。
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-secondary/10 p-3 rounded-full w-fit mb-4">
                <GraduationCap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">例文</h3>
              <p className="text-muted-foreground">
                単語の使い方をより理解するために例文を追加。
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-accent/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">個人アカウント</h3>
              <p className="text-muted-foreground">
                アカウントを作成して語彙コレクションを保存・整理。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-muted py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-primary">VocaPocket</h2>
          </div>
          <p className="text-muted-foreground">© 2025 VocaPocket. 全著作権所有。</p>
        </div>
      </footer>
    </div>
  );
}
