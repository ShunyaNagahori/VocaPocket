"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PART_OF_SPEECH_OPTIONS } from "@/lib/data";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "@/lib/uuid";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateVocabulary } from "./actions";
import { Vocabulary } from "@prisma/client";

// ジャンルの選択肢
const GENRE_OPTIONS = [
  { value: "word", label: "単語" },
  { value: "phrase", label: "フレーズ" },
  { value: "grammar", label: "文法" },
];

const schema = z.object({
  content: z.string().min(1, "単語、フレーズまたは文法項目を入力してください"),
  genre: z.enum(["word", "phrase", "grammar"]),
  partOfSpeech: z.string().optional(),
  meaning: z.string().min(1, "意味を入力してください"),
  notes: z.string().optional(),
  plural: z.string().optional(), // 複数形
  comparative: z.string().optional(), // 比較級
  superlative: z.string().optional(), // 最上級
  pastTense: z.string().optional(), // 過去形
  pastParticiple: z.string().optional(), // 過去分詞
  presentParticiple: z.string().optional(), // 現在分詞
  presentTense: z.string().optional(), // 現在形
  thirdPersonSingular: z.string().optional(), // 三人称単数現在
  possessive: z.string().optional(), // 所有格
  objective: z.string().optional(), // 目的格
  reflexive: z.string().optional(), // 再帰代名詞
  examples: z.array(z.object({
    text: z.string().optional(),
    translation: z.string().optional(),
  }).refine(data => {
    // textが入力されている場合のみtranslationを必須にする
    if (data.text && data.text.trim().length > 0) {
      return data.translation && data.translation.trim().length > 0;
    }
    return true;
  }, {
    message: "例文を入力した場合は、訳も入力してください",
    path: ["translation"]
  })).optional(),
});

interface EditFormProps {
  vocabulary: Vocabulary & {
    examples: {
      id: string;
      text: string;
      translation: string | null;
    }[];
    tags: {
      id: string;
      name: string;
    }[];
  };
}

