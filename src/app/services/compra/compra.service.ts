import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoComprasService } from '../carritoCompras/carrito-compras.service';
import { CuponService } from '../cupon/cupon.service';

interface Cupon {

  id: number,
  compraID: number

}

interface Compra {

  id: number,
  numTarjeta: string,
  precioTotal: number,
  usuarioID: number,
  cupones: Cupon[]

}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:5161/api/Compra';
  constructor
    (
      private http: HttpClient,
      private carrito: CarritoComprasService,
      private cupon: CuponService
    ) { }

  registrarCompra(compra: any): Observable<any> {
    return this.http.post(this.apiUrl, compra);
  }


  obtenerComprasPorIDUsuario(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  obtenerUltimaCompra(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ultimaCompra`);
  }

  async registrarCuponesEnCompra() {

    this.obtenerUltimaCompra().subscribe(ultimaCompra => {
      this.carrito.carritoCompras.forEach(cupon => {

        var cuponComprado = {
          id: 0,
          idRepetible: cupon.idCupon,
          compraID: ultimaCompra.id
        };

        this.cupon.registrarCupon(cuponComprado).subscribe(response => {

        });

      });
    });

  }

  obtenerFechaCompra(){

    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('es-ES', { month: 'long' });
    const año = fecha.getFullYear();

    return `${dia} de ${mes} del ${año}`;

  }

}
