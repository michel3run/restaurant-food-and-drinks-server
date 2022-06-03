import { Component, OnInit } from '@angular/core';
import { MenuService } from './service/menu/menu.service';
import { Router } from '@angular/router';
import { CookiesService } from './service/cookie/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  {
  public appPages = [
    { title: 'Pedidos', url: 'pedidos', icon: 'list-outline' },
    { title: 'Productos', url: 'productos', icon: 'fast-food-outline' }
  ];
  constructor(private cookieService: CookiesService,private router: Router,private menu :MenuService,) {
  }
  
  signOff() {
    this.cookieService.removeAll()
    this.menu.showMenu = false;
    this.router.navigateByUrl('iniciar')
  }
  
  



}
