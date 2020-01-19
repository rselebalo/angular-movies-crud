import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Movie } from "../movie";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/movie";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(apiUrl).pipe(
      tap(movie => console.log("fetched movies")),
      catchError(this.handleError("getMovies", []))
    );
  }

  getMovie(id: any): Observable<Movie> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => console.log(`fetched Movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(apiUrl, movie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`added Movie w/ id=${movie.id}`)),
      catchError(this.handleError<Movie>("addMovie"))
    );
  }

  updateMovie(id: any, movie: Movie): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, movie, httpOptions).pipe(
      tap(_ => console.log(`updated Movie id=${id}`)),
      catchError(this.handleError<any>("updateMovie"))
    );
  }

  deleteMovie(id: any): Observable<Movie> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Movie id=${id}`)),
      catchError(this.handleError<Movie>("deleteMovie"))
    );
  }
}
