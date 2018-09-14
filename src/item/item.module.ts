import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemList } from './item-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, ItemList])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
