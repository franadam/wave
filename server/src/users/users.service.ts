import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
