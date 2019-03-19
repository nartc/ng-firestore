import { Action } from '@ngrx/store';
import { Exercise } from '../models/exercise.model';

export const TRAINING_AVAILABLE_EXERCISES_LOADED = '[Training] Available Exercises Loaded';
export const TRAINING_PAST_EXERCISES_LOADED = '[Training] Past Exercises Loaded';
export const TRAINING_START_EXERCISE = '[Training] Start Exercise';
export const TRAINING_STOP_EXERCISE = '[Training] Stop Exercise';

export class AvailableExercisesLoaded implements Action {
  readonly type: string = TRAINING_AVAILABLE_EXERCISES_LOADED;

  constructor(public payload: Exercise[]) {
  }
}

export class PastExercisesLoaded implements Action {
  readonly type: string = TRAINING_PAST_EXERCISES_LOADED;

  constructor(public payload: Exercise[]) {
  }
}

export class StartExercise implements Action {
  readonly type: string = TRAINING_START_EXERCISE;

  constructor(public payload: Exercise) {
  }
}

export class StopExercise implements Action {
  readonly type: string = TRAINING_STOP_EXERCISE;

  constructor(public payload?: any) {
  }
}

export type TrainingActions = AvailableExercisesLoaded | PastExercisesLoaded | StartExercise | StopExercise;
