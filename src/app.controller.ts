import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { BibleVersion } from './bible/models/enums/bible-version.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':version/:book/:chapter/:verse')
  async getVerse(
    @Param('version') version: BibleVersion,
    @Param('book') book: string,
    @Param('chapter', ParseIntPipe) chapter: number,
    @Param('verse', ParseIntPipe) verse: number): Promise<string> {

    return await this.appService.getBibleVerse(version, book, chapter, verse);
  }
}
