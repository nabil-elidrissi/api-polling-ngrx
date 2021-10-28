import { Component } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { MoviesStateService } from "./movies-state.service";

import * as MoviesActions from "./movies.actions";
import { MoviesComponentStore } from "./movies.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
  // providers: [MoviesComponentStore]
})
export class AppComponent {
  // movies$ = this.actions$.pipe(
  //   ofType(MoviesActions.moviesLoadedSuccess),
  //   map(action => action.movies)
  // );
  movies$ = this.moviesStateService.movies$;

  constructor(
    private actions$: Actions,
    private moviesStore: MoviesComponentStore,
    private moviesStateService: MoviesStateService
  ) {}

  ngOnInit() {
    // this.moviesStore.init();
    // this.moviesStateService.init();
  }
}
