"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllWord, getPartOfSpeechLabel } from "@/lib/data";
import { ArrowRight, Check, X, RefreshCw, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PART_OF_SPEECH_STYLES } from "@/lib/utils";

export default function PracticePage() {
  const { toast } = useToast();
  const allWord = getAllWord();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [practiceMode, setPracticeMode] = useState<"definition" | "word">("definition");

  const currentWord = allWord[currentIndex];

  const handleAnswer = (knows: boolean) => {
    setIsCorrect(knows);
    setShowAnswer(true);
  };

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allWord.length);
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setIsCorrect(null);
  };

  const togglePracticeMode = () => {
    setPracticeMode(prevMode => prevMode === "definition" ? "word" : "definition");
    setShowAnswer(false);
    setIsCorrect(null);
  };

  return (
    <div className="p-4 sm:py-8 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">学習</h1>
            <p className="text-muted-foreground">
              単語の知識をテストする
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={togglePracticeMode} className="hover:bg-primary/10 hover:text-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              {practiceMode === "definition" ? "単語" : "意味"}モードに切り替え
            </Button>
          </div>
        </div>

        <Card className="mb-6 border-t-4 border-t-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {practiceMode === "definition"
                  ? "意味は何ですか？"
                  : "単語は何ですか？"}
              </CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {currentIndex + 1} / {allWord.length}
              </Badge>
            </div>
            <CardDescription>
              {practiceMode === "definition"
                ? "下の単語を知っていますか？"
                : "この意味の単語を知っていますか？"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-md text-center">
              <h2 className="text-2xl font-bold mb-2">
                {practiceMode === "definition"
                  ? currentWord.word
                  : currentWord.definition}
              </h2>
              <Badge variant="outline" className={`mt-2 ${currentWord.partOfSpeech ? PART_OF_SPEECH_STYLES[currentWord.partOfSpeech].classes : ''} border-0`}>
                {currentWord.partOfSpeech ? getPartOfSpeechLabel(currentWord.partOfSpeech) : ''}
              </Badge>
            </div>

            <div className="space-y-2">
              {!showAnswer ? (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleAnswer(true)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    わかる
                  </Button>
                  <Button
                    onClick={() => handleAnswer(false)}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    <X className="mr-2 h-4 w-4" />
                    わからない
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleNextWord}
                  className="w-full mt-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  次の単語
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {showAnswer && (
              <div className={`p-4 rounded-md ${
                isCorrect ? "bg-accent/10 dark:bg-accent/20" : "bg-secondary/10 dark:bg-secondary/20"
              }`}>
                <div className="flex items-start">
                  <div className={`p-1 rounded-full ${
                    isCorrect ? "bg-accent" : "bg-secondary"
                  } mr-3 mt-1`}>
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <X className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {isCorrect ? "素晴らしい！" : "次回頑張りましょう"}
                    </h3>
                    <p className="text-sm">
                      {practiceMode === "definition"
                        ? `意味: ${currentWord.definition}`
                        : `単語: ${currentWord.word}`}
                    </p>
                    {currentWord.examples.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">例文:</p>
                        <p className="text-sm italic">&quot;{currentWord.examples[0].text}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={handleRestart} className="hover:text-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              最初からやり直す
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(`/vocabulary/${currentWord.id}`, '_blank')} className="hover:bg-primary/10 hover:text-primary">
              <BookOpen className="mr-2 h-4 w-4" />
              詳細を見る
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
