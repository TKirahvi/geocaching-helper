import { Component } from "@angular/core";
import { MapService } from "./map.service";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  loadingIndicator: boolean;
  modalOpen: boolean;

  constructor(
    private mapService: MapService,
    private modalService: ModalService
  ) {
    this.loadingIndicator = false;
    this.modalOpen = false;

    this.mapService.loading.subscribe(loading => {
      this.loadingIndicator = loading;
    });

    this.modalService.infoOpen.subscribe(open => {
      this.modalOpen = open;
    });
  }
}
