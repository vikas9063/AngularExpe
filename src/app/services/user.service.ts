import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { loginData } from '../types/LoginData';
import { RegUser } from '../types/RegUser';
import { BASE_URL } from './BaseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  createUser(regUser: RegUser) {
    return this.http.post(`${BASE_URL}/auth/user`, regUser);
  }

  loginUser(loginData: loginData) {
    return this.http.post(`${BASE_URL}/auth/login`, loginData);
  }


  setUserData(userData: string) {
    localStorage.setItem('userData', userData);
    return true;
  }

  logoutUser() {
    localStorage.clear();
    return this.loginStatusSubject.next(true);
     
  }
  getUserData():any {
    let userData = localStorage.getItem("userData");
    if (userData == undefined || userData == '' || userData == null) {
      return null;
    } else {
      return JSON.parse(userData);
    }
  }
  getUserRole() {
    let user = this.getUserData();
    if (user != null) {
      return user.userRole[0].authority;
    }
    else {
      return this.logoutUser();
    }
  }

  isUserLoggedIn() {
    let user = this.getUserData();
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  getToken(){
    let user = this.getUserData();
    if(user != null){
      return user.token;
    }else{
      return null;
    }
  }
  getUserId(){
    let user = this.getUserData();
    if(user != null){
      return user.userName;
    }else{
      return null;
    }
  }

  getUserIdOriginal(){
    let user = this.getUserData();
    if(user != null){
      return user.userId;
    }else{
      return null;
    }
  }
  getUserInformation(){    
    return this.http.get(`${BASE_URL}/user/${this.getUserId()}`);
  }
 

}
