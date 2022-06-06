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
        if(item.disponible=="1"){
          this.disponibles.push(true)

        }else{
          this.disponibles.push(false)
        }
        

      }

    
    })
   
  }
  //funcion cuando hacemos click le pasamos el id y le suammos 1 aparecen por orden de la bbdd
  changeTest(event:any,id:number){
    console.log(event.target.checked);
    console.log(id)  
    //cambiamso el campo de disponible del producto
    if(event.target.checked) {
      this.api.updateCheck("1",id +1).subscribe()
    } else{
      
      this.api.updateCheck("0",id +1 ).subscribe()
    }

  }

}
