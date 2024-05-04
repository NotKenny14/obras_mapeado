import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../service/apiData.service';
import { SearchResponse } from '../../interface/interface';
import Swal from 'sweetalert2';
import { MapService } from '../../service/mapa-api.service';







@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  public isSidebarOpen: boolean = false;
  public mapas: SearchResponse[] = [];
  public mapa_general: boolean = false;
  public guarda2023:any [] = [];

  @Output() numObraChange = new EventEmitter<string>();


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isChecked = false;
  constructor(private apiService: ApiService, private mapService:MapService) { }



  @Output()


  searchBy2023() {
    const map = this.mapService.map;
    this.apiService.searchMapa2023().subscribe(
      (mapa : any) => {
        if (mapa['obras'].length < 1) {
          Swal.fire({
            title: 'No hay obras para este criterio',
            text: 'Por favor, intenta con otro criterio de búsqueda.',
            icon: 'warning'
          });
        } else {

          //this.pintarPuntos2(mapa)
          this.apiService.pintarPuntos(mapa)
          this.guarda2023 = mapa;
          console.log(this.guarda2023)

        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }




}
