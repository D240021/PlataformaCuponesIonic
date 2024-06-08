import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { LoginService } from '../services/login/login.service';
import { AlertaService } from '../services/alerta/alerta.service';
import { Router } from '@angular/router';
import { ControlPaginasService } from '../services/controlPaginas/control-paginas.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;
  usuariosTodos: any[] = [];

  constructor(
    private menu: MenuController,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private alerta: AlertaService,
    private login: LoginService,
    private router: Router,
    public controlPaginas : ControlPaginasService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.obtenerTodosUsuarios();
    
  }

  obtenerTodosUsuarios() {
    this.usuarioService.obtenerTodosUsuarios().subscribe(response => {
      this.usuariosTodos = response;
    });
  }

  onClick() {
    this.menu.toggle();
  }

  

  onLogin() {
    if (this.loginForm.valid) {

      const usuarioIngresado = {
        correo: this.loginForm.get("correo")?.value,
        contrasenia: this.loginForm.get("contrasenia")?.value
      };

      if (this.login.verificarUsuario(usuarioIngresado, this.usuariosTodos)) {
        this.alerta.mostrarAlerta("Inicio exitoso!", "Usted ha iniciado correctamente");
        localStorage.setItem("logeado", "true");
        this.router.navigate(['/home']);
      } else {
        this.alerta.mostrarAlerta("Usuario no encontrado!", "Verifique sus datos o registrese");
      }
    } else {
      this.alerta.mostrarAlerta("Inicio de sesión inválido!", "Verifique sus datos");
    }
  }
}
