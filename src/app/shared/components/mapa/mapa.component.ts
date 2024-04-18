import { Component, OnInit, ElementRef } from '@angular/core';
import Map from 'ol/Map';
import { MapService } from '../../service/mapa-api.service';


@Component({
  selector: 'shared-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  public map?: Map;

  constructor( private mapService: MapService, private elementRef: ElementRef ) {}


  ngOnInit(): void {
    const mapElement = this.elementRef.nativeElement.querySelector('#map'); // Obtén el elemento HTML con el ID 'map'
    this.mapService.initMap(mapElement);
  }






}

