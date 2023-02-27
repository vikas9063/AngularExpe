import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService:UserService){}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //return next.handle(httpRequest);
        // here we are adding logic to add token if it is available in local storage for all the requestss
        let authReq= httpRequest;
        const token = this.userService.getToken();
        //console.log(token);
        if(token != null){
           // console.log("in if")
            authReq=authReq.clone({setHeaders:{
                Authorization: `Bearer ${token}`
            }})
        }
        //console.log("authReq",authReq)
        return next.handle(authReq);
        
    }
}
export const AuthInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    }
]