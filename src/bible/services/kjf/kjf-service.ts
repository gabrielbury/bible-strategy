import { HttpService } from "@nestjs/axios";
import { KJFResponse } from "src/bible/models/kjf-response.model";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KjfService {
  private readonly kjfApiUrl;
  constructor(private readonly httpService: HttpService) {
    this.kjfApiUrl = process.env.BIBLE_API_URL || "";
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
