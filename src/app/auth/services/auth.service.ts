import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { auth } from 'firebase/app';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { of } from 'rxjs/internal/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { UiService } from '../../shared/services/ui.service';
import * as fromShared from '../../shared/store';
import * as fromRoot from '../../store';
import { AuthData } from '../models/auth-data';
import * as fromAuth from '../store';
import UserCredential = firebase.auth.UserCredential;
import FirebaseUser = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private uiService: UiService,
              private store: Store<fromRoot.AppState>) {
  }

  get isAuthenticatedListener$() {
    return this.afAuth.authState.pipe(
      catchError(_ => of(null)),
      tap((value: FirebaseUser) => {
        if (value) {
          this.store.dispatch(new fromAuth.Authenticated());
          this.goToTraining();
        } else {
          this.store.dispatch(new fromAuth.Unauthenticated());
          this.router.navigate([ '/auth/signin' ]);
        }
      })
    );
  }

  registerUser(data: AuthData) {
    this.store.dispatch(new fromShared.StartLoading());
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password))
      .pipe(
        tap(_ => {
          this.store.dispatch(new fromShared.StopLoading());
          this.uiService.openSnackbar('Register successfully');
          this.router.navigate([ '/auth/signin' ]);
        }),
        catchError(err => {
          this.store.dispatch(new fromShared.StopLoading());
          this.uiService.openSnackbar(err.message);
          return EMPTY;
        }));
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login(data: AuthData): Observable<UserCredential> {
    this.store.dispatch(new fromShared.StartLoading());
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password))
      .pipe(
        tap(value => {
          this.store.dispatch(new fromShared.StopLoading());
          this.store.dispatch(new fromAuth.Authenticated());
          this.goToTraining();
        }),
        catchError(err => {
          this.store.dispatch(new fromShared.StopLoading());
          this.store.dispatch(new fromAuth.Unauthenticated());
          this.uiService.openSnackbar(err.message);
          return EMPTY;
        }));
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(_ => {
        this.store.dispatch(new fromAuth.Unauthenticated());
        this.router.navigate([ '/auth/signin' ]);
      });
  }

  private goToTraining() {
    this.router.navigate([ '/training' ]);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.store.select<boolean>(fromRoot.isAuthenticatedSelector);
  }
}
