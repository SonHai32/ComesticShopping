import { AuthActions } from './../store/auth/actions/auth.action';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
  };
  // apiURI = 'http://localhost:5000/api/users/';
  // apiURI = "https://hame-comestic-api.herokuapp.com/api/users/"
  apiURI = 'http://localhost:8080/api/users/login';
  private refreshTokenTimeout!: any;
  constructor(private http: HttpClient, private store: Store) {}

  login(user: { username: string; password: string }): Observable<User[]> {
    return this.http.post<any>(
      this.apiURI,
      {
        username: user.username,
        password: user.password,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  register(user: {
    username: string;
    password: string;
    emailAddress: string;
    phoneNumber: string;
  }): Observable<User[]> {
    return this.http
      .post<User[]>(`${this.apiURI}add-user`, {
        username: user.username,
        password: user.password,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
      })
      .pipe();
  }

  refreshToken(): Observable<string> {
    return this.http.get(`${environment.apiURL}/users/refreshToken`).pipe(
      map((data: any) => {
        if (data) {
          const expiresIn: Date = new Date(data.token.expiresIn) ;
          const timeout = expiresIn.getTime() - (Date.now());
          this.refreshTokenTimeout = setTimeout(
            () => this.store.dispatch(AuthActions.CheckAuthAction()),
            timeout
          );
        }
        return data.token.accessToken as string;
      })
    );
  }

}
