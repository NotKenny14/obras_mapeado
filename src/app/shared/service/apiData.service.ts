import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse } from '../interface/interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapService } from './mapa-api.service';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import * as ol from 'ol';
import getCoordinates from 'ol/geom/Geometry';
import Select from 'ol/interaction/Select';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serv: string = "https://sistemas.xalapa.gob.mx/";
  //private serv: string = "http://localhost:8069/";
  public guarda2023: any = [];

  private _dataSources: { [key: string]: BehaviorSubject<string> } = {};


//-----------------Peticiones al servidor-----------------------------

  private getMapa2023Request(url : string) {
    return this.httpClient.get<SearchResponse[]>(url);
  }

  searchMapa2023(): Observable<SearchResponse[]> {
    const url = `${this.serv}get_obras_web_2023`

    this.httpClient.get(url).subscribe(
      (data: any) => {
        this.guarda2023 = data;
      }
    );

    if(this.guarda2023 == false){
    return this.getMapa2023Request(url);
    }
    else {
      let url2 = this.guarda2023;
      return this.getMapa2023Request(url2);
    }

  }


  constructor( private httpClient: HttpClient, private mapService: MapService ) {
    //----------------Data Tarjeta-------------------------

    this.createDataSource('numObra', '');
    this.createDataSource('fechaInicio', '');
    this.createDataSource('fechaTermino', '');
    this.createDataSource('simbologia', '');
    this.createDataSource('simbologia2', '');
    this.createDataSource('calles', '');
    this.createDataSource('colonias', '');
    this.createDataSource('porcentajeAvance', '');


  }
//----------------Data Tarjeta-------------------------

  getData$(key: string): Observable<string> {
    return this._dataSources[key].asObservable();
  }

  setData(key: string, value: string) {
    this._dataSources[key].next(value);
  }

  setProperty(key: string, value: string) {
    this.setData(key, value);
  }

  private createDataSource(key: string, initialValue: string) {
    this._dataSources[key] = new BehaviorSubject(initialValue);
  }

