import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login/login.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-verificar-correo',
  standalone: false,
  templateUrl: './verificar-correo.component.html',
  styleUrl: './verificar-correo.component.css'
})
export class VerificarCorreoComponent {

  token: string = ''; // Recibe el token como parámetro de entrada
  verificado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usuarioS: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const fullUrl = window.location.href;
    this.token = fullUrl.split('/vista-verificacion-correo/')[1];
    console.log("full url............", fullUrl)
    console.log("Token recibido por Input:", this.token);
    this.ValidarCorreo()
  }

  ValidarCorreo() {
    this.usuarioS.validarCorreo(this.token, '-').subscribe(res => {
      console.log("res............", res)
      this.verificado = res
      console.log("ver this.verificado ", this.verificado)
    }, error => {
      this.verificado = false
      console.log("ver this.verificado ", this.verificado)
    });
  }

}
