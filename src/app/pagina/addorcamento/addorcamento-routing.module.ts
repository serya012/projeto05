import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddorcamentoPage } from './addorcamento.page';

const routes: Routes = [
  {
    path: '',
    component: AddorcamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddorcamentoPageRoutingModule {}
