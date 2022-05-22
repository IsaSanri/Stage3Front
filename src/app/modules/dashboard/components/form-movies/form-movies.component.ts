import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Options } from "@app-models/movie.model";

@Component({
  selector: "app-form-movies",
  templateUrl: "./form-movies.component.html",
  styleUrls: ["./form-movies.component.scss"],
})
export class FormMoviesComponent {
  @Output() searchMovieEmitter = new EventEmitter<string>();
  movieForm: FormGroup;
  option: Options[] = [
    { value: "movies", viewValue: "movies" },
    { value: "series", viewValue: "series" },
    { value: "episodes", viewValue: "episodes" },
  ];

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      option: ["", Validators.required],
      nameField: ["", Validators.required],
      yearField: [
        { value: "", disabled: true },
        [Validators.required, Validators.minLength(4)],
      ],
    });
  }

  get getTitle() {
    return this.movieForm.get("nameField");
  }
  get getOption() {
    return this.movieForm.get("option");
  }

  isDisabled() {
    if (this.getOption.value == "series")
      this.movieForm.controls["yearField"].enable();
    else this.movieForm.controls["yearField"].disable();
  }

  searchMovie() {
    this.searchMovieEmitter.emit(this.getTitle.value);
  }
}