//----------------Data Tarjeta-------------------------
  private _showCard = new BehaviorSubject<boolean>(false);
  showCard$ = this._showCard.asObservable();

  // Método para mostrar la tarjeta
  showCard() {
    this._showCard.next(true);
  }

  //-----------Data Modal-------------------------
  modalVisible: boolean = false;

  showModal() {
    this.modalVisible = true;
  }

  hideModal() {
    this.modalVisible = false;
  }

  pintarPuntos(puntos: any) {
    console.log('a')
    const geometries: any = [];
    const source = new VectorSource({ wrapX: false });
    const vectorLayer = new VectorLayer({
      source: source,
    });
    const selectIconInteraction1 = new Select();
    const midPointSource = new VectorSource();
    const midPointLayer = new VectorLayer({
      source: midPointSource
    });

    this.mapService.map?.addInteraction(selectIconInteraction1);

    // Escucha el evento select de selectIconInteraction1
    selectIconInteraction1.on('select', (event: any) => {
      const selectedFeatures = event.selected;
      selectedFeatures.forEach((iconFeature: any) => {
        const iconCoordinate = iconFeature.getGeometry().getCoordinates();
        const lineFeatures = this.mapService.map?.getFeaturesAtPixel(this.mapService.map?.getPixelFromCoordinate(iconCoordinate), {
          hitTolerance: 7,
        });

        const lineFeature = lineFeatures?.find((feature:any) => {
          return feature.getGeometry().getType() === 'LineString';
        });

        // Realiza las acciones con los datos de la línea seleccionada (en este caso, imprime las propiedades)
        if (lineFeature) {
          const properties = lineFeature.getProperties();
          console.log(properties);

          const numObra = properties ? properties['num_obra'] || '' : '';
          this.setData('numObra', numObra);

          const fechaInicio = properties ? properties['fecha_inicio'] || '' : '';
          this.setData('fechaInicio', fechaInicio);

          const fechaTermino = properties ? properties['fecha_termino'] || '' : '';
          this.setData('fechaTermino', fechaTermino);

          const simbologia = properties ? properties['simbologia'] || '' : '';
          this.setData('simbologia', simbologia);

          const simbologia2 = properties ? properties['nombre_simbologia'] || '' : '';
          this.setData('simbologia2', simbologia2);

          const calles = properties ? properties['domicilio'] || '' : '';
          this.setData('calles', calles);

          const colonias = properties ? properties['colonia_nombres'] || '' : '';
          this.setData('colonias',colonias);

          const porcentajeAvance = properties ? properties['porcentaje_avance'] || '' : '';
          this.setData('porcentajeAvance',porcentajeAvance);


          this.showCard();


        }

      });

      // Limpia las características seleccionadas para evitar que se seleccionen múltiples veces
      selectIconInteraction1.getFeatures().clear();
    });



    for (let x = 0; x < puntos['obras'].length; x++) {
      if (!puntos['obras'][x]['obras_relacionadas']) {
        const geojson = puntos['obras'][x]['geojson'];
        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(geojson);

        features.forEach(function (feature: any) {
          const obra = puntos['obras'][x];
          feature.setProperties({
            num_obra: obra['num_obra'],
            fecha_inicio: obra['fecha_inicio'],
            fecha_termino: obra['fecha_termino'],
            area: obra['area'],
            longitud: obra['longitud'],
            estado_obra: obra['estado_obra'],
            simbologia: obra['simbologia_ids'][1],
            simbologia2: obra['simbologia_ids2'],
            nombre_simbologia: obra['simbologia_nombres'],
            colonia_nombres: obra['colonia_nombres'],
            avance: obra['porcentaje_avance'],
            porcentaje_avance: obra['porcentaje_avance'],
            domicilio: obra['domicilio']
          });
        });

        source.addFeatures(features);

        if (puntos['obras'][x]['porcentaje_avance'] === 100 && puntos['obras'][x]['pertenece_a'] === 'ayto') {

          const lineStyle = new Style({
              stroke: new Stroke({
                  color: '#1d9123',
                  width: 6
              })
          });

          // Apply the new style to the features representing the lines
          features.forEach(function (feature) {
              feature.setStyle(lineStyle);
          });

      }
      if (puntos['obras'][x]['porcentaje_avance'] >= 51 && puntos['obras'][x]['porcentaje_avance'] <= 99 && puntos['obras'][x]['pertenece_a'] === 'ayto') {

          const lineStyle = new Style({
              stroke: new Stroke({
                  color: '#d1bf32',
                  width: 6
              })
          });

          // Apply the new style to the features representing the lines
          features.forEach(function (feature) {
              feature.setStyle(lineStyle);
          });

      }
      if (puntos['obras'][x]['porcentaje_avance'] >= 1 && puntos['obras'][x]['porcentaje_avance'] <= 50 && puntos['obras'][x]['pertenece_a'] === 'ayto') {

          const lineStyle = new Style({
              stroke: new Stroke({
                  color: '#de7a28',
                  width: 6
              })

          });

          // Apply the new style to the features representing the lines
          features.forEach(function (feature) {
              feature.setStyle(lineStyle);
          });

      }
      if (puntos['obras'][x]['porcentaje_avance'] === 0 && puntos['obras'][x]['pertenece_a'] === 'ayto') {

          const lineStyle = new Style({
              stroke: new Stroke({
                  color: '#3d240f',
                  width: 6
              })
          });

          // Apply the new style to the features representing the lines
          features.forEach(function (feature) {
              feature.setStyle(lineStyle);
          });

      }

        const currentGeometries = features.map(function (feature) {
          return feature.getGeometry();
        });

        let dibujado_icono = false
        // Calcular el punto medio de cada línea y agregar los iconos
        currentGeometries.forEach(function (geometry: any) {
          const coordinates = geometry.getCoordinates();
          const midCoordinate = getMidCoordinate(coordinates);

          // Verificar si el icono ya ha sido dibujado para esta obra
          if (!dibujado_icono) {
              // Crear el punto medio
              const midPoint = new Feature({
                  geometry: new Point(midCoordinate)
              });

              // Estilo para los iconos
              const iconStyle = new Style({
                  image: new Icon({
                      src: 'data:image/png;base64,' + puntos['obras'][x]['simbologia'],
                      anchor: [0.5, 0.5],
                      scale: 0.8
                  })
              });

              // Aplicar el estilo al punto medio y agregarlo a la capa de puntos medios
              midPoint.setStyle(iconStyle);
              midPointSource.addFeature(midPoint);

              // Marcar que el icono ha sido dibujado para esta obra
              dibujado_icono = true;
          }
      });

      geometries.push(...currentGeometries);
      }
      if (puntos['obras'][x]['obras_relacionadas']) {
          var obrasRelacionadas = puntos['obras'][x]['obras_relacionadas'];
          console.log(puntos['obras'][x]['obras_relacionadas'])
          console.log(obrasRelacionadas)
          if (obrasRelacionadas.length > 0) {
              // Iterar sobre las obras relacionadas
              for (var y = 0; y < obrasRelacionadas.length; y++) {
                  var geojson2 = obrasRelacionadas[y]['geojson2'];
                  var geoJSONFormat = new GeoJSON();
                  var features2 = geoJSONFormat.readFeatures(geojson2);
                  if (geojson2) {
                      features2.forEach(function (feature) {
                          feature.setProperties({
                              num_obra: obrasRelacionadas[y]['num_obra']
                          });
                          feature.setProperties({
                              fecha_inicio: obrasRelacionadas[y]['fecha_inicio']
                          });
                          feature.setProperties({
                              fecha_termino: obrasRelacionadas[y]['fecha_termino']
                          });
                          feature.setProperties({
                              area: obrasRelacionadas[y]['area']
                          });
                          feature.setProperties({
                              longitud: obrasRelacionadas[y]['longitud']
                          });
                          feature.setProperties({
                              estado_obra: obrasRelacionadas[y]['estado_obra']
                          });
                          feature.setProperties({
                              simbologia: puntos['obras'][x]['simbologia_ids'][1]
                          });
                          feature.setProperties({
                              simbologia2: puntos['obras'][x]['simbologia_ids2'][1]
                          });
                          feature.setProperties({
                              avance: obrasRelacionadas[y]['porcentaje_avance']
                          });
                          feature.setProperties({
                              porcentaje_avance: puntos['obras'][x]['porcentaje_avance']
                          });

                      });

                      source.addFeatures(features2);
                      if (obrasRelacionadas[y].estado_obra === 'OT') {

                          var lineStyle = new Style({
                              stroke: new Stroke({
                                  color: '#1d9123',
                                  width: 6
                              })
                          });

                          // Apply the new style to the features representing the lines
                          features2.forEach(function (feature) {
                              feature.setStyle(lineStyle);
                          });

                      }
                      if (obrasRelacionadas[y].estado_obra === 'OC') {

                          var lineStyle = new Style({
                              stroke: new Stroke({
                                  color: '#de7a28',
                                  width: 6
                              })
                          });

                          // Apply the new style to the features representing the lines
                          features2.forEach(function (feature) {
                              feature.setStyle(lineStyle);
                          });

                      }
                      if (obrasRelacionadas[y].estado_obra === 'OTP') {

                          var lineStyle = new Style({
                              stroke: new Stroke({
                                  color: '#3d240f',
                                  width: 6
                              })

                          });

                          // Apply the new style to the features representing the lines
                          features2.forEach(function (feature) {
                              feature.setStyle(lineStyle);
                          });

                      }
                      if (obrasRelacionadas[y].estado_obra === 'ACC') {

                          var lineStyle = new Style({
                              stroke: new Stroke({
                                  color: '#d1bf32',
                                  width: 6
                              })
                          });

                          // Apply the new style to the features representing the lines
                          features2.forEach(function (feature) {
                              feature.setStyle(lineStyle);
                          });

                      }

                      var currentGeometries2 = features2.map(function (feature) {
                          return feature.getGeometry();
                      });

                      // Agregar las geometrías de la iteración actual al arreglo general
                      var geometries2: any = [];
                      geometries2 = geometries.concat(currentGeometries2);
                      var midPointLayers2:any = [];

                      // Crear un estilo para los puntos (iconos) en los extremos de la línea
                      var iconStyle2 = new Style({
                          image: new Icon({
                              src: 'data:image/png;base64,' + puntos['obras'][x]['simbologia'],
                              anchor: [0.5, 0.5],
                              // Punto de anclaje del icono (centro)
                              scale: 0.8,
                              // Escala del icono

                          })
                      });

                      // Calcular el punto medio de cada línea
                      var midPoints2:any = [];
                      var dibujado_icono2 = false
                      currentGeometries2.forEach(function (geometries2:any) {

                          var coordinates2 = geometries2.getCoordinates();
                          var midCoordinate2 = getMidCoordinate(coordinates2);
                          var midPoint2 = new ol.Feature(new Point(midCoordinate2));
                          console.log(dibujado_icono2)
                          if (!dibujado_icono2) {
                              midPoint2.setStyle(iconStyle2);
                              midPoints2.push(midPoint2);
                              dibujado_icono2 = true

                          }
                          console.log(dibujado_icono2)


                      });

                      // Función para calcular el punto medio de una línea
                      function getMidCoordinate(coordinates2:any) {
                          var length2 = coordinates2.length;
                          var midIndex2 = Math.floor(length2 / 2);
                          return coordinates2[midIndex2];
                      }


                      // Crear una capa vectorial para los puntos medios
                      var midPointSource2 = new VectorSource({
                          features: midPoints2
                      });

                      var midPointLayer2 = new VectorLayer({
                          source: midPointSource2
                      });
                      midPointLayers2.push(midPointLayer2);
                      // Agregar la capa vectorial de puntos medios y la capa vectorial de línea al mapa
                      this.mapService.map?.addLayer(midPointLayer2);




                  }



              }


          }

      }
    }

    // Función para calcular el punto medio de una línea
    function getMidCoordinate(coordinates: any) {
      const length = coordinates.length;
      const midIndex = Math.floor(length / 2);
      return coordinates[midIndex];
    }



    // Aplicar el estilo a la capa vectorial de línea

    // Agregar la capa vectorial de línea y la capa vectorial de iconos al mapa
    this.mapService.map?.addLayer(vectorLayer);
    this.mapService.map?.addLayer(midPointLayer);



  }

  searchTerm(term: string) {
    console.log(term)
   const datosFiltrados = this.guarda2023.find((item: any) => item.propiedad === term);
   console.log(datosFiltrados)
  }

}
