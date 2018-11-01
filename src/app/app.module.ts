import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppComponent } from "./app.component";
import { MapComponent } from "./map/map.component";
import { NavigatorComponent } from "./navigator/navigator.component";

import { MapService } from "./map.service";
import { ModalService } from "./modal.service";

import "leaflet";
import "leaflet.vectorgrid";
import "d3-geo";

import { CurrentMunincipalityComponent } from "./current-munincipality/current-munincipality.component";
import { InfoComponent } from "./info/info.component";
import { ModalDialogModule } from "ngx-modal-dialog";

@NgModule({
  declarations: [
    MapComponent,
    NavigatorComponent,
    AppComponent,
    CurrentMunincipalityComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    ModalDialogModule.forRoot()
  ],
  entryComponents: [InfoComponent],
  providers: [MapService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
