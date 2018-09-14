import { Controller, Get, Query } from '@nestjs/common';
import { ItemQueryDto } from './dto/item-query.dto';
import { ItemService } from './item.service';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getNormal(@Query() query: ItemQueryDto) {
    const lists = await this.itemService.getItemList(query.type);
    return {
      lists,
    };
  }
}
