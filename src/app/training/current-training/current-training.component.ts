import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { interval } from 'rxjs/internal/observable/interval';
import { Subject } from 'rxjs/internal/Subject';
import { PartialObserver } from 'rxjs/internal/types';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '../../shared/common/destroyable';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';
import { StopTrainingDialogComponent } from './stop-training-dialog/stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: [ './current-training.component.scss' ],
})
export class CurrentTrainingComponent extends DestroyableComponent implements OnInit {
  @Input() exercise: Exercise;
  @Output() stopTraining: EventEmitter<null> = new EventEmitter();

  progress = 0;
  isOngoing = true;

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;
  pauseTimer$: Subject<null> = new Subject();

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService) {
    super();
  }

  ngOnInit() {
    const step = this.exercise.duration / 100 * 1000;
    this.timer$ = interval(step).pipe(
      takeUntil(this.pauseTimer$),
      takeUntil(this.destroy$),
    );

    this.timerObserver = {
      next: (_: number) => {
        console.log('Subscribed interval -->', _);
        if (this.progress < 100) {
          this.progress += 1;
        } else {
          this.trainingService.completeTraining();
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
            this.trainingService.cancelTraining(this.progress);
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
}
