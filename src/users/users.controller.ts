import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService:UsersService){}

  @Get() // get /users
  findAll(@Query('role') role?: 'USER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createdUserDto: CreateUserDto) {
    return this.usersService.create(createdUserDto);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number,@Body(ValidationPipe) updatedUserDto:UpdateUserDto) {
    return this.usersService.update(id,updatedUserDto)  ;
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
