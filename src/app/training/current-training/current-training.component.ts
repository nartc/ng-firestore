import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, interval, Observable, PartialObserver, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress = 0;
  isOngoing = true;

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;

  destroy$: Subject<null> = new Subject();
  pauseTimer$: Subject<null> = new Subject();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.timer$ = interval(1000).pipe(
      takeUntil(this.pauseTimer$),
      takeUntil(this.destroy$),
    );

    this.timerObserver = {
      next: (_: number) => {
        console.log('Subscribed interval -->', _);
        if (this.progress < 100) {
          this.progress += 5;
        } else {
          this.pauseTimer$.next();
        }
      },
    };

    this.timer$.subscribe(this.timerObserver);
  }

  restartClick() {
    this.isOngoing = true;
    this.timer$.subscribe(this.timerObserver);
  }

  pauseClick() {
    this.pauseTimer$.next();
    this.isOngoing = false;
  }

  stopClick() {
    this.pauseTimer$.next();
    const ref = this.dialog.open(StopTrainingDialogComponent, {
      data: this.progress,
    });

    ref
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((stopped: boolean) => {
          if (stopped) {
            this.progress = 0;
            this.isOngoing = false;
            return EMPTY;
          }

          this.isOngoing = true;
          return this.timer$;
        }),
      )
      .subscribe(this.timerObserver);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
