import DataTables from 'datatables.net';
import { Component, OnInit } from '@angular/core';
import { UsersDto } from '../../../Core/Models/users.model';
import { UserServiceService } from '../../../Core/Services/user.service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: UsersDto[] = [];
  dtOptions: any = {};

  constructor(
    private userService: UserServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // ... other options
    };
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
