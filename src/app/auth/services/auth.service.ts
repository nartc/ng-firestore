import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { fromPromise } from 'rxjs/internal-compatibility';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { of } from 'rxjs/internal/observable/of';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { UiService } from '../../shared/services/ui.service';
import { AuthData } from '../models/auth-data';
import { User } from '../models/user.model';
import UserCredential = firebase.auth.UserCredential;
import FirebaseUser = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UiService) {
  }

  get isAuthenticatedListener$() {
    return this.afAuth.authState.pipe(
      catchError(_ => of(null)),
      tap((value: FirebaseUser) => {
        if (value) {
          this._user = { ...value } as any;
          this.emitUserData();
          this.goToTraining();
        } else {
          this._user = null;
          this.emitUserData();
          this.router.navigate([ '/auth/signin' ]);
        }
      })
    );
  }

  registerUser(data: AuthData) {
    this.uiService.toggleLoader();
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password))
      .pipe(
        tap(_ => {
          this.uiService.toggleLoader(false);
          this.uiService.openSnackbar('Register successfully');
          this.router.navigate([ '/auth/signin' ]);
        }),
        catchError(err => {
          this.uiService.toggleLoader(false);
          this.uiService.openSnackbar(err.message);
          return EMPTY;
        }));
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login(data: AuthData): Observable<UserCredential> {
    this.uiService.toggleLoader();
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password))
      .pipe(
        tap(value => {
          this.uiService.toggleLoader(false);
          this._user = { ...value.user } as any;
          this.emitUserData();
          this.goToTraining();
        }),
        catchError(err => {
          this.uiService.toggleLoader(false);
          this.uiService.openSnackbar(err.message);
          return EMPTY;
        }));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(_ => {
        this._user = null;
        this.emitUserData();
        this.router.navigate([ '/auth/signin' ]);
      });
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
