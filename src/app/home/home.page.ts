import { Component, OnInit } from '@angular/core';
import { CuponService } from '../services/cupon/cupon.service';
import { CarritoComprasService } from '../services/carritoCompras/carrito-compras.service';
import { MenuController } from '@ionic/angular';
import { AplicarPorcentajesService } from '../services/aplicarPorcentajes/aplicar-porcentajes.service';
import { CategoriasService } from '../services/categorias/categorias.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  cuponPorID: any;
  cuponesTodos: any[] = [];
  cuponesAuxFiltrado: any[] = [];
  categoriaSeleccionada: string = 'Todos';
  textoBusqueda: string = ''; 
  descuento: any;
  categoriasTodas: any[] = [];

  constructor(
    private cuponService: CuponService, 
    private menu: MenuController, 
    public aplicarPorcentajes: AplicarPorcentajesService,
    public carritoCompras: CarritoComprasService,
    public categorias: CategoriasService
  ) { 
    this.descuento = aplicarPorcentajes;
  }

  ngOnInit() {
    this.obtenerTodosCupones();
    this.categoriasTodas = this.categorias.obtenerTodasCategorias();
  }

  obtenerTodosCupones() {
    this.cuponService.obtenerTodosCupones().subscribe(response => {
      this.cuponesTodos = response;
      this.aplicarFiltros();
    });
  }

  obtenerCuponPorID(id: number) {
    this.cuponService.obtenerCuponPorID(1).subscribe(response => {
      this.cuponPorID = response;
    });
  }

  filtrarCupones(event: any) {
    this.categoriaSeleccionada = event.detail.value;
    this.aplicarFiltros();
  }

  filtrarCuponesPorBusqueda(event: any) {
    this.textoBusqueda = event.target.value.toLowerCase();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.cuponesAuxFiltrado = this.cuponesTodos.filter(cupon => {
      const coincideCategoria = this.categoriaSeleccionada === 'Todos' || cupon.categoria.nombreCategoria === this.categoriaSeleccionada;
      const coincideBusqueda = this.textoBusqueda === '' || 
        cupon.nombreCupon.toLowerCase().includes(this.textoBusqueda) ||
        cupon.codigo.toLowerCase().includes(this.textoBusqueda) ||
        cupon.categoria.nombreCategoria.toLowerCase().includes(this.textoBusqueda) ||
        cupon.empresa.nombreEmpresa.toLowerCase().includes(this.textoBusqueda)  ||  
        cupon.precio.toString().includes(this.textoBusqueda);

      return coincideCategoria && coincideBusqueda;
    });
  }

  onClick() {
    this.menu.toggle();
  }

  agregarCuponCarrito(cupon: any) {
    this.carritoCompras.agregarCuponCarrito(cupon);
  }
}
