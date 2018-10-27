import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs/Rx";
import * as L from "leaflet";
import * as d3 from 'd3-geo';

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;
  private vtLayer: any;

  private _location = new BehaviorSubject<L.LatLng>(undefined);
  public location: Observable<L.LatLng> = this._location.asObservable();

  private _loading = new BehaviorSubject<boolean>(false);
  public loading: Observable<boolean> = this._loading.asObservable();

  
  private DefaultIcon = L.icon({
      iconUrl: "assets/marker-icon.png",
      shadowUrl: "assets/marker-shadow.png"
    });

  constructor(private http: HttpClient) {
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

    L.Marker.prototype.options.icon = this.DefaultIcon;
  }


  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);

    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  toggleMunincipalityLayer(on: boolean) {
    if ( on ) {
        this.http.get("assets/kuntarajat.geojson").subscribe(result => {
          this._loading.next(true);
          this.vtLayer = L.vectorGrid.slicer(result, {
           zIndex: 1000
         });
         this.vtLayer.addTo(this.map);
        this._loading.next(false);
      });

    } else if (this.vtLayer) {
      this.map.removeLayer(this.vtLayer);
      delete this.vtLayer;
    }
  }

  setLocation(location: L.LatLng) {
    this.map.panTo(location);
    this.map.setZoom(15);

    var marker = L.marker(location);
    this.map.addLayer(marker);
    this._location.next(location);
  }

  refreshLocation() {    
        this.map.locate({setView: true, watch: true, maxZoom: 16}) /* This will return map so you can do chaining */
        .on('locationfound', e => {
          let location: any = e;
            this.setLocation(location.latlng);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
  }

  findMunincipality(latLng: L.LatLng): Promise<string> {
    let munincipality = "Ei löytynyt";

    let promise: Promise<string> = new Promise((resolve, reject) => {

      this.http.get("assets/kuntarajat.geojson")
        .toPromise()
        .then(result => {
          this._loading.next(true);
          let munincipalityGeoJSON: any = result;
          munincipalityGeoJSON.features.map(feature => {
            // What if polygon contains several coorinates, can munincipality be
            // several polygons? <- I guess so
            if ( feature.geometry.coordinates && 
                  d3.geoContains(feature.geometry, [latLng.lng, latLng.lat])) {
              munincipality = feature.properties.name;
            }
          });
          resolve(munincipality);
          this._loading.next(false);
      });
    });

    return promise;
  }
}



