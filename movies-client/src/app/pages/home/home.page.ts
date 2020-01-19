import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Movie } from "../../movie";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  movies: Movie[] = [];

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    const loading = await this.loadingController.create({
      message: "Loading..."
    });
    await loading.present();
    await this.api.getMovies().subscribe(
      (res: any) => {
        this.movies = res["movies"];
        console.log(this.movies);
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  movieDetails(id: any) {
    this.router.navigate(["tabs/details", id]);
  }
}
