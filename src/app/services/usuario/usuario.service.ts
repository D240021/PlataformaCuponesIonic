import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUsuario = 'http://localhost:5161/api/Usuario';

  constructor(private http : HttpClient) { }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUsuario, usuario);
  }

  obtenerTodosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUsuario);
  }
}
