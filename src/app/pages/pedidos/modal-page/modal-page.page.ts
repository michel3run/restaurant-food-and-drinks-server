import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  pedido = []

  constructor(private api: ApiService,private menu : MenuService) { }

  ngOnInit() {
    this.api.getTicket(29).subscribe((data) => {
      for (let item of data) {
        this.pedido.push(item.nombre);
      }

      const resultado = {}
      this.pedido.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
      this.pedido=[]
      let claves = Object.keys(resultado); 
      for(let item of claves){
        this.pedido.push(item)
      }
      console.log(this.pedido)
      for (let i = 0; i < claves.length; i++) {
        let clave = claves[i];
        this.pedido[i]= this.pedido[i] + " x "+resultado[clave] 
      }

    })
  }

  cerrar(){

  }
  entregado(){
    console.log(this.menu.pedidoID)
    this.api.postEntregado("entregado",this.menu.pedidoID).subscribe()
    window.location.reload()
  }
}
