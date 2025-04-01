-- 名詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "plural",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-noun-1',
  'book',
  'noun',
  '本、書籍',
  '基本的な学習道具',
  'books',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 動詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "presentTense",
  "thirdPersonSingular",
  "pastTense",
  "pastParticiple",
  "presentParticiple",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-verb-1',
  'walk',
  'verb',
  '歩く、歩行する',
  '基本的な移動動作',
  'walk',
  'walks',
  'walked',
  'walked',
  'walking',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 形容詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "comparative",
  "superlative",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-adj-1',
  'big',
  'adjective',
  '大きい、大きな',
  'サイズを表す基本的な形容詞',
  'bigger',
  'biggest',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 副詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "comparative",
  "superlative",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-adv-1',
  'quickly',
  'adverb',
  '速く、素早く',
  '速度を表す基本的な副詞',
  'more quickly',
  'most quickly',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 代名詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "possessive",
  "objective",
  "reflexive",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-pron-1',
  'I',
  'pronoun',
  '私（主格）',
  '一人称単数主格代名詞',
  'my',
  'me',
  'myself',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 前置詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-prep-1',
  'in',
  'preposition',
  '～の中に、～で',
  '場所や時間を表す基本的な前置詞',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 接続詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-conj-1',
  'and',
  'conjunction',
  'そして、～と',
  '並列を表す基本的な接続詞',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 間投詞のテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-interj-1',
  'oh',
  'interjection',
  'ああ、おや',
  '驚きや感情を表す基本的な間投詞',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- フレーズのテストデータ
INSERT INTO "Word" (
  "id",
  "content",
  "partOfSpeech",
  "definition",
  "notes",
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'test-phrase-1',
  'good morning',
  'phrase',
  'おはようございます',
  '朝の挨拶として使用される基本的なフレーズ',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'test-phrase-2',
  'thank you',
  'phrase',
  'ありがとうございます',
  '感謝を表す基本的なフレーズ',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'test-phrase-3',
  'how are you',
  'phrase',
  'お元気ですか',
  '相手の体調や近況を尋ねる基本的なフレーズ',
  '716547ae-68d7-4591-9bd9-a9017b731745',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
