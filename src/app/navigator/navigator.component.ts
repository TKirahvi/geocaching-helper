import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../map.service";
import { GeocodingService } from "../geocoding.service";
import { Location } from "../location";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-navigator",
  templateUrl: "./navigator.component.html",
  styleUrls: ["./navigator.component.scss"]
})
export class NavigatorComponent implements OnInit {
  munincipalityOn: boolean;

  constructor(
    private mapService: MapService,
    private geocoder: GeocodingService,
    private snackBar: MatSnackBar
  ) {
    this.munincipalityOn = false;
  }

  ngOnInit() {
    this.mapService.disableMouseEvent("map-navigator");
  }
  toggleMunicipalityLayer(on: boolean) {
    this.munincipalityOn = on;
    this.mapService.toggleMunincipalityLayer(this.munincipalityOn);
  }
}
