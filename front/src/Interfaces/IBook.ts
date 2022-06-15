export interface IBook {
  name?: string;
  bookIndex: number;
  chapters: Array<string[]>;
  chapterIndex?: number;
  verses: Array<string>;
  verseIndex?: number;
} 