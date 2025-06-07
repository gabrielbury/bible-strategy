import { Module } from '@nestjs/common';
import { BibleService } from './bible.service';
import { AraService } from './services/ara/ara-service';
import { NviService } from './services/nvi/nvi-service';
import { HttpModule } from '@nestjs/axios';
import { KjfService } from './services/kjf/kjf-service';

@Module({
  imports: [HttpModule],
  providers: [BibleService, AraService, NviService, KjfService],
  exports: [AraService, NviService, KjfService]
})
export class BibleModule { }
