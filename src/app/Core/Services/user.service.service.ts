import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersDto } from '../Models/users.model';
import { ENDPOINT } from '../Models/end-points';
import { AddUserDto } from '../Models/addUser.model';
import { EditUserDto } from '../Models/EditUser.model';
import { DepartmentDto } from '../Models/department.model';
import { JobDto } from '../Models/job.model';

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
      userDto
    );
  }

  updateUser(id: number, userDto: AddUserDto): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.UPDATE_User}${id}`,
      userDto
    );
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.User.DELETE_User}${id}`
    );
  }
  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Department.GET_ALL_Department}`
    );
  }
  getJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(
      `${ENDPOINT.MAIN_HOST}${ENDPOINT.Job.GET_ALL_Job}`
    );
  }
}
