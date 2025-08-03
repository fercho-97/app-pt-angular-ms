import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-restaurar-contrasena',
  standalone: false,
  templateUrl: './restaurar-contrasena.component.html',
  styleUrl: './restaurar-contrasena.component.css'
})
export class RestaurarContrasenaComponent {


  token: string = '';

  ngOnInit(): void {
    const fullUrl = window.location.href;
    this.token = fullUrl.split('/restaurar-contrasenia/')[1];
    console.log("ver token: ", this.token )
  }


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioS: UsuarioService
  ) {
    this.formulario.setValue({
      password: '',
    });
  }

  password = new FormControl('', Validators.required);
  formulario = new FormGroup({
    password: this.password,
  })

  RestaurarPassword(form: any) {
    console.log(" contrasena-----------r ", form.value.password);
    this.usuarioS.recuperarContrasena(form.value.password, this.token).subscribe(res => {
      this.toastr.success('Contrasena actualizada ', '', {
        timeOut: 6000,
      })
      this.router.navigate(['/login'], { relativeTo: this.route, skipLocationChange: false });
    }, error => {
      console.log(" ver el error ", error);
      console.error('Error al enviar la propuesta', error);
      let errorMessage = 'Error desconocido';
      if (typeof error.error === 'string') {
        try {
          const parsed = JSON.parse(error.error);
          errorMessage = parsed.error || errorMessage;
        } catch (e) {
          errorMessage = error.error;
        }
      } else if (error.error && typeof error.error === 'object') {
        errorMessage = error.error.error || errorMessage;
      }
      this.router.navigate(['/login']);

      return this.toastr.error(errorMessage)

    })
  }



}
