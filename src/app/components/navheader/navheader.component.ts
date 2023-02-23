import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/services/BaseUrl';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})
export class NavheaderComponent implements OnInit {

  isLoggedIn = false;
  userData: any = null;
  

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    

    this.isLoggedIn = this.userService.isUserLoggedIn();
    this.userData = this.userService.getUserData();
    this.userService.loginStatusSubject.asObservable().subscribe((data) => {
      console.log(this.userService.isUserLoggedIn() + "<<<>>>>" + this.userService.getUserData());
      this.isLoggedIn = this.userService.isUserLoggedIn();
      this.userData = this.userService.getUserData();
    })

  }

  handleLogout() {
    this.userService.logoutUser();
    this.userService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = false;
      this.userData = null;
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout successfully ! Redirecting to login page',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['login'])
    window.location.href = "/login";
    //window.location.reload();
  }

  loadProfilePic():string{
    
    let userId= this.userService.getUserIdOriginal();
    //console.log(`${BASE_URL}/user/load-profile/${userId}`);
    
    return `${BASE_URL}/user/load-profile/${userId}`
  }

 

}
