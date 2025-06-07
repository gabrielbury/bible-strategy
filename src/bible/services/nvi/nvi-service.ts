import { BibleVersion } from "src/bible/models/enums/bible-version.enum";
import { PrismaClient } from "@prisma/client"

export class NviService {

  private readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async getBibleVerse(book: string, chapter: number, verse: number): Promise<string> {
    const bookData = await this.client.books.findFirst({
      select: {
        id: true
      },
      where: {
        abbrev: {
          equals: book.toLowerCase()
        }
      }
    });
    const bibleVerse = await this.client.verses.findFirst({
      select: {
        text: true
      },
      where: {
        AND: {
          book: {
            equals: bookData.id - 1
          },
          chapter: {
            equals: chapter
          },
          verse: {
            equals: verse
          },
          version: {
            equals: BibleVersion.NVI.toLowerCase()
          }
        }
      }
    });

    return bibleVerse.text || "Versículo não encontrado";
  }
}
