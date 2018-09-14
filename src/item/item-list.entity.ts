import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class ItemList {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createTime: Date;

  @Column()
  type: 'NORMAL' | 'DECORATION';

  @OneToMany(type => Item, item => item.itemList, { cascade: true })
  items: Item[];
}
