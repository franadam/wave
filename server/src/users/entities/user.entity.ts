import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  admin,
  user,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.user })
  role: string;

  @Column('int', { array: true, default: [] })
  chart: string[];

  @Column('int', { array: true, default: [] })
  history: string[];

  @Column({ default: false })
  varified: boolean;
}
