import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as L from "leaflet";
import { MapService } from "../map.service";

import "rxjs/add/operator/catch";

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {

  constructor(
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    const map = L.map("map", {
      zoomControl: false,
      attributionControl: false,
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.scale().addTo(map);
    this.mapService.map = map;

    this.mapService.refreshLocation();
  }
}
