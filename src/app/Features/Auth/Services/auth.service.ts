import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginrequest } from '../models/login-request';
import { Loginresponse } from '../models/login-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $User : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor( private http: HttpClient,private cookieService: CookieService,
              private router : Router) { }

  login(request: loginrequest) : Observable<Loginresponse> {
       return this.http.post<Loginresponse>(`${environment.apibaseurl}/api/auth/login`, {email: request.email, password: request.password});
  }

  setUser(user : User) : void {
    this.$User.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-role', user.role.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$User.asObservable();
  }

  getUser() : User | undefined {
    const email = localStorage.getItem('user-email');
    const role = localStorage.getItem('user-role');
    if(email && role) {
      const user : User = {email : email, role: role.split(',')};
      return user;
    }
    return undefined;
  }

  logout() : void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$User.next(undefined);
  }
}
