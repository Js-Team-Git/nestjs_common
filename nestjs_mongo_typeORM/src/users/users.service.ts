import { Get, HttpException, Injectable, NotFoundException, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // async findByName(firstName:string) {
  //    return await this.userRepository.findOneBy({firstName});
  // }
  async findById(id:ObjectID) {
     return await this.userRepository.findOneBy({id});
  }

  async findWithFn(fn: string) {
    return await this.userRepository.createQueryBuilder('users').where({ firstName: fn }).getOne()
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   // return `This action updates a #${id} user`;
  //   this.userRepository.update(id,updateUserDto);
  // }
  async update(id: ObjectID, user: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.createQueryBuilder('user').where({ id: id }).getOne()
    if (!existingUser) {
      throw new NotFoundException("User Doesn't Exist")
    }
    // const finalData = Object.assign(existingUser,user)
    console.log(existingUser, user)
    const finalData = { ...existingUser, ...user }
    console.log(finalData)
    await this.userRepository.update(id, finalData)
    return this.userRepository.findOneByOrFail({ id });
  }

  async remove(id: ObjectID) {
    return await this.userRepository.delete({id});
  //   const existingUserId = await this.userRepository.createQueryBuilder('user').where({id:id}).getOne()
  //   if(!existingUserId){
  //     throw new NotFoundException(`User Does Not Exist with the Id:${id}`)
  //   }
  //     await this.userRepository.delete({id})
  //     return `User with the Id:${id} Deleted Succefully`
   }
}
