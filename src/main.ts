// tslint:disable:no-console
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemService } from 'item/item.service';
import { timer } from 'rxjs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const itemService = app.get(ItemService);
  timer(0, 1000 * 60 * 60).subscribe(async () => {
    try {
      await itemService.scrapItemList('NORMAL');
      await itemService.scrapItemList('DECORATION');
      console.log('Success');
    } catch (err) {
      console.error('Error occured in scraping');
      console.trace(err);
    }
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
