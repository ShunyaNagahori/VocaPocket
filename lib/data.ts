import { WordEntry, PartOfSpeech, ExampleSentence, Word } from './types';

// Sample Word data
// export const sampleWord: WordEntry[] = [
//   {
//     id: '1',
//     word: 'ubiquitous',
//     partOfSpeech: 'adjective',
//     definition: 'どこにでも存在する、遍在する。',
//     variations: {
//       comparative: 'more ubiquitous',
//       superlative: 'most ubiquitous',
//     },
//     examples: [
//       {
//         id: '1-1',
//         text: 'Mobile phones have become ubiquitous in modern society.',
//         translation: '携帯電話は現代社会ではどこにでもあるものになった。'
//       },
//       {
//         id: '1-2',
//         text: 'The ubiquitous nature of plastic pollution is a global concern.',
//         translation: 'プラスチック汚染の遍在性は世界的な懸念事項である。'
//       },
//     ],
//     notes: 'ラテン語の"ubique"（どこでも）に由来',
//     tags: ['formal', 'academic'],
//     dateAdded: new Date('2025-01-15'),
//     lastReviewed: new Date('2025-03-10'),
//   },
//   {
//     id: '2',
//     word: 'ameliorate',
//     partOfSpeech: 'verb',
//     definition: '改善する、向上させる（特に悪い状況や不満足な状態を）。',
//     variations: {
//       pastTense: 'ameliorated',
//       pastParticiple: 'ameliorated',
//       presentParticiple: 'ameliorating',
//     },
//     examples: [
//       {
//         id: '2-1',
//         text: 'The government introduced new policies to ameliorate the housing crisis.',
//         translation: '政府は住宅危機を改善するための新しい政策を導入した。'
//       },
//       {
//         id: '2-2',
//         text: 'Various treatments can ameliorate the symptoms of the disease.',
//         translation: 'さまざまな治療法がその病気の症状を緩和することができる。'
//       },
//     ],
//     tags: ['formal', 'academic'],
//     dateAdded: new Date('2025-02-03'),
//     lastReviewed: new Date('2025-03-15'),
//   },
//   {
//     id: '3',
//     word: 'serendipity',
//     partOfSpeech: 'noun',
//     definition: '偶然の幸運な発見、思いがけない幸運。',
//     variations: {
//       plural: 'serendipities',
//     },
//     examples: [
//       {
//         id: '3-1',
//         text: 'Their meeting was pure serendipity - they both happened to be in the same cafe at the same time.',
//         translation: '彼らの出会いは純粋な偶然だった - 二人とも同じ時間に同じカフェにいたのだ。'
//       },
//       {
//         id: '3-2',
//         text: 'Many scientific discoveries have involved an element of serendipity.',
//         translation: '多くの科学的発見には偶然の要素が含まれている。'
//       },
//     ],
//     notes: 'ペルシャの童話「セレンディップの三人の王子」に由来',
//     tags: ['positive', 'literary'],
//     dateAdded: new Date('2025-01-28'),
//     lastReviewed: new Date('2025-03-05'),
//   },
//   {
//     id: '4',
//     word: 'in the nick of time',
//     partOfSpeech: 'phrase',
//     definition: 'ぎりぎりのところで、間一髪で。',
//     examples: [
//       {
//         id: '4-1',
//         text: 'The firefighters arrived in the nick of time to save the family from the burning building.',
//         translation: '消防士たちは燃えている建物から家族を救うためにぎりぎりのところで到着した。'
//       },
//       {
//         id: '4-2',
//         text: 'I finished my assignment in the nick of time, just minutes before the deadline.',
//         translation: '締め切りの数分前、ぎりぎりのところで課題を終えた。'
//       },
//     ],
//     tags: ['idiom', 'time'],
//     dateAdded: new Date('2025-02-15'),
//     lastReviewed: new Date('2025-03-20'),
//   },
//   {
//     id: '5',
//     word: 'ephemeral',
//     partOfSpeech: 'adjective',
//     definition: '儚い、一時的な、短命の。',
//     variations: {
//       comparative: 'more ephemeral',
//       superlative: 'most ephemeral',
//     },
//     examples: [
//       {
//         id: '5-1',
//         text: 'The beauty of cherry blossoms is ephemeral, lasting only a few days each year.',
//         translation: '桜の美しさは儚く、毎年数日しか続かない。'
//       },
//       {
//         id: '5-2',
//         text: 'Social media trends are often ephemeral, quickly replaced by new ones.',
//         translation: 'ソーシャルメディアのトレンドはしばしば一時的で、すぐに新しいものに取って代わられる。'
//       },
//     ],
//     notes: 'ギリシャ語の"ephemeros"（一日だけ続く）に由来',
//     tags: ['literary', 'academic'],
//     dateAdded: new Date('2025-02-20'),
//     lastReviewed: new Date('2025-03-25'),
//   },
// ];

export function getAllWord(): Word[] {
  return [];
}

export function getWordById(id: string): WordEntry | undefined {
  return undefined;
}

export const PART_OF_SPEECH_OPTIONS = [
  { value: null, label: '未選択' },
  { value: 'noun', label: '名詞' },
  { value: 'verb', label: '動詞' },
  { value: 'adjective', label: '形容詞' },
  { value: 'adverb', label: '副詞' },
  { value: 'pronoun', label: '代名詞' },
  { value: 'preposition', label: '前置詞' },
  { value: 'conjunction', label: '接続詞' },
  { value: 'interjection', label: '間投詞' },
  { value: 'determiner', label: '限定詞' },
  { value: 'phrase', label: 'フレーズ' },
];

// Function to get part of speech label in Japanese
export function getPartOfSpeechLabel(pos: PartOfSpeech): string {
  const posOption = PART_OF_SPEECH_OPTIONS.find(option => option.value === pos);
  return posOption ? posOption.label : pos;
}
