import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PartOfSpeech } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 品詞ごとの色定義
export const PART_OF_SPEECH_STYLES = {
  none: {
    classes: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300",
    label: "未選択"
  },
  noun: {
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    label: "名詞"
  },
  verb: {
    classes: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    label: "動詞"
  },
  adjective: {
    classes: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    label: "形容詞"
  },
  adverb: {
    classes: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    label: "副詞"
  },
  pronoun: {
    classes: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    label: "代名詞"
  },
  preposition: {
    classes: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    label: "前置詞"
  },
  conjunction: {
    classes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    label: "接続詞"
  },
  interjection: {
    classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    label: "間投詞"
  },
  determiner: {
    classes: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    label: "限定詞"
  },
  phrase: {
    classes: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    label: "フレーズ"
  }
} as const;
