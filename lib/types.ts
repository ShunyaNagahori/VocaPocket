export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'determiner'
  | 'phrase';

export interface WordFormVariations {
  plural?: string;
  comparative?: string;
  superlative?: string;
  pastTense?: string;
  pastParticiple?: string;
  presentParticiple?: string;
}

export interface ExampleSentence {
  id: string;
  text: string;
  translation?: string;
}

// TODO：いずれ削除する
export interface WordEntry {
  id: string;
  word: string;
  partOfSpeech?: PartOfSpeech;
  definition: string;
  variations?: WordFormVariations;
  examples: ExampleSentence[];
  notes?: string;
  tags?: string[];
  dateAdded: Date;
  lastReviewed?: Date;
}

export interface Word {
  id: string;
  word: string;
  partOfSpeech?: PartOfSpeech;
  definition: string;
  variations?: WordFormVariations;
  examples: ExampleSentence[];
  notes?: string;
  tags?: string[];
  dateAdded: Date;
  lastReviewed?: Date;
}

