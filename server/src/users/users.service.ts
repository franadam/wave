import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(options: Partial<CreateUserDto>): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { ...options } });
  }

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOneById(id: number) {
    if (!id) return null;
    return this.userRepo.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: [{ email }, { username: email }] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
