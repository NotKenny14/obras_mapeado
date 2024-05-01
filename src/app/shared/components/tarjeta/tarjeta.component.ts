import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/apiData.service';
import { ModalService } from '../../service/modal-service.service';

@Component({
  selector: 'shared-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  public numObra: string = '';
  public fechaInicio: string = '';
  public fechaTermino: string = '';
  public simbologia: string = '';
  public simbologia2: string = '';
  public calles: string = '';
  public colonias: string = '';
  public porcentajeAvance: string = '';

  constructor( private apiService: ApiService, private modalService: ModalService ) {
    this.apiService.getData$('numObra').subscribe(numObra => {
      this.numObra = numObra;
    });

    this.apiService.getData$('fechaInicio').subscribe(fechaInicio => {
      this.fechaInicio = fechaInicio;
    });

    this.apiService.getData$('fechaTermino').subscribe(fechaTermino => {
      this.fechaTermino = fechaTermino;
    });

    this.apiService.getData$('simbologia').subscribe(simbologia => {
      this.simbologia = simbologia;
    });

    this.apiService.getData$('simbologia2').subscribe(simbologia2 => {
      this.simbologia2 = simbologia2;
    });

    this.apiService.getData$('calles').subscribe(calles => {
      this.calles = calles;
    });

    this.apiService.getData$('colonias').subscribe(colonias => {
      this.colonias = colonias;
    });

    this.apiService.getData$('porcentajeAvance').subscribe(porcentajeAvance => {
      this.porcentajeAvance = porcentajeAvance;
    });
  }
  ngOnInit(): void {
    this.apiService.showCard$.subscribe(showCard => {
      this.showCard = showCard;
    });  }

  showCard = false;


  cerrarToast() {
    const elemento = document.getElementById('toast-interactive');
    if (elemento) {
      //elemento.style.display = 'none';
      this.showCard = false;
    } else {
      console.error('El elemento "toast-interactive" no se encontró en el DOM.');
    }
  }



  activarModal() {
    this.apiService.showModal();

  }

  detallesCard(obra: string): void {
    this.modalService.getObra(obra).subscribe(
      (response) => {
        this.modalService.setDetallesObra(response);
      },
      (error) => {
        console.error('Error al obtener los detalles de la obra:', error);
        // Aquí puedes manejar el error y mostrar un mensaje al usuario
      }
    );
  }

}
