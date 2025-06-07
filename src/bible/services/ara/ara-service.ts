import * as path from 'path';
import * as fs from 'fs';
import { book } from "src/bible/models/book.model";

export class AraService {

  private readonly bible: book[];

  constructor() {
    const filePath = path.resolve(__dirname, '../../../data/ara.json');
    const rawData = fs.readFileSync(filePath, 'utf8');
    this.bible = JSON.parse(rawData);
  }

  async getBibleVerse(book: string, chapter: number, verse: number): Promise<string> {
    return this.getBook(book).chapters[chapter - 1][verse - 1] || `Versículo não encontrad na versão ARA`;
  }

  private getBook(book: string) {
    return this.bible.filter((b) => book === b.abbrev.toLowerCase())[0];
  }

}
