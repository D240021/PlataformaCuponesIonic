import { Injectable } from '@angular/core';
import { EncriptacionService } from '../encriptacionAES/encriptacion.service';
import { AlertaService } from '../alerta/alerta.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private encriptacion: EncriptacionService, private alerta: AlertaService) { }


  verificarUsuario(usuarioIngresado: any, usuariosTodos: any[]) {

    const usuarioEncontrado = usuariosTodos.find(usuario => {
      try {
        const contraDesencriptada = this.encriptacion.desencriptarDatos(usuario.contrasenia);
        localStorage.setItem("usuarioLogin", JSON.stringify(usuario));
        localStorage.setItem("logeado", "true");
        return usuarioIngresado.correo === usuario.correo && usuarioIngresado.contrasenia === contraDesencriptada;
      } catch (error) {
        console.error('Error desencriptando contraseña para el usuario:', usuario, error);
        return false;
      }
    })

    return usuarioEncontrado ? usuarioEncontrado : false;
  }

  usuarioLogeado() {
    return localStorage.getItem("logeado") === "true";
  }

  obtenerUsuarioLogeado() {
    const usuarioLogin = localStorage.getItem("usuarioLogin");
    if (usuarioLogin) {
      return JSON.parse(usuarioLogin);
    }
    return null; 
  }

  cerrarSesion() {
    localStorage.removeItem("usuarioLogin");
    localStorage.setItem("logeado", "false");
    this.alerta.mostrarAlerta("Cerraste sesión!", "Cerraste sesión correctamente!");
  }

}
