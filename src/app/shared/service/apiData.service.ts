import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse } from '../interface/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private serv: string = "https://sistemas.xalapa.gob.mx/";
  //private serv: string = "http://localhost:8069/";


  private _dataSources: { [key: string]: BehaviorSubject<string> } = {};


//-----------------Peticiones al servidor-----------------------------

  private getMapa2023Request(url : string) {
    return this.httpClient.get<SearchResponse[]>(url);
  }

  searchMapa2023(): Observable<SearchResponse[]> {
    const url = `${this.serv}get_obras_web_2023`
    return this.getMapa2023Request(url);
  }

  getObra(numObra: string): Observable<any> {
    const url = `${this.serv}get_obra2023`;
    const formData = new FormData();
    formData.append('num_obra', numObra);
    return this.httpClient.post(url, formData);
  }



  constructor( private httpClient: HttpClient ) {
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


}
