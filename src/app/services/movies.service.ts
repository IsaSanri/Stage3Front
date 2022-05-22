import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { MovieListResponse } from "@app-models/movie.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  public getMovieList(query: string): Observable<MovieListResponse> {
    const url = `${environment.URL}/?s=${query}&apikey=${environment.OMDB_APIKEY}`;
    return this.http.get<any>(url).pipe(
      map((dataAPI) => {
        console.log("dataAPI", dataAPI);

        dataAPI.Response = dataAPI.Response === "True";

        dataAPI["data"] = {
          results: dataAPI.Search,
          totalResults: parseInt(dataAPI.totalResults),
        };
        dataAPI["error"] = !dataAPI["Response"];

        delete dataAPI["Search"];
        delete dataAPI["totalResults"];

        dataAPI.data.results?.map((element: any) => {
          element["poster"] = element["Poster"];
          element["title"] = element["Title"];
          element["type"] = element["Type"];
          element["year"] = element["Year"];
          element["id"] = element["imdbID"];
          delete element["Poster"];
          delete element["Title"];
          delete element["Type"];
          delete element["Year"];
          delete element["imdbID"];
          return Object.assign(element, { selected: false });
        });
        return dataAPI;
      })
    );
  }
}
