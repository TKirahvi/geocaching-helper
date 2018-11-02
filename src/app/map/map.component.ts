import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as L from "leaflet";
import { MapService } from "../map.service";
import "assets/Leaflet.Graticule.js";

declare var latlngGraticule: any;

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

    latlngGraticule({
      showLabel: true,
      color: "red",
      weight: 0.8,
      opacity: 0.8,
      zoomInterval: [
        { start: 2, end: 3, interval: 10 },
        { start: 3, end: 15, interval: 1 }
      ]
    }).addTo(map);

    L.control.zoom({ position: "topright" }).addTo(map);
    L.control.scale().addTo(map);
    this.mapService.map = map;

    this.mapService.refreshLocation();
  }
}
