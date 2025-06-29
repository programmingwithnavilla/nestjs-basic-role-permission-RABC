import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return ['user 1', 'user2'];
  }
}
