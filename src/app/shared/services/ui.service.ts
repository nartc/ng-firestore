import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor(private snackBar: MatSnackBar) {
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
