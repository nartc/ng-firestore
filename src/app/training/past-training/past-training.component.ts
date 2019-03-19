import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '../../shared/common/destroyable';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../services/training.service';

import * as fromTraining from '../store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: [ './past-training.component.scss' ],
})
export class PastTrainingComponent extends DestroyableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'date', 'name', 'duration', 'calories', 'state' ];
  dataSource: MatTableDataSource<Exercise>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement>;

  constructor(private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
    super();
  }

  ngOnInit() {
    this.trainingService.fetchExercises();
    this.store.select(fromTraining.getPastExercisesSelector)
      .pipe(takeUntil(this.destroy$)).subscribe(exercises => {
      this.dataSource = new MatTableDataSource<Exercise>(exercises);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target['value']),
        takeUntil(this.destroy$)
      ).subscribe((searchString: string) => {
      this.dataSource.filter = searchString.trim().toLowerCase();
    });
  }
}
