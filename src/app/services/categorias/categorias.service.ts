import { Injectable } from '@angular/core';
import { CuponService } from '../cupon/cupon.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private cuponService: CuponService) { }

  obtenerTodasCategorias(): string[] {

    var cupones: any[] = [];
    this.cuponService.obtenerTodosCupones().subscribe(response => {
      response.forEach(cupon => {
        cupones.push(cupon.categoria.nombreCategoria);
      });
      cupones.push("Todos");
    });
    return cupones;
  }
}
