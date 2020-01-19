import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
//import { Movie } from "../../movie";
import { ErrorStateMatcher } from "@angular/material/core";

import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"]
})
export class AddPage implements OnInit {
  movieForm: FormGroup;
  title = "";
  overview = "";
  rating: number = null;
  genre: "";
  release_date: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.isLoadingResults = true;
    this.movieForm = this.formBuilder.group({
      title: [null, Validators.required],
      overview: [null, Validators.required],
      rating: [null, Validators.required],
      genre: [null, Validators.required],
      release_date: [null, Validators.required]
    });
  }

  ngOnInit() {}

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addMovie(this.movieForm.value).subscribe(
      (res: any) => {
        const id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(["tabs/home"]);
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
