import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemList } from './item-list.entity';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemList)
    private readonly itemListRepository: Repository<ItemList>,
  ) {}

  async getItemList(type: 'NORMAL' | 'DECORATION') {
    return this.itemListRepository.find({
      where: type
        ? {
            type,
          }
        : {},
      relations: ['items'],
      order: {
        createTime: 'DESC',
      },
    });
  }

  async scrapItemList(type: 'NORMAL' | 'DECORATION') {
    const urls = {
      NORMAL:
        'http://maplestory.nexon.com/MapleStory/Page/Gnx.aspx?URL=Guide/ItemInfo_Normal',
      DECORATION:
        'http://maplestory.nexon.com/MapleStory/Page/Gnx.aspx?URL=Guide/ItemInfo_Decoration',
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urls[type]);
    const res = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll(
          '#content > div > div:nth-child(4) > table tr',
        ),
      );
      return rows
        .splice(1)
        .map(x =>
          Array.from(x.querySelectorAll('td')).map(y =>
            y.innerText.replace('\n\t', ''),
          ),
        );
    });
    await browser.close();

    const items: { name: string; percentage: string }[] = res.map(x => ({
      name: x[0],
      percentage: x[1].replace('%', ''),
    }));
    const existing = await this.itemListRepository
      .find({
        where: {
          type,
        },
        relations: ['items'],
        order: {
          createTime: 'DESC',
        },
        take: 1,
      })
      .then(x => x[0]);

    if (!existing) {
      return this.itemListRepository.save({
        type,
        items,
      });
    }

    const existingMap = existing.items.reduce((obj, x) => {
      return {
        ...obj,
        [x.name]: x.percentage,
      };
    }, {});

    const hasDiff =
      !!items.find(
        x => !existingMap[x.name] || existingMap[x.name] !== x.percentage,
      ) || items.length !== existing.items.length;

    if (hasDiff) {
      return this.itemListRepository.save({
        type,
        items,
      });
    }
  }
}
