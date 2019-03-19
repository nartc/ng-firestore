import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import * as fromRoot from '../../store';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';
import * as fromTraining from '../store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.scss' ],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  selectedId: string;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercises$ = this.store.select(fromTraining.getAvailableExercisesSelector);
    this.isLoading$ = this.store.select(fromRoot.isLoadingSelector);
  }

  onExerciseSelected(change: MatSelectChange) {
    this.selectedId = change.value;
  }

  onStartTraining() {
    this.trainingService.startTraining(this.selectedId);
  }
}
