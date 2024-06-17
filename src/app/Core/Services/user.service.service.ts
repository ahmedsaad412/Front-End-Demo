import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersDto } from '../Models/users.model';
import { ENDPOINT } from '../Models/end-points';
import { AddUserDto } from '../Models/addUser.model';
import { EditUserDto } from '../Models/EditUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersDto[]> {
    return this.http.get<UsersDto[]>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.GET_ALL_User}`
    );
  }
  getUser(id: number): Observable<EditUserDto> {
    return this.http.get<EditUserDto>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.GET_User_BY_ID}${id}`
    );
  }

  createUser(userDto: AddUserDto): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.ADD_User}`,
      userDto,
      { observe: 'response' }
    );
  }

  updateUser(id: number, userDto: AddUserDto): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.UPDATE_User}${id}`,
      userDto,
      { observe: 'response' }
    );
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.DELETE_User}${id}`,
      { observe: 'response' }
    );
  }
}
