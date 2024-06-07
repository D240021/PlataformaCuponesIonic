import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { MisCuponesService } from 'src/app/services/misCupones/mis-cupones.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor
  (
    public login: LoginService,
    private router: Router,
    public misCupones : MisCuponesService
  ) { }

  ngOnInit() { }


  esPaginaActual(nombrePagina: string): boolean {

    const urlActual = this.router.url;
    const nombrePaginaActual = urlActual.split('/')[1];

    return nombrePagina == nombrePaginaActual;
  }
}
