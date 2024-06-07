import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisCuponesPage } from './mis-cupones.page';

const routes: Routes = [
  {
    path: '',
    component: MisCuponesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisCuponesPageRoutingModule {}
