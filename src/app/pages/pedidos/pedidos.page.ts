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
  ngOnInit() {
    this.api.getOrderPay("pagado").subscribe((data)=>{
      for(let item of data){
        
        this.pedidos.push("#"+item.id)
      
      }

    })
  }
  order(){
    console.log("adsf")
    this.presentModal()
  }
}
