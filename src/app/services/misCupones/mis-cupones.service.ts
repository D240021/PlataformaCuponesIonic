import { Injectable, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { CompraService } from '../compra/compra.service';
import { CarritoComprasService } from '../carritoCompras/carrito-compras.service';
import { CuponService } from '../cupon/cupon.service';

@Injectable({
  providedIn: 'root'
})
export class MisCuponesService implements OnInit {

  comprasPorUsuario: any[] = [];

  constructor
    (
      public login: LoginService,
      private router: Router,
      private compraService: CompraService,
      private carrito: CarritoComprasService,
      private cuponService: CuponService
    ) { }

  ngOnInit() {
  }

  verificarInicioSesion() {
    if (this.login.usuarioLogeado()) {
      this.router.navigate(['/mis-cupones']);
    } else {
      this.router.navigate(['/inicio-sesion']);
    }
  }

  obtenerInfoCompletaCompra() {

    let usuario = this.login.obtenerUsuarioLogeado();
    if (usuario != null) {
      this.compraService.obtenerComprasPorIDUsuario(usuario.id).subscribe(response => {
        this.comprasPorUsuario = response;
        this.obtenerCuponesPorCompraUsuario();


      });
    }


  }

  obtenerCuponesPorCompraUsuario() {
    let cuponesPorCompra: any[] = [];

    this.comprasPorUsuario.forEach(compra => {
      compra.cupones = [];
      this.cuponService.obtenerCuponesPorCompraID(compra.id).subscribe(response => {
        cuponesPorCompra = response;
        
        cuponesPorCompra.forEach(cupon => {
          
          this.cuponService.obtenerCuponPorID(cupon.idRepetible).subscribe(response => {
            
            compra.cupones.push(response[0]);
          });

        });
        
      });
      
    });

  }


}