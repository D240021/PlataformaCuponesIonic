import { Component, OnInit } from '@angular/core';
import { CarritoComprasService } from '../services/carritoCompras/carrito-compras.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpresionesRegularesService } from '../services/expresionesRegulares/expresiones-regulares.service';
import { AlertaService } from '../services/alerta/alerta.service';
import { CompraService } from '../services/compra/compra.service';
import { EncriptacionService } from '../services/encriptacionAES/encriptacion.service';
import { CorreoService } from '../services/correo/correo.service';
@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  cupones: any[] = [];
  pagoForm: FormGroup;
  constructor
    (
      public carrito: CarritoComprasService,
      private router: Router,
      private formBuilder: FormBuilder,
      private alerta: AlertaService,
      private compra: CompraService,
      private encriptacion: EncriptacionService,
      private correo: CorreoService
    ) {
    this.pagoForm = this.formBuilder.group({
      titularTarjeta: ['', [Validators.required, ExpresionesRegularesService.nombreEsValido]],
      numTarjeta: ['', [Validators.required, ExpresionesRegularesService.validarTarjeta]],
      fechaVencimiento: ['', [Validators.required, ExpresionesRegularesService.fechaExpiracionValida]],
      cvv: ['', [Validators.required, ExpresionesRegularesService.CVVEsValido]]
    });
  }

  ngOnInit() {
  }

  onPago() {
    if (this.pagoForm.valid) {
      this.obtenerInfoCuponesEnCompra();
      let usuarioLoginString = localStorage.getItem("usuarioLogin");
      if (usuarioLoginString) {
        let usuarioLogin = JSON.parse(usuarioLoginString);
        let tarjetaEncriptada = this.encriptacion.encriptarDatos(this.pagoForm.get("numTarjeta")?.value);
        let compraABD = {
          numTarjeta: tarjetaEncriptada,
          fecha: this.compra.obtenerFechaCompra(),
          precioTotal: this.carrito.calcularTotal(),
          usuarioID: usuarioLogin.id,
          cupones: []
        }
        let compraACorreo = {
          numTarjeta: this.pagoForm.get("numTarjeta")?.value,
          fecha: this.compra.obtenerFechaCompra(),
          precioTotal: this.carrito.calcularTotal(),
          usuarioID: usuarioLogin.id,
          cupones: this.carrito.carritoCompras
        }
        this.compra.registrarCompra(compraABD).subscribe(response => {
          this.compra.registrarCuponesEnCompra();
          this.router.navigate(['/home']);
          this.alerta.mostrarAlerta("Pago exitoso!", "Su compra ha sido procesada. Recibirá un correo con los detalles");
          this.correo.enviarCorreo(compraACorreo);
        }, error => {
          this.alerta.mostrarAlerta("Error!", error);
        });


      } else {
        this.alerta.mostrarAlerta("Error", "No se pudo obtener la información del usuario.");
      }
    } else {
      this.alerta.mostrarAlerta("Valores inválidos", "Por favor, intentelo de nuevo");
    }
  }


  volverAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  obtenerInfoCuponesEnCompra() {

    this.carrito.carritoCompras.forEach(cupon => {

      var cuponAux = {
        id: cupon.idCupon,
        compraID: 1
      };

      this.cupones.push(cuponAux);
    });

  }

}
