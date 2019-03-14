import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '../../shared/common/destroyable';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: [ './training.component.scss' ],
})
export class TrainingComponent extends DestroyableComponent implements OnInit {
  selectedExercise: Exercise;

  constructor(private trainingService: TrainingService) {
    super();
  }

  ngOnInit() {
    this.trainingService.runningExercise$
      .pipe(takeUntil(this.destroy$))
      .subscribe(exercise => {
        this.selectedExercise = exercise;
      });
  }
}
