import { Component } from '@angular/core';
import { loginrequest } from '../models/login-request';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: loginrequest;
  errorMessage: string = '';

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.errorMessage = '';
    this.authService.login(this.model).subscribe({
      next: (response) => {
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined,
          '/', undefined, true, 'Strict');
        this.authService.setUser({ email: response.email, role: response.roles });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        if (err.error?.errors) {
          const messages: string[] = [];
          for (const key in err.error.errors) {
            messages.push(...err.error.errors[key]);
          }
          this.errorMessage = messages.join(' ');
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    });
  }
}
