import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { MovieInterface } from "@app-models/movie.model";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-movies-table",
  templateUrl: "./movies-table.component.html",
  styleUrls: ["./movies-table.component.scss"],
})
export class MoviesTableComponent implements OnInit, OnChanges {
  dataSource: MovieInterface[];
  movieForm: FormGroup;
  favoriteToAdd: MovieInterface;
  @Input() movieList: MovieInterface[];
  @Output() addFavoriteMovieEmitter = new EventEmitter<MovieInterface>();

  constructor(private fb: FormBuilder) {
    this.dataSource = [];
    this.movieList = [];
    this.favoriteToAdd = {} as MovieInterface;
    this.movieForm = this.fb.group({
      movies: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.dataSource = this.movieList;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["movieList"].currentValue) {
      this.dataSource = changes["movieList"].currentValue;
      this.getMovieList.clear();
      this.dataSource.forEach((element) => {
        this.getMovieList.push(this.addMovie(element));
      });
    }
  }

  get getMovieList() {
    return this.movieForm.get("movies") as FormArray;
  }

  addMovie(movieData: MovieInterface) {
    return this.fb.group({
      title: [movieData.title],
      type: [movieData.type],
      year: [movieData.year],
      comments: [""],
    });
  }

  addFavoriteMovie(index: number) {
    this.favoriteToAdd = {
      id: this.dataSource[index].id,
      poster: this.dataSource[index].poster,
      title: this.getMovieList.at(index).value.title,
      type: this.getMovieList.at(index).value.type,
      year: this.getMovieList.at(index).value.year,
      comments: this.getMovieList.at(index).value.comments,
      registerDate: this.getMovieList.at(index).value.registerDate,
    };
    this.addFavoriteMovieEmitter.emit(this.favoriteToAdd);
  }
}
