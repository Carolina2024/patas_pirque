import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: string | undefined;
  @Column()
  name?: string;
  @Column()
  email?: string;
  @Column()
  password?: string;
}
