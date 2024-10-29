import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Diana graham',
      role: 'USER',
      email: '',
    },
    {
      id: 2,
      name: 'Christopha graham',
      role: 'USER',
      email: 'christopha@gmail.com',
    },
    {
      id: 3,
      name: 'Valeria graham',
      role: 'ADMIN',
      email: 'valeria@gmail.com',
    },
    {
      id: 4,
      name: 'Ely graham',
      role: 'USER',
      email: 'ely@gmail.com',
    },
    {
      id: 5,
      name: 'Lilianne graham',
      role: 'USER',
      email: 'lilianne@gmail.com',
    },
  ];
  findAll(role?: 'USER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) throw new NotFoundException('User role');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User role not Found');

    return user;
  }
  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return this.users;
  }
  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }

      return user;
    });

    return this.findOne(id);
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
}
