import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: [ './new-training.component.scss' ],
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  selectedId: string;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exercises$ = this.trainingService.availableExercises$;
  }

  onExerciseSelected(change: MatSelectChange) {
    this.selectedId = change.value;
  }

  onStartTraining() {
    this.trainingService.startTraining(this.selectedId);
  }
}
