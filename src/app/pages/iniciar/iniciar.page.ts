import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookiesService } from 'src/app/service/cookie/cookies.service';
import { MenuService } from 'src/app/service/menu/menu.service';
import { ApiService } from '../../service/api/api.service';
import * as JsHashes  from 'jshashes';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  constructor(private router: Router, private api: ApiService, private menu: MenuService , private toastController: ToastController ) {
  }

  ngOnInit() {

  }
  // error por introducir mal las credenciales
  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Error el usuario o contraseña son incorrectos.',
      duration: 2000
    });
    toast.present();
  }
//Funcion login funciona como el cliente
  login() {

    const email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    password = this.getMD5(password)
    this.api.login(email, password).subscribe((data => {
      console.log(data)
      if (data.length == 1) {
        this.menu.showMenu = !this.menu.showMenu

        this.menu.userID =data[0].id

        this.router.navigateByUrl("pedidos")
      } else {
        this.errorToast()
      }
    }))
    

  }
  //Pasar a md5
  getMD5(value: string): string {
    const hash =  new JsHashes.MD5;
    return hash.hex(value);
 }

}
