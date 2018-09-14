import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ItemModule,
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            logging: ['error'],
            entities: ['dist/**/**.entity.js'],
            synchronize: true,
          }
        : {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'pinkbean',
            password: undefined,
            database: 'apple',
            logging: ['error'],
            entities: ['src/**/**.entity.ts'],
            synchronize: true,
          },
    ),
  ],
})
export class AppModule {}
