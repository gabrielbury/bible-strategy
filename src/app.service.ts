import { Injectable } from '@nestjs/common';
import { AraService } from './bible/services/ara/ara-service';
import { BibleVersion } from './bible/models/enums/bible-version.enum';
import { NviService } from './bible/services/nvi/nvi-service';
import { KjfService } from './bible/services/kjf/kjf-service';

@Injectable()
export class AppService {
  constructor(
    private readonly araService: AraService,
    private readonly nviService: NviService,
    private readonly kjfService: KjfService) {

  }

  async getBibleVerse(version: BibleVersion, book: string, chapter: number, verse: number): Promise<string> {

    if (version == BibleVersion.ARA) {
      return await this.araService.getBibleVerse(book, chapter, verse);
    } else if (version == BibleVersion.NVI) {
      return await this.nviService.getBibleVerse(book, chapter, verse);
    } else if (version == BibleVersion.KJF) {
      return await this.kjfService.getBibleVerse(book, chapter, verse);
    } else {
      return "Versão não encontrada";
    }
  }
}
