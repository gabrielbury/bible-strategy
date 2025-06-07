import { BibleVersion } from "../models/enums/bible-version.enum"

export interface Strategy {
  getStrategyName(): BibleVersion
  getBibleVerse(book: string, chapter: number, verse: number): Promise<string>
}
