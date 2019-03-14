import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Exercise } from '../models/exercise.model';

const AVAILABLE_EXERCISES_KEY = 'availableExercises';
const EXERCISES_KEY = 'exercises';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly availableExercisesDb: AngularFirestoreCollection<Exercise>;
  private readonly exercisesDb: AngularFirestoreCollection<Exercise>;

  private _runningExercise: Exercise;
  private _runningExerciseSubject: BehaviorSubject<Exercise> = new BehaviorSubject(null);

  constructor(private firestore: AngularFirestore) {
    this.availableExercisesDb = firestore.collection(AVAILABLE_EXERCISES_KEY);
    this.exercisesDb = firestore.collection(EXERCISES_KEY);
  }

  get availableExercises$(): Observable<Exercise[]> {
    return this.availableExercisesDb.snapshotChanges()
      .pipe(map(data => data.map(({ payload: { doc } }) => {
        const exercise = doc.data();
        const id = doc.id;
        return { id, ...exercise };
      })));
  }

  get runningExercise$(): Observable<Exercise> {
    return this._runningExerciseSubject.asObservable();
  }

  get exercises$(): Observable<Exercise[]> {
    return this.exercisesDb.snapshotChanges()
      .pipe(map(data => data.map(({ payload: { doc } }) => {
        const exercise = doc.data();
        exercise.date = (exercise.date as any).toDate();
        const id = doc.id;
        return { id, ...exercise };
      })));
  }

  startTraining(id: string) {
    this.availableExercisesDb.ref.doc(id).get().then(doc => {
      const exercise = doc.data();
      this._runningExercise = { id, ...exercise } as Exercise;
      this._runningExerciseSubject.next({ ...this._runningExercise });
    });
  }

  completeTraining() {
    const { id, ...exercise } = this._runningExercise;

    this.exercisesDb.add({ ...exercise, date: new Date(Date.now()), state: 'completed' } as Exercise)
      .then(_ => {
        this._runningExercise = null;
        this._runningExerciseSubject.next(this._runningExercise);
      });
  }

  cancelTraining(progress: number) {
    const { id, ...exercise } = this._runningExercise;
    this.exercisesDb.add({
      ...exercise,
      date: new Date(Date.now()),
      state: 'cancelled',
      duration: exercise.duration * (progress / 100),
      calories: exercise.calories * (progress / 100)
    } as Exercise)
      .then(_ => {
        this._runningExercise = null;
        this._runningExerciseSubject.next(this._runningExercise);
      });
  }
}
