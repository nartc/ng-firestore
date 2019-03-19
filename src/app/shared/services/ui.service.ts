import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private snackBar: MatSnackBar) {
  }

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  toggleLoader(isLoading = true) {
    this.loadingSubject.next(isLoading);
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
