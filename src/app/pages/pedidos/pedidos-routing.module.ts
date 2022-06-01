import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPage } from './pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  },
  {
    path: 'modal-page',
    loadChildren: () => import('./modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPageRoutingModule {}
