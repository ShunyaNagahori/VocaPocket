import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPartOfSpeechLabel } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import BackButton from "@/components/BackButton";
import EditDeleteButton from "../EditDeleteButton";

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

// ジャンルのラベルを取得する関数
const getGenreLabel = (genre: string) => {
  return GENRE_STYLES[genre as keyof typeof GENRE_STYLES]?.label || genre;
};

export default async function WordDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = await getSession();
  const word = await prisma.vocabulary.findUnique({
    where: {
      id: id,
      userId: user.id
    },
    include: {
      tags: true,
      examples: true,
    }
  });

  if (!word) {
    return (
      <div className="p-4 sm:py-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">ボキャブラリーが見つかりません</h2>
          <p className="text-muted-foreground mb-6">お探しのボキャブラリーは存在しません。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <BackButton label="リストに戻る" href="/vocabulary" />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{word.content}</h1>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <Badge className={GENRE_STYLES[word.genre as keyof typeof GENRE_STYLES]?.badgeClasses || "bg-slate-500 text-white"}>
                  {getGenreLabel(word.genre)}
                </Badge>
                {word.tags && word.tags.map(tag => (
                  <Badge key={tag.id} className="bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
            <EditDeleteButton id={id} />
          </div>

          <Card className="mb-6 border-t-4 border-t-primary">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2 mb-4">
                <h2 className="text-xl font-semibold">
                  {word.genre === "word" || word.genre === "phrase" ? "意味" : "文法項目"}
                </h2>
                <p className="text-muted-foreground">{word.meaning}</p>
              </div>

              {word.partOfSpeech && (
                <div className="space-y-2 mb-4">
                  <h2 className="text-xl font-semibold">品詞</h2>
                  <p className="text-muted-foreground">{getPartOfSpeechLabel(word.partOfSpeech)}</p>
                </div>
              )}

              {word.notes && (
                <div className="space-y-2 mb-4">
                  <h2 className="text-xl font-semibold">メモ</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{word.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {word.genre === "word" && (
            <Card className="mb-6 border-t-4 border-t-secondary">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">単語の形</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 名詞の変化形 */}
                  {word.partOfSpeech === 'noun' && word.plural && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">複数形:</span>
                      <p>{word.plural}</p>
                    </div>
                  )}

                  {/* 動詞の変化形 */}
                  {word.partOfSpeech === 'verb' && (
                    <>
                      {word.presentTense && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">現在形:</span>
                          <p>{word.presentTense}</p>
                        </div>
                      )}
                      {word.thirdPersonSingular && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">三人称単数現在:</span>
                          <p>{word.thirdPersonSingular}</p>
                        </div>
                      )}
                      {word.pastTense && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">過去形:</span>
                          <p>{word.pastTense}</p>
                        </div>
                      )}
                      {word.pastParticiple && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">過去分詞:</span>
                          <p>{word.pastParticiple}</p>
                        </div>
                      )}
                      {word.presentParticiple && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">現在分詞:</span>
                          <p>{word.presentParticiple}</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* 形容詞・副詞の変化形 */}
                  {(word.partOfSpeech === 'adjective' || word.partOfSpeech === 'adverb') && (
                    <>
                      {word.comparative && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">比較級:</span>
                          <p>{word.comparative}</p>
                        </div>
                      )}
                      {word.superlative && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">最上級:</span>
                          <p>{word.superlative}</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* 代名詞の変化形 */}
                  {word.partOfSpeech === 'pronoun' && (
                    <>
                      {word.possessive && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">所有格:</span>
                          <p>{word.possessive}</p>
                        </div>
                      )}
                      {word.objective && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">目的格:</span>
                          <p>{word.objective}</p>
                        </div>
                      )}
                      {word.reflexive && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">再帰代名詞:</span>
                          <p>{word.reflexive}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {word.examples.length > 0 && (
            <Card className="border-t-4 border-t-accent">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">例文</h2>
                <div className="space-y-4">
                  {word.examples.map((example) => (
                    <div key={example.id} className="p-3 bg-muted/50 rounded-md">
                      <p className="italic">&quot;{example.text}&quot;</p>
                      {example.translation && (
                        <p className="text-sm text-muted-foreground mt-1">
                          翻訳: {example.translation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:w-1/3">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">ボキャブラリー情報</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">追加日</h3>
                  <p>{new Date(word.createdAt).toLocaleDateString()}</p>
                </div>

                <Separator />

                {word.lastReviewed && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">最終復習日</h3>
                    <p>{new Date(word.lastReviewed).toLocaleDateString()}</p>
                  </div>
                )}

                <Button variant="gradient">
                  復習済みとしてマーク
                </Button>
              </div>

              {/* <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">関連単語</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:text-primary" onClick={() => router.push("/vocabulary/1")}>
                    ubiquitous
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:text-primary" onClick={() => router.push("/vocabulary/5")}>
                    ephemeral
                  </Button>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
