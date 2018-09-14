import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ItemList } from './item-list.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ItemList, itemList => itemList.items)
  itemList: ItemList;

  @Column('text')
  name: string;

  @Column('decimal')
  percentage: string;
}
