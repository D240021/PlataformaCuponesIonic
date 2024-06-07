import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AlertaService } from '../alerta/alerta.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  public carritoCompras: any[] = [];
  constructor
    (
      private login: LoginService,
      private router: Router,
      private alerta: AlertaService
    ) {
    const carritosLocal = localStorage.getItem("carrito");
    if (carritosLocal) {
      this.carritoCompras = JSON.parse(carritosLocal);
    }
  }

  vaciarCarrito() {
    this.carritoCompras = [];
    localStorage.removeItem("carrito");
    window.location.reload();
  }

  eliminarCuponCarrito(cupon: any) {
    this.carritoCompras = this.carritoCompras.filter(cuponArreglo => {
      return cuponArreglo.idEnCarrito !== cupon.idEnCarrito;
    });
    this.actualizarLocalStorage();
  }

  agregarCuponCarrito(cupon: any) {
    const nuevoCupon = { ...cupon, idEnCarrito: Math.floor(Date.now() + Math.random() * 1000) };
    this.carritoCompras.push(nuevoCupon);
    this.actualizarLocalStorage();
  }

  actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(this.carritoCompras));
  }

  calcularSubtotal(): number {
    let subTotal = 0;
    if (this.carritoCompras) {
      this.carritoCompras.forEach(cupon => {
        subTotal += parseFloat(cupon.precio);
      });
    }

    subTotal = parseFloat(subTotal.toFixed(2));

    return subTotal;
  }

  calcularTotal(): number {
    let subTotal = this.calcularSubtotal();
    let total = subTotal * 1.13;
    total = parseFloat(total.toFixed(2));
    return total;
  }

  realizarPago() {

    if (this.carritoCompras.length > 0) {
      if (this.login.usuarioLogeado()) {
        this.router.navigate(['/pago']);
      } else {
        this.router.navigate(['/inicio-sesion']);
      }
    } else {
      this.alerta.mostrarAlerta("Carrito vacío!", "Agrega productos para continuar");
    }

  }

  



}
