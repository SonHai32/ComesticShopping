import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }
  apiURI = 'http://localhost:5000/api/users/login'
  constructor(private http: HttpClient) { }


  login(user: {username: string, password: string}):Observable<User[]>{
    console.log(user)
    return this.http.post<User[]>(this.apiURI, {username: user.username, password: user.password}).pipe()
  }
}
