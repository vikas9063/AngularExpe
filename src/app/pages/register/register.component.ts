import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegUser } from 'src/app/types/RegUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private userService:UserService, private router:Router){
    
  }

  regForm:RegUser={
    fname:'',
    lname:'',
    email:'',
    about:'',
    password:''
  };

  onSubmit():void{
    
    console.log(this.regForm);
    this.userService.createUser(this.regForm).subscribe(
      (data:any)=>{
        console.log("success",data)
        if(data.status !='' && data.status !='failed'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registered successfully completed ! Redirecting to login page...',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(["login"]);
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      (error)=>{
        console.log("ERROR",error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.statusText,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
