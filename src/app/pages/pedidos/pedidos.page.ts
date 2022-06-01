import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos=[]
  constructor(private menu: MenuService, private api: ApiService) {
    this.menu.showMenu=true
   }

  ngOnInit() {
    this.api.getOrderPay("pagado").subscribe((data)=>{
      for(let item of data){
        
        this.pedidos.push("#"+item.id)
      
      }

    })
  }

}
