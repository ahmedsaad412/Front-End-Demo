import { UserServiceService } from './../../../Core/Services/user.service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddUserDto } from '../../../Core/Models/addUser.model';
import { Gender } from '../../../Core/Enums/gender.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  formData: FormGroup = new FormGroup({
    fNameAr: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    secNameAr: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    thirdNameAr: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    lNameAr: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    fNameEn: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    secNameEn: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    thirdNameEn: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    lNameEn: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    countryCode: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    mobileNumber: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    nationalId: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    birthDate: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    maritalStatus: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    gender: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    addressAr: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    addressEn: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    jobId: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
    departmentId: new FormControl(null, [
      Validators.minLength(3),
      Validators.required,
    ]),
  });

  id: number = 0;
  Genders: string[] = [];
  GenderList: any = Gender;
  selectedGender: Number | undefined;

  constructor(
    private userService: UserServiceService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      if (params['id']) {
        this.id = params['id'];
        this.userService.getUser(this.id).subscribe((data) => {
          this.formData.patchValue(data);
        });
      }
    });

    

    this.Genders = Object.keys(Gender).filter((key) => isNaN(Number(key)));
  }
  onSubmit(formData: FormGroup) {
    var userDto: AddUserDto = {
      id: this.id,
      fNameAr: formData.value.name,
      secNameAr: formData.value.name,
      thirdNameAr: formData.value.name,
      lNameAr: formData.value.name,
      fNameEn: formData.value.name,
      secNameEn: formData.value.name,
      thirdNameEn: formData.value.name,
      lNameEn: formData.value.name,
      email: formData.value.name,
      countryCode: formData.value.number,
      nationalId: formData.value.number,
      mobileNumber: formData.value.number,
      birthDate: formData.value.number,
      gender: parseInt(formData.value.gender),
      maritalStatus: formData.value.number,
      addressAr: formData.value.number,
      addressEn: formData.value.number,
      jobId: formData.value.number,
      departmentId: formData.value.number,
    };
    console.log(userDto);

    if (this.id > 0) {
      this.userService.updateUser(this.id, userDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Updates Sacssfully', 'Success');
            this.router.navigate(['/users']);
          } else {
            this.toastr.error('An Error Has Occured', 'Error');
          }
        },
        (error) => {
          this.toastr.error('An Error Has Occured', 'Error');
        }
      );
    } else {
      this.userService.createUser(userDto).subscribe(
        (response) => {
          console.log(response);
          if (response.ok) {
            this.toastr.success('Added Sacssfully', 'Success');
            this.router.navigate(['/users']);
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
}
