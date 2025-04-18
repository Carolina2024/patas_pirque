import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  name!: string;
  @Column()
  lastName?: string;
  @Column()
  birthDate?: string;
  @Column()
  dni!: string;
  @Column()
  gender!: string;
  @Column({unique: true})
  email!: string;
  @Column()
  password!: string;
  @Column({default: 'user'})
  role!: string;
}
