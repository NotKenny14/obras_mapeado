import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/apiData.service';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{


  constructor( public apiService: ApiService ) { }
  ngOnInit(): void {
  }

  cerrarModal() {
      this.apiService.hideModal()
  }

}
