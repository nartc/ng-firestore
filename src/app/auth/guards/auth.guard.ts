import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$
      .pipe(tap(auth => {
        if (!auth) {
          console.log('Auth failed --> Navigating to auth/signin');
          this.router.navigate([ '/auth/signin' ]);
        }
      }));
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$
      .pipe(tap(auth => {
        if (!auth) {
          console.log('Auth failed --> Navigating to auth/signin');
          this.router.navigate([ '/auth/signin' ]);
        }
      }));
  }
}
