import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../store';
import { Exercise } from '../models/exercise.model';
import {
  TRAINING_AVAILABLE_EXERCISES_LOADED,
  TRAINING_PAST_EXERCISES_LOADED,
  TRAINING_START_EXERCISE,
  TRAINING_STOP_EXERCISE,
  TrainingActions
} from './actions';

export interface TrainingState {
  availableExercises: Exercise[];
  pastExercises: Exercise[];
  runningExercise: Exercise;
}

export interface State extends fromRoot.AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  pastExercises: [],
  runningExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case TRAINING_AVAILABLE_EXERCISES_LOADED:
      return { ...state, availableExercises: action.payload };
    case TRAINING_PAST_EXERCISES_LOADED:
      return { ...state, pastExercises: action.payload };
    case TRAINING_START_EXERCISE:
      return { ...state, runningExercise: action.payload };
    case TRAINING_STOP_EXERCISE:
      return { ...state, runningExercise: null };
    default:
      return state;
  }
}

export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
export const getPastExercises = (state: TrainingState) => state.pastExercises;
export const getRunningExercise = (state: TrainingState) => state.runningExercise;

export const getTrainingState = createFeatureSelector<State, TrainingState>('training');
export const getAvailableExercisesSelector = createSelector(getTrainingState, getAvailableExercises);
export const getPastExercisesSelector = createSelector(getTrainingState, getPastExercises);
export const getRunningExerciseSelector = createSelector(getTrainingState, getRunningExercise);
