import { Component, OnInit } from "@angular/core";
import { LayerService, LayerType, LayerSelection } from "../layer.service";

@Component({
  selector: "layer-select",
  templateUrl: "./layer-select.component.html",
  styleUrls: ["./layer-select.component.scss"]
})
export class LayerSelectComponent implements OnInit {
  availableLayers: LayerSelection[] = new Array(
    new LayerSelection("Kunnat", LayerType.Munincipalities),
    new LayerSelection("Maakunnat", LayerType.Provinces),
    new LayerSelection("Graticule", LayerType.Graticules)
  );

  constructor(private layerService: LayerService) {}

  ngOnInit() {}

  onLayerChange(layer: LayerSelection) {
    this.layerService.toggleLayer(layer.type);
  }
}