export default function EditForm({ vocabulary }: EditFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [examples, setExamples] = useState<{ id: string; text: string; translation: string; }[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<{ id: string | null; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // フォームの初期化
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: vocabulary.content,
      genre: vocabulary.genre as "word" | "phrase" | "grammar",
      partOfSpeech: vocabulary.partOfSpeech || "",
      meaning: vocabulary.meaning,
      notes: vocabulary.notes || "",
      plural: vocabulary.plural || "",
      comparative: vocabulary.comparative || "",
      superlative: vocabulary.superlative || "",
      pastTense: vocabulary.pastTense || "",
      pastParticiple: vocabulary.pastParticiple || "",
      presentParticiple: vocabulary.presentParticiple || "",
      presentTense: vocabulary.presentTense || "",
      thirdPersonSingular: vocabulary.thirdPersonSingular || "",
      possessive: vocabulary.possessive || "",
      objective: vocabulary.objective || "",
      reflexive: vocabulary.reflexive || "",
    },
  });

  // 例文とタグの初期化
  useEffect(() => {
    if (vocabulary.examples && vocabulary.examples.length > 0) {
      setExamples(vocabulary.examples.map(example => ({
        id: example.id,
        text: example.text,
        translation: example.translation || "",
      })));
    } else {
      setExamples([{ id: uuidv4(), text: "", translation: "" }]);
    }

    if (vocabulary.tags && vocabulary.tags.length > 0) {
      setTags(vocabulary.tags);
    }
  }, [vocabulary]);

  const handleAddExample = () => {
    setExamples([...examples, { id: uuidv4(), text: "", translation: "" }]);
  };

  const handleRemoveExample = (id: string) => {
    if (examples.length > 1) {
      setExamples(examples.filter(example => example.id !== id));
    }
  };

  const handleExampleChange = (id: string, field: "text" | "translation", value: string) => {
    setExamples(
      examples.map(example =>
        example.id === id ? { ...example, [field]: value } : example
      )
    );
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.some(tag => tag.name === tagInput.trim())) {
        setTags([...tags, { id: null, name: tagInput.trim() }]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag.name !== tagToRemove));
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsSubmitting(true);

      const formattedExamples = examples
        .filter(ex => ex.text.trim() !== "")
        .map(ex => ({
          id: ex.id,
          text: ex.text,
          translation: ex.translation
        }));

      await updateVocabulary({
        id: vocabulary.id,
        ...data,
        partOfSpeech: data.partOfSpeech === "none" || data.partOfSpeech === "" ? null : data.partOfSpeech,
        examples: formattedExamples,
        tags: tags
      });

      toast({
        title: "データ保存完了",
        description: `"${data.content}"が更新されました。`,
      });

      // 詳細ページに戻る
      router.push(`/vocabulary/${vocabulary.id}`);
      router.refresh();
    } catch (error) {
      toast({
        title: "エラー",
        description: "更新に失敗しました。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 現在選択されているジャンル
  const currentGenre = form.watch("genre");
  // ジャンルに基づいて品詞の選択肢を表示するかどうかを決定
  const showPartOfSpeech = currentGenre === "word";

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push(`/vocabulary/${vocabulary.id}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        詳細に戻る
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">ボキャブラリーを編集</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="mb-6 border-t-4 border-t-primary">
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>種類<span className="text-destructive ml-0.5">*</span></FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger id="genre" className="border-primary/20 focus:border-primary">
                            <SelectValue placeholder="種類を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GENRE_OPTIONS.map((genre) => (
                            <SelectItem key={genre.value} value={genre.value}>
                              {genre.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 items-end">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {currentGenre === "word"
                            ? "単語"
                            : currentGenre === "phrase"
                              ? "フレーズ"
                              : "構文パターン"}
                          <span className="text-destructive ml-0.5">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="content"
                            {...field}
                            placeholder={
                              currentGenre === "word"
                                ? "単語を入力"
                                : currentGenre === "phrase"
                                  ? "フレーズを入力"
                                  : "構文パターンを入力（例：S + have/has + 過去分詞 + ...）"
                            }
                            required
                            className="w-full border-primary/20 focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {showPartOfSpeech && (
                  <FormField
                    control={form.control}
                    name="partOfSpeech"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>品詞</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger id="partOfSpeech" className="border-primary/20 focus:border-primary">
                              <SelectValue placeholder="--- 選択してください ---" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PART_OF_SPEECH_OPTIONS.map((pos) => (
                              <SelectItem key={pos.value} value={pos.value || "none"}>
                                {pos.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="meaning"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        {currentGenre === "word"
                          ? "意味"
                          : currentGenre === "phrase"
                            ? "意味"
                            : "文法項目"}
                        <span className="text-destructive ml-0.5">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="meaning"
                          {...field}
                          placeholder={
                            currentGenre === "word"
                              ? "意味を入力"
                              : currentGenre === "phrase"
                                ? "意味を入力"
                                : "文法項目を入力（例：現在完了形、関係代名詞など）"
                          }
                          required
                          className="w-full border-primary/20 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        メモ
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="notes"
                          {...field}
                          placeholder={
                            currentGenre === "word"
                              ? "追加のメモや語源を入力"
                              : currentGenre === "phrase"
                                ? "フレーズの使用場面や注意点を入力"
                                : "文法の例外や追加情報を入力"
                          }
                          rows={2}
                          className="w-full border-primary/20 focus:border-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="tags">タグ</Label>
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="タグを入力してEnterキーを押す（例：旅行、日常、ビジネス）"
                    className="border-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    タグを使ってボキャブラリーを分類できます。複数のタグを追加するには、各タグを入力後にEnterキーを押してください。
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag.name} className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white">
                        {tag.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag.name)}
                          className="text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {currentGenre === "word" ? (
                  <Tabs defaultValue="forms" className="w-full">
                    <TabsList className="w-full bg-muted/50 grid grid-cols-2">
                      <TabsTrigger value="forms" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                        単語の形
                      </TabsTrigger>
                      <TabsTrigger value="examples" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                        例文
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="forms" className="mt-4">
                      <div className="space-y-4">
                        {(form.watch("partOfSpeech") === "none" || form.watch("partOfSpeech") === "") && (
                          <p className="text-center text-muted-foreground">品詞を選択してください</p>
                        )}
                        {/* 名詞の変化形 */}
                        {form.watch("partOfSpeech") === 'noun' && (
                          <div className="space-y-2">
                            <Label htmlFor="plural">複数形</Label>
                            <Input
                              id="plural"
                              value={form.watch("plural") || ''}
                              onChange={(e) => form.setValue("plural", e.target.value)}
                              placeholder="例: books"
                            />
                          </div>
                        )}

                        {/* 動詞の変化形 */}
                        {form.watch("partOfSpeech") === 'verb' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="presentTense">現在形</Label>
                              <Input
                                id="presentTense"
                                value={form.watch("presentTense") || ''}
                                onChange={(e) => form.setValue("presentTense", e.target.value)}
                                placeholder="例: write"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="thirdPersonSingular">三人称単数現在</Label>
                              <Input
                                id="thirdPersonSingular"
                                value={form.watch("thirdPersonSingular") || ''}
                                onChange={(e) => form.setValue("thirdPersonSingular", e.target.value)}
                                placeholder="例: writes"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pastTense">過去形</Label>
                              <Input
                                id="pastTense"
                                value={form.watch("pastTense") || ''}
                                onChange={(e) => form.setValue("pastTense", e.target.value)}
                                placeholder="例: wrote"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pastParticiple">過去分詞</Label>
                              <Input
                                id="pastParticiple"
                                value={form.watch("pastParticiple") || ''}
                                onChange={(e) => form.setValue("pastParticiple", e.target.value)}
                                placeholder="例: written"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="presentParticiple">現在分詞</Label>
                              <Input
                                id="presentParticiple"
                                value={form.watch("presentParticiple") || ''}
                                onChange={(e) => form.setValue("presentParticiple", e.target.value)}
                                placeholder="例: writing"
                              />
                            </div>
                          </div>
                        )}

                        {/* 形容詞・副詞の変化形 */}
                        {(form.watch("partOfSpeech") === 'adjective' || form.watch("partOfSpeech") === 'adverb') && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="comparative">比較級</Label>
                              <Input
                                id="comparative"
                                value={form.watch("comparative") || ''}
                                onChange={(e) => form.setValue("comparative", e.target.value)}
                                placeholder="例: better"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="superlative">最上級</Label>
                              <Input
                                id="superlative"
                                value={form.watch("superlative") || ''}
                                onChange={(e) => form.setValue("superlative", e.target.value)}
                                placeholder="例: best"
                              />
                            </div>
                          </div>
                        )}

                        {/* 代名詞の変化形 */}
                        {form.watch("partOfSpeech") === 'pronoun' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="possessive">所有格</Label>
                              <Input
                                id="possessive"
                                value={form.watch("possessive") || ''}
                                onChange={(e) => form.setValue("possessive", e.target.value)}
                                placeholder="例: my"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="objective">目的格</Label>
                              <Input
                                id="objective"
                                value={form.watch("objective") || ''}
                                onChange={(e) => form.setValue("objective", e.target.value)}
                                placeholder="例: me"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reflexive">再帰代名詞</Label>
                              <Input
                                id="reflexive"
                                value={form.watch("reflexive") || ''}
                                onChange={(e) => form.setValue("reflexive", e.target.value)}
                                placeholder="例: myself"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="mt-4">
                      <div className="space-y-4">
                        {examples.map((example, index) => (
                          <div key={example.id} className="space-y-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">例文 {index + 1}</h3>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExample(example.id)}
                                disabled={examples.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`example-${example.id}`}>文</Label>
                              <Textarea
                                id={`example-${example.id}`}
                                value={example.text}
                                onChange={(e) => handleExampleChange(example.id, "text", e.target.value)}
                                placeholder="例文を入力"
                                rows={2}
                                className="border-primary/20 focus:border-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`translation-${example.id}`}>訳</Label>
                              <Textarea
                                id={`translation-${example.id}`}
                                value={example.translation}
                                onChange={(e) => handleExampleChange(example.id, "translation", e.target.value)}
                                placeholder="例文の日本語訳を入力"
                                className="border-primary/20 focus:border-primary"
                              />
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full hover:bg-primary/10 hover:text-primary"
                          onClick={handleAddExample}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          例文を追加
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">例文</h3>
                    <div className="space-y-4">
                      {examples.map((example, index) => (
                        <div key={example.id} className="space-y-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-md">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">例文 {index + 1}</h3>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveExample(example.id)}
                              disabled={examples.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`example-${example.id}`}>文</Label>
                            <Textarea
                              id={`example-${example.id}`}
                              value={example.text}
                              onChange={(e) => handleExampleChange(example.id, "text", e.target.value)}
                              placeholder="例文を入力"
                              rows={2}
                              className="border-primary/20 focus:border-primary"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`translation-${example.id}`}>訳</Label>
                            <Textarea
                              id={`translation-${example.id}`}
                              value={example.translation}
                              onChange={(e) => handleExampleChange(example.id, "translation", e.target.value)}
                              placeholder="例文の日本語訳を入力"
                              className="border-primary/20 focus:border-primary"
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full hover:bg-primary/10 hover:text-primary"
                        onClick={handleAddExample}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        例文を追加
                      </Button>
                    </div>
                  </div>
                )}

              </CardContent>

              <CardFooter className="p-6 bg-muted/50">
                <Button type="submit" variant="gradient" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "更新中..." : "変更を保存"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
