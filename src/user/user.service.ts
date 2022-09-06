import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const project = this.userRepository.create(createUserDto);
    return this.userRepository.save(project);
  }
  async login(user: UserDto) {
    const res = await this.userRepository.findOne({
      where: {
        username: user.username,
        password: user.password,
      },
    });
    if (res.id) {
      res.token = res.username;
    }
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
