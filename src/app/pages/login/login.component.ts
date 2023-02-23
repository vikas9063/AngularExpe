import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { loginData } from 'src/app/types/LoginData';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService:UserService,private router:Router){}

    loginData:loginData={
      username:'',
      password:''
    }

    onSubmit(){
      // alert("helloi")
      console.log(this.loginData)
      this.userService.loginUser(this.loginData).subscribe((data:any)=>{
        if(data.message != ''  && data.message == 'Success'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successfully completed ! Redirecting to dashboard...',
            showConfirmButton: false,
            timer: 1500
          })
     
          this.userService.setUserData(JSON.stringify(data));       
          console.log(this.userService.getToken());
          this.userService.loginStatusSubject.next(true);
             
          this.router.navigate(["dashboard"])
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
        console.log(error);
        
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
