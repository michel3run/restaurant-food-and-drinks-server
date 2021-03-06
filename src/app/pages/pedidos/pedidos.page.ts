import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPagePage } from './modal-page/modal-page.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  pedidos=[]
  constructor(private menu: MenuService, private api: ApiService,private modalController: ModalController,private routerOutlet: IonRouterOutlet) {
    this.menu.showMenu=true
   }
   async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage,
     // cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
  // Al inicaira el pedido rellenamos pedidos para mostrarle al usuario
  ngOnInit() {
    this.rellenarPedido()
    this.pedidos=this.pedidos.sort()
  }
//Buscamos los pedidos pagados
  rellenarPedido(){
    this.api.getOrderPay("pagado").subscribe((data)=>{
      for(let item of data){
        
         this.api.getUserOrder(item.id).subscribe((data)=>{
             for(let user of data){
               if(this.pedidos.length==0){
                 this.pedidos.push("#"+item.id + ` ${user.email}` )
               }else{
                 this.pedidos.push("#"+item.id + ` ${user.email}` )
               }
             }
           
 
         })
 
       
       }
    })

  }
//ordenamos los pedidos
  order(id:string){
    let pedidoID = document.getElementById(id).textContent
    pedidoID=pedidoID.substring(pedidoID.indexOf("#")+1,pedidoID.indexOf(" ",1))
    this.menu.pedidoID=Number(pedidoID)
    this.presentModal()
  }
//Funcion cuando arrastramos y refrescamos
  doRefresh(event) {
    console.log('Begin async operation');
    this.pedidos=[]
 
    setTimeout(() => {
      console.log('Async operation has ended');
      this.rellenarPedido()
      this.pedidos=this.pedidos.sort()
      event.target.complete();
    }, 2000);
  }
  
}
