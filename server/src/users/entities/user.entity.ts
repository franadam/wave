import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../roles/users.roles';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, default: '' })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  password: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  roles: UserRole;

  @Column('text', { array: true, default: [] })
  chart: string[];

  @Column('text', { array: true, default: [] })
  history: string[];

  @Column('boolean', { default: false })
  varified: boolean;

  @Column({ default: '' })
  token: string;
}
