import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs/internal/Observable';
import { map, mergeMap, take } from 'rxjs/operators';
import * as fromShared from '../../shared/store';
import { Exercise } from '../models/exercise.model';
import * as fromTraining from '../store';

const AVAILABLE_EXERCISES_KEY = 'availableExercises';
const EXERCISES_KEY = 'exercises';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly availableExercisesDb: AngularFirestoreCollection<Exercise>;
  private readonly exercisesDb: AngularFirestoreCollection<Exercise>;

  constructor(private firestore: AngularFirestore,
              private store: Store<fromTraining.State>) {
    this.availableExercisesDb = firestore.collection(AVAILABLE_EXERCISES_KEY);
    this.exercisesDb = firestore.collection(EXERCISES_KEY);
  }

  fetchAvailableExercises(): void {
    this.store.dispatch(new fromShared.StartLoading());
    this.availableExercisesDb.snapshotChanges()
      .pipe(
        map(data => data.map(({ payload: { doc } }) => {
          const exercise = doc.data();
          const id = doc.id;
          return { id, ...exercise };
        })))
      .subscribe(exercises => {
        this.store.dispatch(new fromTraining.AvailableExercisesLoaded(exercises));
        this.store.dispatch(new fromShared.StopLoading());
      });
  }

  get runningExercise$(): Observable<Exercise> {
    return this.store.select<Exercise>(fromTraining.getRunningExerciseSelector);
  }

  fetchExercises(): void {
    this.store.dispatch(new fromShared.StartLoading());
    this.exercisesDb.snapshotChanges()
      .pipe(
        map(data => data.map(({ payload: { doc } }) => {
          const exercise = doc.data();
          exercise.date = (exercise.date as any).toDate();
          const id = doc.id;
          return { id, ...exercise };
        })))
      .subscribe(exercises => {
        this.store.dispatch(new fromTraining.PastExercisesLoaded(exercises));
        this.store.dispatch(new fromShared.StopLoading());
      });
  }

  startTraining(id: string) {
    this.availableExercisesDb.ref.doc(id).get().then(doc => {
      const exercise = doc.data();
      this.store.dispatch(new fromTraining.StartExercise({ id, ...exercise } as Exercise));
    });
  }

  completeTraining() {
    this.runningExercise$
      .pipe(
        take(1),
        map(runningExercise => {
          const { id, ...exercise } = runningExercise;
          return exercise;
        }),
        mergeMap(exercise => fromPromise(this.exercisesDb.add({
          ...exercise,
          date: new Date(Date.now()),
          state: 'completed'
        } as Exercise)))
      ).subscribe(_ => {
      this.store.dispatch(new fromTraining.StopExercise());
    });
  }

  cancelTraining(progress: number) {
    this.runningExercise$
      .pipe(
        take(1),
        map(runningExercise => {
          console.log(runningExercise);
          const { id, ...exercise } = runningExercise;
          return exercise;
        }),
        mergeMap(exercise => fromPromise(this.exercisesDb.add({
          ...exercise,
          date: new Date(Date.now()),
          state: 'cancelled',
          duration: exercise.duration * (progress / 100),
          calories: exercise.calories * (progress / 100)
        } as Exercise)))
      )
      .subscribe(_ => {
        this.store.dispatch(new fromTraining.StopExercise());
      });
  }
}
