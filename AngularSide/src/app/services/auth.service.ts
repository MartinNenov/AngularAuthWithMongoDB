import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  databasePath = 'http://localhost:3000';

  constructor(private http:HttpClient) {

   }

   
  loginUser(email:string,password:string):Observable<Object>{
    let user = {
      email:email,
      password:password
    }
    return this.http.post(this.databasePath+"/login",user);
  }
  registerUser(username:string,email:string,password:string):Observable<Object>{
    let user = {
      username:username,
      email:email,
      password:password
    }
    return this.http.post(this.databasePath+"/register",user);
    
  }
}
