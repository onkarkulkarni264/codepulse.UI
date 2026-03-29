import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const authService = inject(AuthService);
  let token = cookieService.get('Authorization');
  const user = authService.getUser();

  if (token && user) {
    try {
      token = token.replace('Bearer ', '');
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.exp) {
        return true;
      }
      const expirationDate = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      if (expirationDate < currentTime) {
        authService.logout();
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      } else {
        if (user.role.includes('Writer')) {
          return true;
        } else { alert('Unauthorized'); return false; }
      }
    } catch {
      alert('Unauthorized');
      return false;
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
