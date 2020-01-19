import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../../movie";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"]
})
export class DetailsPage implements OnInit {
  movie: Movie = {
    id: null,
    title: "",
    overview: "",
    genre: "",
    rating: null,
    release_date: null
  };
  isLoadingResults = false;

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.getMovie();
  }

  async getMovie() {
    if (this.route.snapshot.paramMap.get("id") === "null") {
      this.presentAlertConfirm("You are not choosing an item from the list");
    } else {
      const loading = await this.loadingController.create({
        message: "Loading..."
      });
      await loading.present();
      this.isLoadingResults = true;
      await this.api.getMovie(this.route.snapshot.paramMap.get("id")).subscribe(
        (res: any) => {
          this.movie = res["movie"];
          this.isLoadingResults = true;
          loading.dismiss();
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    }
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: "Warning!",
      message: msg,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.router.navigate([""]);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteMovie(id: any) {
    this.isLoadingResults = true;
    await this.api.deleteMovie(id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  editMovie(id: any) {
    this.router.navigate(["tabs/edit", id]);
  }
}
