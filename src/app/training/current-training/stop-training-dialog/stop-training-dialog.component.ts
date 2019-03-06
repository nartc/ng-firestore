import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>You are already at: {{ progress }}%</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Stop</button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public progress: number) {}

  ngOnInit() {}
}
