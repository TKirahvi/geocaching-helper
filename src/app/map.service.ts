import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import * as L from "leaflet";

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;

  private _location = new BehaviorSubject<L.LatLng>(undefined);
  public location: Observable<L.LatLng> = this._location.asObservable();
  private _mapInit = new BehaviorSubject<boolean>(false);
  public mapInit: Observable<boolean> = this._mapInit.asObservable();
  private _mapClick = new BehaviorSubject<L.LeafletMouseEvent>(undefined);
  public mapClick: Observable<
    L.LeafletMouseEvent
  > = this._mapClick.asObservable();

  private marker: L.Marker;

  private DefaultIcon = L.icon({
    iconUrl: "assets/marker-icon.png",
    shadowUrl: "assets/marker-shadow.png"
  });

  constructor(private http: HttpClient) {
    this.initBaseMaps();
    L.Marker.prototype.options.icon = this.DefaultIcon;
  }

  setMap(map: L.Map) {
    this.map = map;
    this._mapInit.next(true);
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  setLocation(location: L.LatLng) {
    this.clearMarker();
    this.addMarker(location);

    this._location.next(location);
  }

  addMarker(location: L.LatLng) {
    this.marker = L.marker(location);
    this.map.addLayer(this.marker);
  }

  clearMarker() {
    if (this.map && this.marker) {
      this.map.removeLayer(this.marker);
    }
  }

  refreshLocation() {
    this.map
      .locate({
        setView: true,
        maxZoom: 17
      })
      .on("locationfound", e => {
        let location: any = e;
        this.setLocation(location.latlng);
      })
      .on("locationerror", function(e) {
        console.log(e);
        alert("Location access denied.");
      });

    this.map.addEventListener("click", e => {
      let mouseEvent = <L.LeafletMouseEvent>e;
      this._mapClick.next(mouseEvent);
    });
  }

  initBaseMaps(): any {
    const osmAttr =
      "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, " +
      "Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>";

    const esriAttr =
      "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, " +
      "iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, " +
      "Esri China (Hong Kong), and the GIS User Community";

    const cartoAttr =
      "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> " +
      "&copy; <a href='http://cartodb.com/attributions'>CartoDB</a>";

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          zIndex: 1,
          attribution: osmAttr
        }
      ),
      Esri: L.tileLayer(
        "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          zIndex: 1,
          attribution: esriAttr
        }
      ),
      CartoDB: L.tileLayer(
        "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        {
          zIndex: 1,
          attribution: cartoAttr
        }
      )
    };
  }
}
