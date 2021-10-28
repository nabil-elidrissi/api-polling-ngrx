import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { merge, of, interval } from "rxjs";
import { exhaustMap, filter, switchMap, tap } from "rxjs/operators";

import { MoviesService } from "./movies.service";

export interface State {
  movies: any[];
  polling: boolean;
}

@Injectable({ providedIn: "root" })
export class MoviesComponentStore extends ComponentStore<State> {
  constructor(private moviesService: MoviesService) {
    super({
      movies: [],
      polling: false
    });
  }

  movies$ = this.select(state => state.movies);
  polling$ = this.select(state => state.polling);

  getMovies = this.effect(trigger$ => {
    return trigger$.pipe(
      exhaustMap(() => {
        return this.moviesService.getAll().pipe(
          tapResponse(
            movies => {
              console.log("movies fetched");
              this.setState({ movies, polling: true });
            },
            () => {}
          )
        );
      })
    );
  });

  pollMovies$ = this.polling$.pipe(
    filter(polling => polling),
    switchMap(() => {
      return interval(15000).pipe(
        tap(() => {
          console.log("polling");
          this.getMovies();
        })
      );
    })
  );

  init = this.effect(() => {
    // this.getMovies();
    return merge(this.pollMovies$);
  });
}
