import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlPaginasService {

  constructor() { }


  recargarFormulario(formulario : FormGroup){
    formulario.reset();
  }
}
