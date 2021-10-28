import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { of } from "rxjs";
import { delay, exhaustMap, map, switchMap, tap } from "rxjs/operators";

import * as MoviesActions from "./movies.actions";
import { MoviesService } from "./movies.service";

@Injectable()
export class MoviesApiEffects implements OnInitEffects {
  pollInterval = 15000;

  getMovies$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MoviesActions.moviesLoaded, MoviesActions.moviesNextPoll),
        exhaustMap(() => {
          return this.moviesService.getAll().pipe(
            map(movies => {
              return MoviesActions.moviesLoadedSuccess({
                movies,
                nextPoll: this.pollInterval
              });
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  pollMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MoviesActions.moviesLoadedSuccess),
      switchMap(action => {
        return of(null).pipe(
          delay(action.nextPoll),
          map(() => MoviesActions.moviesNextPoll())
        );
      })
    );
  });

  logActions$ = createEffect(
    () => {
      return this.actions$.pipe(tap(console.log));
    },
    { dispatch: false }
  );

  ngrxOnInitEffects() {
    return { type: "noop" };
    // return MoviesActions.moviesLoaded();
  }

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
