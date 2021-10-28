import { createAction, props } from '@ngrx/store';

export const moviesLoaded = createAction('[Movies Page] Movies Loaded');

export const moviesLoadedSuccess = createAction(
  '[Movies/API] Movies Loaded Success',
  props<{ movies: any[], nextPoll: number }>()
);

export const moviesLoadedFailure = createAction(
  '[Movies/API] Movies Loaded Failure',
  props<{ nextPoll: number }>()
);

export const moviesNextPoll = createAction(
  '[Movies/API] Next Poll'
);