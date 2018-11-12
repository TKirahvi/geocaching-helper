import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { MapService } from "./map.service";
import "assets/Leaflet.Graticule.js";
import { HttpClient } from "@angular/common/http";
import * as L from "leaflet";
import * as d3 from "d3-geo";
import { WindowService } from "./window.service";
import { Injectable } from "@angular/core";

declare var latlngGraticule: any;

interface LayerMap {
  [key: string]: any;
}

@Injectable({
  providedIn: "root"
})
export class LayerService {
  private allMunincipalities = "assets/kuntarajat.geojson";
  private strippedMunincipalities = "assets/kuntarajat-ok.geojson";

  constructor(
    private http: HttpClient,
    private mapService: MapService,
    private windowService: WindowService
  ) {
    this.mapService.mapInit.filter(initialized => initialized).subscribe(() => {
      this.initLayers();
    });
  }

  initLayers(): any {
    this.windowService.startLoading();

    var graticuleLayer = latlngGraticule({
      showLabel: true,
      color: "red",
      weight: 0.8,
      opacity: 0.8,
      zoomInterval: [
        { start: 2, end: 3, interval: 10 },
        { start: 3, end: 15, interval: 1 }
      ]
    });

    this.http.get(this.allMunincipalities).subscribe(result => {
      var munincipalityLayer = L.geoJSON( result as any );
      var overlayMaps = {
        "Graticule": graticuleLayer, 
        "Kuntarajat": munincipalityLayer
      }
      L.control.layers(this.mapService.baseMaps, overlayMaps, { position: "topleft" }).addTo(this.mapService.map);
    });

    this.windowService.endLoading();
  }

  findMunincipality(latLng: L.LatLng): Promise<string> {
    let munincipality = "Ei löytynyt";

    let promise: Promise<string> = new Promise((resolve, reject) => {
      this.http
        .get(this.allMunincipalities)
        .toPromise()
        .then(result => {
          this.windowService.startLoading();
          let munincipalityGeoJSON: any = result;

          munincipalityGeoJSON.features.map(feature => {
            if (
              (feature.geometry.geometries || feature.geometry.coordinates) &&
              d3.geoContains(feature.geometry, [latLng.lng, latLng.lat])
            ) {
              munincipality = feature.properties.name;
            }
          });
          resolve(munincipality);
          this.windowService.endLoading();
        });
    });

    return promise;
  }
}

export enum LayerType {
  Munincipalities,
  Graticules,
  Provinces
}

export class LayerSelection {
  constructor(public name: string, public type: LayerType) {}
}
