import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map } from 'rxjs/operators';
import { AuthData } from '../models/auth-data';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private router: Router) {
  }

  registerUser(data: AuthData) {
    this._user = {
      email: data.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.emitUserData();
    this.goToTraining();
  }

  login(data: AuthData) {
    this._user = {
      email: data.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.emitUserData();
    this.goToTraining();
  }

  logout() {
    this._user = null;
    this.emitUserData();
    this.router.navigate([ '/auth/signin' ]);
  }

  private goToTraining() {
    this.router.navigate([ '/training' ]);
  }

  private emitUserData() {
    this.userSubject.next(this._user);
  }

  get user$(): Observable<User> {
    return this.userSubject.asObservable().pipe(filter(data => !!data));
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.userSubject.asObservable().pipe(map(data => data !== null));
  }
}
