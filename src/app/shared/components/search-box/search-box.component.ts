import { Component } from '@angular/core';
import { ApiService } from '../../service/apiData.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  constructor(private apiService:ApiService) {}

  prueba(term:string) {
    console.log(term)
    this.apiService.searchTerm(term)
  }

}
