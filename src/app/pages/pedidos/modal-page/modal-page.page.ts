import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  pedido=[]
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getTicket(29).subscribe((data)=>{
      for(let item of data){
        this.pedido.push(item.nombre)
      }

    })
  }

}
