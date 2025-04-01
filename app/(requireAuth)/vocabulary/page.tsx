import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPartOfSpeechLabel } from "@/lib/data";
import { PART_OF_SPEECH_STYLES } from "@/lib/utils";
import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Vocabulary, Tag } from '@prisma/client';

type VocabularyWithTags = Vocabulary & {
  tags: Tag[];
};

type VocabularyListProps = {
  vocabularies: VocabularyWithTags[];
};

// ジャンルごとのスタイル定義
const GENRE_STYLES = {
  word: {
    classes: "border-l-primary",
    badgeClasses: "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
    label: "単語"
  },
  phrase: {
    classes: "border-l-secondary",
    badgeClasses: "bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground",
    label: "フレーズ"
  },
  grammar: {
    classes: "border-l-accent",
    badgeClasses: "bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground",
    label: "文法"
  }
};

const getGenreLabel = (genre: string) => {
  return GENRE_STYLES[genre as keyof typeof GENRE_STYLES]?.label || genre;
};

function VocabularyList({ vocabularies }: VocabularyListProps) {
  return (
    <div className="space-y-4">
      {vocabularies.map((vocabulary) => (
        <Link href={`/vocabulary/${vocabulary.id}`} key={vocabulary.id}>
          <Card className={`transition-colors cursor-pointer border-l-4 hover:bg-primary/5 ${GENRE_STYLES[vocabulary.genre as keyof typeof GENRE_STYLES]?.classes || 'border-l-primary'}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{vocabulary.content}</h3>
                  <p className="text-sm mb-2">
                    {vocabulary.meaning}
                    {vocabulary.partOfSpeech && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {getPartOfSpeechLabel(vocabulary.partOfSpeech)}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={GENRE_STYLES[vocabulary.genre as keyof typeof GENRE_STYLES]?.badgeClasses || "bg-slate-500 text-white"}>
                      {getGenreLabel(vocabulary.genre)}
                    </Badge>
                    {vocabulary.tags && vocabulary.tags.map((tag) => (
                      <Badge key={tag.id} className="bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(vocabulary.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default async function WordsPage() {
  const { user } = await getSession();

  const vocabularies = await prisma.vocabulary.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      updatedAt: 'desc'
    },
    include: {
      tags: true
    }
  });

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">リスト</h1>
          <p className="text-muted-foreground">
            登録したボキャブラリーを確認する
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ボキャブラリーを検索..."
                className="pl-8 focus:border-primary"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-muted/50 flex-wrap gap-1 h-auto p-1 justify-start">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-8">すべて</TabsTrigger>
              <TabsTrigger value="words" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-8">単語</TabsTrigger>
              <TabsTrigger value="phrases" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-8">フレーズ</TabsTrigger>
              <TabsTrigger value="grammar" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-8">文法</TabsTrigger>
            </TabsList>

            {/* すべてのジャンル */}
            <TabsContent value="all" className="mt-4">
              <VocabularyList vocabularies={vocabularies} />
            </TabsContent>

            {/* 単語ジャンル */}
            <TabsContent value="words" className="mt-4">
              <Tabs defaultValue="all-words">
                <div className="overflow-x-auto">
                  <TabsList className="bg-muted/50 flex-wrap gap-1 h-auto p-1 justify-start w-full">
                    <TabsTrigger value="all-words" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">すべての単語</TabsTrigger>
                    <TabsTrigger value="nouns" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">名詞</TabsTrigger>
                    <TabsTrigger value="verbs" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">動詞</TabsTrigger>
                    <TabsTrigger value="adjectives" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">形容詞</TabsTrigger>
                    <TabsTrigger value="adverbs" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">副詞</TabsTrigger>
                    <TabsTrigger value="pronouns" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">代名詞</TabsTrigger>
                    <TabsTrigger value="prepositions" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">前置詞</TabsTrigger>
                    <TabsTrigger value="conjunctions" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">接続詞</TabsTrigger>
                    <TabsTrigger value="interjections" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">間投詞</TabsTrigger>
                    <TabsTrigger value="determiners" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary h-8">限定詞</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all-words" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word')} />
                </TabsContent>
                <TabsContent value="nouns" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'noun')} />
                </TabsContent>
                <TabsContent value="verbs" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'verb')} />
                </TabsContent>
                <TabsContent value="adjectives" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'adjective')} />
                </TabsContent>
                <TabsContent value="adverbs" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'adverb')} />
                </TabsContent>
                <TabsContent value="pronouns" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'pronoun')} />
                </TabsContent>
                <TabsContent value="prepositions" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'preposition')} />
                </TabsContent>
                <TabsContent value="conjunctions" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'conjunction')} />
                </TabsContent>
                <TabsContent value="interjections" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'interjection')} />
                </TabsContent>
                <TabsContent value="determiners" className="mt-4">
                  <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'word' && vocabulary.partOfSpeech === 'determiner')} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* フレーズジャンル */}
            <TabsContent value="phrases" className="mt-4">
                <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'phrase')} />
            </TabsContent>

            {/* 文法ジャンル */}
            <TabsContent value="grammar" className="mt-4">
              <VocabularyList vocabularies={vocabularies.filter((vocabulary) => vocabulary.genre === 'grammar')} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle>統計</CardTitle>
              <CardDescription>
                学習の進捗を追跡
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">総登録数</span>
                  <span className="font-bold">{vocabularies.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">単語</span>
                  <span className="font-bold">{vocabularies.filter(v => v.genre === 'word').length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">フレーズ</span>
                  <span className="font-bold">{vocabularies.filter(v => v.genre === 'phrase').length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">文法</span>
                  <span className="font-bold">{vocabularies.filter(v => v.genre === 'grammar').length}</span>
                </div>
                <Separator />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
