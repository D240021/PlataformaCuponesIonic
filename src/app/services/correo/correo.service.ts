import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private serviceID: string = 'service_84qdazu';
  private templateID: string = 'template_3nmnw0p';
  private userID: string = 'XUyBC_SC32W8F5jkY';

  constructor(private login: LoginService) { }

  public sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, templateParams, this.userID);
  }



  enviarCorreo(cuerpo: any) {

    let cuerpoProcesado = this.darFormatoACuerpo(cuerpo);

    let usuario = this.login.obtenerUsuarioLogeado();
    const templateParams = {
      cuerpo: cuerpoProcesado,
      destinatario: usuario.correo
    };

    this.sendEmail(templateParams)
      .then((response: EmailJSResponseStatus) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  }

  darFormatoACuerpo(compra: any): string {
    const numTarjeta = compra.numTarjeta;
    const numTarjetaEnmascarada = numTarjeta.slice(0, -4).replace(/./g, '*') + numTarjeta.slice(-4);
    console.log(compra);
  
    let nombreCupones = "";
    compra.cupones.forEach((cupon: any) => {
      nombreCupones += cupon.nombreCupon + "\n";
    });
  
    let cuerpo = 
    `Numero de tarjeta asociada a la compra: ${numTarjetaEnmascarada}
     Fecha de compra: ${compra.fecha}
     Pago total: ₡${compra.precioTotal}
     Cupones: ${nombreCupones}`;
  
    return cuerpo;
  }
}
