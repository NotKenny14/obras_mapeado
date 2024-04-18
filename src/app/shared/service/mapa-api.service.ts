import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { transform } from 'ol/proj';
import OSM from 'ol/source/OSM';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map?: Map;

  constructor() {}

  initMap(targetElementId: string): void {
    const centerCoords = transform([-96.923689, 19.527459], 'EPSG:4326', 'EPSG:3857');



    this.map = new Map({
      target: targetElementId, // Asigna el elemento HTML como el destino del mapa
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: centerCoords,
        zoom: 14,
        minZoom: 10,
        extent: [-10805355.133280315, 2202072.63612, -10765002.114799686, 2235646.98972],
      })

    });
  }


}
