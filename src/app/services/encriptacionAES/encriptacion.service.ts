import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {
  private secretKey = 'my-secret-key'; // Cambia esto por una clave más segura

  constructor() {}

  encriptarDatos(datos: string): string {
    const encrypted = CryptoJS.AES.encrypt(datos, this.secretKey).toString();
    return encrypted;
  }

  desencriptarDatos(datosEncriptados: string): string {
    const bytes = CryptoJS.AES.decrypt(datosEncriptados, this.secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}
