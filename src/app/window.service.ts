import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class WindowService {
  private _loading = new BehaviorSubject<boolean>(false);
  public loading: Observable<boolean> = this._loading.asObservable();

  constructor() {}

  startLoading() {
    this._loading.next(true);
  }

  endLoading() {
    this._loading.next(false);
  }
}
