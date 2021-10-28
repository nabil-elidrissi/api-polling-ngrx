import { Injectable } from "@angular/core";
import { interval, merge, Subject } from "rxjs";
import { exhaustMap, switchMap, tap } from "rxjs/operators";
import { MoviesService } from "./movies.service";

@Injectable({
  providedIn: "root"
})
export class MoviesStateService {
  getMoviesAction$ = new Subject();
  nextPollAction$ = new Subject<number>();
  moviesLoadedSuccessAction$ = new Subject<any[]>();
  movies$ = this.moviesLoadedSuccessAction$;

  getMovies$ = merge(this.getMoviesAction$, this.nextPollAction$).pipe(
    exhaustMap(() =>
      this.moviesService.getAll().pipe(
        tap(movies => {
          this.moviesLoadedSuccessAction$.next(movies);
        })
      )
    )
  );

  pollMovies$ = this.moviesLoadedSuccessAction$.pipe(
    switchMap(() => {
      return interval(3000).pipe(
        tap(() => {
          console.log("polling");
          this.nextPollAction$.next();
        })
      );
    })    
  )

  constructor(private moviesService: MoviesService) {}

  init() {
    merge(this.getMovies$, this.pollMovies$).subscribe();

    this.getMoviesAction$.next();
  }
}
