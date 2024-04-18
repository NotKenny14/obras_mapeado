import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './components/mapa/mapa.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    MapaComponent,
    SidebarComponent,
    InicioPageComponent,
    TarjetaComponent,
    ModalComponent
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
