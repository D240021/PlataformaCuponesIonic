import { Injectable } from '@angular/core';
import { CuponService } from '../cupon/cupon.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private cuponService: CuponService) { }

  obtenerTodasCategorias(): string[] {
    var cupones: any[] = [];
    var categoriasSet: Set<string> = new Set();
  
    this.cuponService.obtenerTodosCupones().subscribe(response => {
      response.forEach(cupon => {
        if (!categoriasSet.has(cupon.categoria.nombreCategoria)) {
          categoriasSet.add(cupon.categoria.nombreCategoria);
          cupones.push(cupon.categoria.nombreCategoria);
        }
      });
      cupones.push("Todos");
    });
  
    return cupones;
  }
  
}
