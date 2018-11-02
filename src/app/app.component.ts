import { Component } from "@angular/core";
import { MapService } from "./map.service";
import { ModalService } from "./modal.service";
import { WindowService } from "./window.service";

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
    private modalService: ModalService,
    private windowService: WindowService
  ) {
    this.loadingIndicator = false;
    this.modalOpen = false;

    this.windowService.loading.subscribe(loading => {
      this.loadingIndicator = loading;
    });

    this.modalService.infoOpen.subscribe(open => {
      this.modalOpen = open;
    });
  }
}
