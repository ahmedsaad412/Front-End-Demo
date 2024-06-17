import { AddUserDto } from './addUser.model';

export interface EditUserDto extends AddUserDto {
  id: number;
}
