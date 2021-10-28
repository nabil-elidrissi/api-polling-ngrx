import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<{ results: any[] }>("https://swapi.dev/api/films/")
      .pipe(map(response => response.results));
  }
}
