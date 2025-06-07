import { HttpService } from "@nestjs/axios";
import { Strategy } from "../strategy.interface";
import { BibleVersion } from "src/bible/models/enums/bible-version.enum";
import { KJFResponse } from "src/bible/models/kjf-response.model";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom, Observable } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KjfStrategy implements Strategy {
  private readonly kjfApiUrl;
  constructor(private readonly httpService: HttpService) {
    this.kjfApiUrl = process.env.BIBLE_API_URL || "";
  }
  getStrategyName(): BibleVersion {
    return BibleVersion.KJF
  }

  async getBibleVerse(book: string, chapter: number, verse: number): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService.get<KJFResponse>(`${this.kjfApiUrl}/${book}/${chapter}/${verse}`).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ));
    return data.data.verse
  }


}
