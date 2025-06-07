import { Inject, Injectable } from '@nestjs/common';
import { AraStrategy } from './bible/strategy/ara-strategy/ara-strategy';
import { BibleVersion } from './bible/models/enums/bible-version.enum';
import { NviStrategy } from './bible/strategy/nvi-strategy/nvi-strategy';
import { KjfStrategy } from './bible/strategy/kjf-strategy/kjf-strategy';
import { Strategy } from './bible/strategy/strategy.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly araStrategy: AraStrategy,
    private readonly nviStrategy: NviStrategy,
    private readonly kjfStrategy: KjfStrategy,
    @Inject('BIBLE_VERSION_STRATEGY_MAP')
    private readonly strategyMap: Record<string, Strategy>) {

  }

  async getBibleVerse(version: BibleVersion, book: string, chapter: number, verse: number): Promise<string> {
    try {
      return this.strategyMap[version].getBibleVerse(book, chapter, verse);
    } catch (e) {
      return (e as Error).message
    }

    /*
    if (version == BibleVersion.ARA) {
      return await this.araStrategy.getBibleVerse(book, chapter, verse);
    } else if (version == BibleVersion.NVI) {
      return await this.nviStrategy.getBibleVerse(book, chapter, verse);
    } else if (version == BibleVersion.KJF) {
      return await this.kjfStrategy.getBibleVerse(book, chapter, verse);
    } else {
      return "Versão não encontrada";
    }*/
  }
}
