import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

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
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"]
})
export class EditPage implements OnInit {
  private movieForm: FormGroup;
  id = "";
  title = "";
  overview = "";
  rating: number = null;
  genre: "";
  release_date: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.movieForm = this.formBuilder.group({
      title: [null, Validators.required],
      overview: [null, Validators.required],
      rating: [null, Validators.required],
      genre: [null, Validators.required],
      release_date: [null, Validators.required]
    });
    this.getMovie(this.route.snapshot.params["id"]);
  }

  ngOnInit = () => {
    this.getMovie(this.route.snapshot.params["id"]);
  };

  getMovie = async (id: any) => {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });
    await loading.present();
    this.api.getMovie(id).subscribe((data: any) => {
      console.log("Setting movie");
      console.log(data["movie"]);

      this.id = data["movie"].id;
      this.movieForm.setValue({
        title: data["movie"].title,
        overview: data["movie"].overview,
        rating: data["movie"].rating,
        genre: data["movie"].genre,
        release_date: data["movie"].release_date
      });
      this.isLoadingResults = true;
      loading.dismiss();
    });
  };

  onFormSubmit = () => {
    this.isLoadingResults = true;
    this.api.updateMovie(this.id, this.movieForm.value).subscribe(
      (res: any) => {
        const id = res.id;
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.router.navigate(["tabs/home"]);
  };
}
