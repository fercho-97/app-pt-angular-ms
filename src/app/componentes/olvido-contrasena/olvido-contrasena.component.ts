import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-olvido-contrasena',
  standalone: false,
  templateUrl: './olvido-contrasena.component.html',
  styleUrl: './olvido-contrasena.component.css'
})
export class OlvidoContrasenaComponent {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioS: UsuarioService,
    private cdr: ChangeDetectorRef,

  ) {
    this.formulario.setValue({
      correo: '',
    });
  }

  correo = new FormControl('', Validators.email);

  formulario = new FormGroup({
    correo: this.correo,
  })

  ValidarCorreoPassword(form: any) {

    this.usuarioS.recuperarCuenta(form.value.correo).subscribe(res => {
      this.toastr.success('Correo enviado ', '', {
        timeOut: 6000,
      })
      this.router.navigate(['/login']);

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
