import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AplicarPorcentajesService {

  constructor() { }


  aplicarDescuento(precioOriginal: number, porcentajeDescuento: number): number {
    const descuento = precioOriginal * (porcentajeDescuento / 100);
    const precioConDescuento = precioOriginal - descuento;
    return precioConDescuento;
  }
}
