import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from '../services/alerta/alerta.service';
import { UsuarioService } from '../services/usuario/usuario.service';
import { ExpresionesRegularesService } from '../services/expresionesRegulares/expresiones-regulares.service';
import { EncriptacionService } from '../services/encriptacionAES/encriptacion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  constructor(
    private menu: MenuController,
    private fb: FormBuilder,
    private alerta: AlertaService,
    private usuarioService: UsuarioService,
    private encriptacion : EncriptacionService
  ) {
    this.registroForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(3)]],
      cedula: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), ExpresionesRegularesService.esFuerte]], // Mover esFuerte al segundo argumento
    });
  }

  ngOnInit() { }

  onClick() {
    this.menu.toggle();
  }

  onRegister() {
    const usuario = {
      id: 0,
      nombre: this.registroForm.get("nombre")?.value,
      cedula: this.registroForm.get("cedula")?.value,
      apellidos: this.registroForm.get("apellidos")?.value,
      fechaNacimiento: this.registroForm.get("fechaNacimiento")?.value,
      correo: this.registroForm.get("correo")?.value,
      contrasenia:  this.encriptacion.encriptarDatos(this.registroForm.get("contrasenia")?.value)
    };

    if (usuario) {
      this.usuarioService.registrarUsuario(usuario).subscribe(response => {
        this.alerta.mostrarAlerta("Usuario registrado!", "");
        this.registroForm.reset();
      }, error => {
        this.alerta.mostrarAlerta("Error!", error);
      });
    } else {
      this.alerta.mostrarAlerta("Valores inválidos", "");
    }
  }



  onDateChange(event: any) {
    const date = event.detail.value;
    this.registroForm.patchValue({ fechaNacimiento: date });
  }
}
