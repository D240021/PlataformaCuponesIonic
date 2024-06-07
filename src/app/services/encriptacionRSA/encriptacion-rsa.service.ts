import { Injectable } from '@angular/core';
import * as NodeRSA from 'node-rsa';
@Injectable({
  providedIn: 'root'
})
export class EncriptacionRSAService {
  // private key: NodeRSA;

  constructor() { 
    // this.key = new NodeRSA({ b: 512 }); 
  }

  // generarLlaves(): { publicKey: string, privateKey: string } {
  //   const publicKey = this.key.exportKey('public');
  //   const privateKey = this.key.exportKey('private');
  //   return { publicKey, privateKey };
  // }

  

  // encriptar(data: string, publicKey: string): string {
  //   const key = new NodeRSA(publicKey, 'public');
  //   return key.encrypt(data, 'base64');
  // }

  // desencriptar(encryptedData: string, privateKey: string): string {
  //   const key = new NodeRSA(privateKey, 'private');
  //   return key.decrypt(encryptedData, 'utf8');
  // }

}
