import { Component } from "@angular/core";
import { MoviesService } from "@app-services/movies.service";
import { MovieInterface, MovieListResponse } from "@app-models/movie.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  movieList: MovieInterface[];
  favoriteShows: MovieInterface[];
  today: Date;
  message: string = "";

  constructor(private moviesService: MoviesService) {
    this.movieList = [];
    this.favoriteShows = [];
    this.today = new Date();
  }

  searchMovie(movieTitle: string) {
    this.movieList = [];
    this.moviesService
      .getMovieList(movieTitle)
      .subscribe((result: MovieListResponse) => {
        if (result.Response) this.movieList = result.data.results;
        else Swal.fire("Too much results", "", "error");
      });
  }

  // selectedMovie(selectedMovie: MovieInterface) {
  //   const alreadyAdded = this.favoriteShows.findIndex(
  //     (element) => element.title === selectedMovie.title
  //   );
  //   if (alreadyAdded === -1) {
  //     this.favoriteShows.push(selectedMovie);
  //   } else {
  //     alert(`Movie already added:  ${selectedMovie.title}`);
  //   }
  // }

  addFavoriteMovie(favoriteMovie: MovieInterface) {
    const alreadyAdded = this.favoriteShows.findIndex(
      (element) => element.id === favoriteMovie.id
    );
    if (alreadyAdded === -1) {
      favoriteMovie.registerDate = new Date();
      console.log(favoriteMovie);
      this.favoriteShows.push(favoriteMovie);
      Swal.fire("Added to favorites", "", "success");
    } else {
      this.message =
        'The movie: "' + favoriteMovie.title + '" has already been added.';
      Swal.fire(this.message, "", "error");
    }
  }
  removeFavorite(index: number) {
    this.favoriteShows.splice(index, 1);
  }

  hasResults() {
    return this.movieList.length > 0;
  }

  hasFavoriteShow() {
    return this.favoriteShows.length > 0;
  }
}
