import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(
    username: string,
  ): Promise<
    { userId: number; username: string; password: string } | undefined
  > {
    return this.users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneById(id: number) {
    if (!id) return null;
    return this.userRepo.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findOneByOptions(options: any) {
    return this.userRepo.findOne({ where: { ...options } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
