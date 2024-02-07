import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddorcamentoPageRoutingModule } from './addorcamento-routing.module';

import { AddorcamentoPage } from './addorcamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddorcamentoPageRoutingModule
  ],
  declarations: [AddorcamentoPage]
})
export class AddorcamentoPageModule {}
