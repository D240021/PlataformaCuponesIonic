import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ExpresionesRegularesService {

  constructor() { }

   

  static esFuerte(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

    if (!valid) {
      return {
        strong: true
      };
    }
    return null;
  }

  static fechaExpiracionValida(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const valid = /^\d{2}\/\d{2}$/.test(value);
    return valid ? null : { fechaExpiracionInvalida: true };
  }

  static CVVEsValido(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const valid = /^\d{3,4}$/.test(value);
    return valid ? null : { cvvInvalido: true };
  }

  static validarTarjeta(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const numTarjeta = value.replace(/\D/g, '');
    const reversedDigits = numTarjeta.split('').reverse().map((digit: string) => parseInt(digit, 10));
    const sum = reversedDigits.reduce((acc: number, digit: number, idx: number) => {
      if (idx % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      return acc + digit;
    }, 0);
    
    const valid = sum % 10 === 0;
    return valid ? null : { tarjetaInvalida: true };
  }

  static nombreEsValido(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value);
    return valid ? null : { nombreInvalido: true };
  }
}
