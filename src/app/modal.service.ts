import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class ModalService {
  private _infoOpen = new BehaviorSubject<boolean>(false);
  public infoOpen: Observable<boolean> = this._infoOpen.asObservable();

  constructor() {}

  closeInfo() {
    this._infoOpen.next(false);
  }

  openInfo() {
    console.log("open info");
    this._infoOpen.next(true);
  }
}
