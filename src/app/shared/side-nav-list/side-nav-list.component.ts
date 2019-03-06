import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav-list',
  template: `
    <mat-nav-list>
      <a mat-list-item [routerLink]="['/auth/signup']" routerLinkActive="active" (click)="closeNavbarEmitter.emit()">
        <mat-icon>face</mat-icon>
        <span class="nav-caption">Sign Up</span>
      </a>
      <a mat-list-item [routerLink]="['/auth/signin']" routerLinkActive="active" (click)="closeNavbarEmitter.emit()">
        <mat-icon>input</mat-icon>
        <span class="nav-caption">Sign In</span>
      </a>
      <a mat-list-item [routerLink]="['/training']" routerLinkActive="active" (click)="closeNavbarEmitter.emit()">
        <mat-icon>fitness_center</mat-icon>
        <span class="nav-caption">Training</span>
      </a>
      <mat-divider></mat-divider>
      <mat-list-item>
        <button mat-icon-button (click)="closeNavbarEmitter.emit()">
          <mat-icon>eject</mat-icon>
          <span class="nav-caption">Sign out</span>
        </button>
      </mat-list-item>
    </mat-nav-list>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        color: white;
      }

      a:hover,
      a:active {
        color: lightgrey;
      }

      .nav-caption {
        display: inline-block;
        padding-left: 5px;
      }
    `,
  ],
})
export class SideNavListComponent implements OnInit {
  @Output() closeNavbarEmitter: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
