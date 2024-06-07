import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Cupon {

  idCupon: number,
  nombreCupon: string,
  codigo: string,
  precio: string,
  estado: string,
  imagen: string,
  categoria: Categoria,
  fecha_inicio: Date,
  fecha_vencimiento: Date,
  fecha_creacion: Date,
  empresa: Empresa,
  promociones: Promocion[]

}

interface Empresa {

  idEmpresa : number,
  nombreEmpresa: string,
  direccion: string,
  cedula: string,
  fecha_creacion: Date,
  correo: string,
  teléfono: string,
  imagen: string,
  isHabilitado: number


}

interface Categoria {

  idCategoria : number,
  nombreCategoria : string

}

interface Promocion {

  idPromocion: number,
  descripcion: string,
  fecha_inicio: Date,
  fecha_vencimiento: Date,
  descuento: number

}


@Injectable({
  providedIn: 'root'
})


export class CuponService {

  private apiUrl = 'http://localhost:5161/api/Cupon';

  constructor(private http: HttpClient) { }

  obtenerCuponPorID(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `/${id}`);
  }

  obtenerTodosCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.apiUrl);
  }

  registrarCupon(cupon: any): Observable<any> {
    return this.http.post(this.apiUrl, cupon);
  }

  obtenerCuponesPorCompraID(id : number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cuponesPorCompra/${id}`);
  }

}
