import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleModule } from './bible/bible.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, BibleModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
