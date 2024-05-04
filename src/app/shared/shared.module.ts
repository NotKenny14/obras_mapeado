import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './components/mapa/mapa.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ModalComponent } from './components/modal/modal.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';



@NgModule({
  declarations: [
    MapaComponent,
    SidebarComponent,
    InicioPageComponent,
    TarjetaComponent,
    ModalComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [

    InicioPageComponent
  ]
})
export class SharedModule { }
