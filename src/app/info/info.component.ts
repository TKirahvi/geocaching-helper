import { Component, OnInit } from "@angular/core";
import {
  IModalDialog,
  IModalDialogButton,
  IModalDialogOptions
} from "ngx-modal-dialog";
import { ComponentRef } from "@angular/core";
import { ModalService } from "../modal.service";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent {
  infoOpen: boolean;

  constructor(private modalService: ModalService) {
    modalService.infoOpen.subscribe(open => {
      this.infoOpen = open;
    });
  }

  closeInfo() {
    this.modalService.closeInfo();
  }
}
