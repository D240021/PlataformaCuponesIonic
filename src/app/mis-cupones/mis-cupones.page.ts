import { Component, OnInit } from '@angular/core';
import { CompraService } from '../services/compra/compra.service';
import { MisCuponesService } from '../services/misCupones/mis-cupones.service';
import { MenuController } from '@ionic/angular';
import { AplicarPorcentajesService } from '../services/aplicarPorcentajes/aplicar-porcentajes.service';

@Component({
  selector: 'app-mis-cupones',
  templateUrl: './mis-cupones.page.html',
  styleUrls: ['./mis-cupones.page.scss'],
})
export class MisCuponesPage implements OnInit {

  constructor
  (
    private compraService : CompraService,
    public misCuponesService : MisCuponesService,
    private menu: MenuController,
    public descuento: AplicarPorcentajesService
  ) { }

  ngOnInit() {
    this.misCuponesService.obtenerInfoCompletaCompra();
    console.log(this.misCuponesService.comprasPorUsuario);
  }

  onClick() {
    this.menu.toggle();
  }

}
