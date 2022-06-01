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

  ngOnInit() {
    this.menu.showMenu = true
    this.api.getProductAll().subscribe((data) => {
      for (let item of data) {
        this.productos.push(item.nombre);
        this.disponibles.push(item.diponible)
        if(item.diponible == true ){
          this.menu.ischeck = true
        }else{
          this.menu.ischeck=false
        }
      }
    })
  }

}
