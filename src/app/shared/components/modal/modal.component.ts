import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/apiData.service';
import { ModalService } from '../../service/modal-service.service';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{
  public numObra: string = '';
  public fechaInicio: string = '';
  public fechaTermino: string = '';
  public simbologia: string = '';
  public simbologia2: string = '';
  public colonias: string = '';
  public estadoObra: string = '';
  public area: string = '';
  public sector: string = '';
  public trabajosIncluidos: string = '';
  public detalle: string = '';
  public beneficiarios: string = '';
  fotosAntes: { imagenSrc: string, descripcion: string }[] = [];
  fotosDurante: { imagenSrc: string, descripcion: string }[] = [];
  fotosDespues: { imagenSrc: string, descripcion: string }[] = [];






  constructor( public apiService: ApiService, private modalService: ModalService ) { }
  ngOnInit(): void {

    this.modalService.detallesObra$.subscribe(detalles => {
      if (detalles) {
        console.log(detalles)
        this.numObra = detalles.data.num_obra,
        this.fechaInicio = detalles.data.fecha_inicio,
        this.fechaTermino = detalles.data.fecha_termino,
        this.estadoObra = detalles.data.estado_obra,
        this.area = detalles.data.area,
        this.sector = detalles.data.sector,
        this.estadoObra = detalles.data.estado_obra,
        this.trabajosIncluidos = detalles.data.trabajos_incluidos,
        this.colonias = detalles.data.colonia_nombres,
        this.detalle = detalles.data.detalle,
        this.beneficiarios = detalles.data.beneficiarios

        for (let i = 0; i < detalles.data.simbologia.length; i++) {
          //simbologiaNames += dataRec.simbologia[i].name;
          if (detalles.data.simbologia[i].name != undefined){
          this.simbologia = detalles.data.simbologia[i].name;
          }
        }
        if (detalles.data.simbologia2) {
          const nombres = detalles.data.simbologia2.map((item:any) => item.name).join(', ');
          // Mostrar los nombres concatenados en #data_simbologia2
          this.simbologia2 = nombres;
        }

        if (detalles.data.fotografias) {
          detalles.data.fotografias.forEach((fotografia:any) => {
            const imagenSrc = fotografia.fotografia;
            const descripcion = fotografia.descripcion || '';
            const version = fotografia.version;

            // Crear el objeto de fotografía
            const foto = { imagenSrc, descripcion };

            // Agregar la fotografía al arreglo correspondiente según la versión
            switch (version) {
              case 'Antes':
                this.fotosAntes.push(foto);
                break;
              case 'Durante':
                this.fotosDurante.push(foto);
                break;
              case 'Después':
                this.fotosDespues.push(foto);
                break;
              default:
                break;
            }
          });
        }

        if(this.estadoObra === 'OT') {
          this.estadoObra = 'Obra Terminada';
        }
        else if(this.estadoObra === 'OTP') {
          this.estadoObra = 'Obra Tripartita en Proceso';
        }
        else if(this.estadoObra === 'OC') {
          this.estadoObra = 'Obra Contratada en Proceso';
        }
        else if(this.estadoObra === 'ACC') {
          this.estadoObra = 'Acciones / Gastos Operativos en Proceso';
        }
        else if(this.estadoObra === 'ACCT') {
          this.estadoObra = 'Acciones / Gastos Operativos Terminadas';
        }




      }
    });
  }

  currentIndex: number = 0;
  isBlue: boolean = false;


  siguienteLi() {
    this.currentIndex += 1;
    this.isBlue = true; // Cambiamos el valor a true para cambiar el color


  }

  anteriorLi() {
    this.currentIndex -= 1;
    this.isBlue = false;

  }

  botonesOL(index: number) {
    this.currentIndex = index;
  }



  cerrarModal() {
      this.apiService.hideModal()
      this.currentIndex = 0;
  }



}
