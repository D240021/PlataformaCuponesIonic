import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisCuponesPageRoutingModule } from './mis-cupones-routing.module';

import { MisCuponesPage } from './mis-cupones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisCuponesPageRoutingModule
  ],
  declarations: [MisCuponesPage]
})
export class MisCuponesPageModule {}
