import { Component, OnInit, Input } from "@angular/core";
import { MapService } from "../map.service";

@Component({
  selector: "app-navigator",
  templateUrl: "./navigator.component.html",
  styleUrls: ["./navigator.component.scss"]
})
export class NavigatorComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
  }

  refreshLocation() {
    this.mapService.refreshLocation();
  }
}
