import { BibleVersion } from "src/bible/models/enums/bible-version.enum";
import { Strategy } from "../strategy.interface";
import * as path from 'path';
import * as fs from 'fs';
import { book } from "src/bible/models/book.model";

export class AraStrategy implements Strategy {

  private readonly bible: book[];

  constructor() {
    const filePath = path.resolve(__dirname, '../../../data/ara.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    this.bible = JSON.parse(rawData);
  }

  getStrategyName(): BibleVersion {
    return BibleVersion.ARA;
  }
  async getBibleVerse(book: string, chapter: number, verse: number): Promise<string> {
    return this.getBook(book).chapters[chapter - 1][verse - 1] || `Versículo não encontrad na versão ${this.getStrategyName()}`;
  }

  private getBook(book: string) {
    return this.bible.filter((b) => book === b.abbrev.toLowerCase())[0];
  }

}
