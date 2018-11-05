import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as L from "leaflet";
import { MapService } from "../map.service";

import "rxjs/add/operator/catch";
import { AfterViewInit } from "@angular/core";

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements AfterViewInit {
  constructor(private mapService: MapService) {}

  ngAfterViewInit() {
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
      zoom: 10,
      minZoom: 4,
      maxZoom: 17,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control
      .layers(this.mapService.baseMaps, null, { position: "topleft" })
      .addTo(map);
    L.control.scale().addTo(map);
    this.mapService.setMap(map);

    this.mapService.refreshLocation();
  }
}
