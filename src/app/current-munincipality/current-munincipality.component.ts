import { Component, OnInit } from "@angular/core";
import { MapService } from "../map.service";
import { MapComponent } from "../map/map.component";

@Component({
  selector: "current-munincipality",
  templateUrl: "./current-munincipality.component.html",
  styleUrls: ["./current-munincipality.component.scss"]
})
export class CurrentMunincipalityComponent {
  currentMunincipality: string;

  constructor(private mapService: MapService) {
    this.currentMunincipality = "Ei löytynyt";

    mapService.location.subscribe(location => {
      if (location != undefined) {
        mapService.findMunincipality(location).then(munincipality => {
          this.currentMunincipality = munincipality;
        });
      }
    });
  }
}
