import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../map.service";

@Component({
  selector: "app-navigator",
  templateUrl: "./navigator.component.html",
  styleUrls: ["./navigator.component.scss"]
})
export class NavigatorComponent implements OnInit {
  munincipalityOn: boolean;

  constructor(
    private mapService: MapService
  ) {
    this.munincipalityOn = true;
  }

  ngOnInit() {
    this.mapService.disableMouseEvent("map-navigator");
  }
  toggleMunicipalityLayer(on: boolean) {
    this.munincipalityOn = on;
    this.mapService.toggleMunincipalityLayer(this.munincipalityOn);
  }
}
