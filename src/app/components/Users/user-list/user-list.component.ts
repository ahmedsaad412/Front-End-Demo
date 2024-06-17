import { Component, OnInit } from '@angular/core';
import { UsersDto } from '../../../Core/Models/users.model';
import { UserServiceService } from '../../../Core/Services/user.service.service';
import { ToastrService } from 'ngx-toastr';
import DataTable from 'datatables.net-dt';
let table = new DataTable('#Users');
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: UsersDto[] = [];

  constructor(
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log(response);
        if (response.ok) {
          this.toastr.success('Removed Sacssfully', 'Success');
          this.users = this.users.filter((c) => c.id !== id);
        } else {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      },
      (error) => {
        this.toastr.error('An Error Has Occured', 'Error');
      }
    );
  }
}
