import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CarritoComprasService } from '../services/carritoCompras/carrito-compras.service';
import { AplicarPorcentajesService } from '../services/aplicarPorcentajes/aplicar-porcentajes.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  descuento: string | any;
  cuponesCarrito: any[] = [];

  constructor(
    private menu: MenuController, 
    public carrito: CarritoComprasService,
    private aplicarPorcentajes: AplicarPorcentajesService

  ) { 
    this.descuento = aplicarPorcentajes;
  }

  ngOnInit() {
    this.cuponesCarrito = this.carrito.carritoCompras;
  }

  onClick() {
    this.menu.toggle();
  }

  agregarCupon(cupon: any) {
    this.carrito.agregarCuponCarrito(cupon);
    this.cuponesCarrito = this.carrito.carritoCompras;
  }

  eliminarCupon(cupon: any) {
    this.carrito.eliminarCuponCarrito(cupon);
    this.cuponesCarrito = this.carrito.carritoCompras;
  }

  
}
