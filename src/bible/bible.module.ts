import { Module } from '@nestjs/common';
import { BibleService } from './bible.service';
import { AraStrategy } from './strategy/ara-strategy/ara-strategy';
import { NviStrategy } from './strategy/nvi-strategy/nvi-strategy';
import { HttpModule } from '@nestjs/axios';
import { KjfStrategy } from './strategy/kjf-strategy/kjf-strategy';
import { Strategy } from './strategy/strategy.interface';

@Module({
  imports: [HttpModule],
  providers: [BibleService, AraStrategy, NviStrategy, KjfStrategy,
    {
      provide: 'BIBLE_VERSION_STRATEGY_MAP',
      useFactory: (
        ara: AraStrategy,
        nvi: NviStrategy,
        kjf: KjfStrategy
      ): Record<string, Strategy> => {
        const strategies = [ara, nvi, kjf];
        const map: Record<string, Strategy> = {};
        strategies.forEach((strategy) => {
          map[strategy.getStrategyName()] = strategy;
        });
        return map;
      },
      inject: [AraStrategy, NviStrategy, KjfStrategy]
    }
  ],
  exports: [AraStrategy, NviStrategy, KjfStrategy, 'BIBLE_VERSION_STRATEGY_MAP']
})
export class BibleModule { }
