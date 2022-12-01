import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, HttpException, HttpStatus, Res, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/http-exception-filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const existingUser = await this.usersService.findWithFn(createUserDto.firstName)
    if (existingUser) {
      throw new ConflictException("User Already Exists")
    }
    const postUser = await this.usersService.create(createUserDto);
    if (!postUser) {
      // throw new HttpException("Some Error,Please try again",HttpStatus.INTERNAL_SERVER_ERROR)
      res.status(500).json({ message: "Some Error,Please try again" })
    }
    res.status(201).json({ message: "User Created Successfully" })
    // return {message:'User created successfully',status:HttpStatus.CREATED}
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: Partial<UpdateUserDto>) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async createUser(){}
}
