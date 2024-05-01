import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private serv: string = "https://sistemas.xalapa.gob.mx/";

  private detallesObraSubject = new BehaviorSubject<any>(null);
  detallesObra$ = this.detallesObraSubject.asObservable();


  constructor( private httpClient: HttpClient ) { }

  getObra(numObra: string): Observable<any> {
    const url = `${this.serv}get_obra2023`;
    const formData = new FormData();
    formData.append('num_obra', numObra);
    return this.httpClient.post(url, formData);
  }

  setDetallesObra(detalles: any) {
    this.detallesObraSubject.next(detalles);
  }

}
