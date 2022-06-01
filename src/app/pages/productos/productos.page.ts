import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';
import { MenuService } from 'src/app/service/menu/menu.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos = []
  disponibles = []
  constructor(private menu: MenuService, private api: ApiService) {
  }
/*
var disponible = document.getElementById(String(item.id)) as HTMLIonToggleElement
          console.log(disponible.checked.valueOf())
*/
  ngOnInit() {
    this.menu.showMenu = true
    this.api.getProductAll().subscribe((data) => {
      for (let item of data) {
        this.productos.push(item.nombre);
        if(item.diponible=="1"){
          this.disponibles.push(true)

        }else{
          this.disponibles.push(false)
        }
        

      }

    
    })
   
  }

  changeTest(i:string){
    console.log(Number(i+1))
  }

}
