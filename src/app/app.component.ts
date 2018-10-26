import { Component } from "@angular/core";
import { MapService } from "./map.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
   
   loadingIndicator: boolean; 

  constructor(
    private mapService: MapService) {
      this.loadingIndicator = false;
      this.mapService.loading.subscribe((loading) => {
          this.loadingIndicator = loading;
      });
    }
}
