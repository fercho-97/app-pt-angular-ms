import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
@Component({
  selector: 'app-password-docente',
  standalone: false,
  templateUrl: './password-docente.component.html',
  styleUrl: './password-docente.component.css'
})
export class PasswordDocenteComponent {

  token: string = '';

  ngOnInit(): void {
    const fullUrl = window.location.href;
    this.token = fullUrl.split('/password-docente/')[1];
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

  ValidarCorreoPassword(form: any) {
    console.log(" contrasena-----------r ", form.value.password);
    this.usuarioS.validarCorreo(this.token, form.value.password).subscribe(res => {
      this.toastr.success('Contrasena registrada ', '', {
        timeOut: 6000,
      })
      this.router.navigate(['/login'], { relativeTo: this.route, skipLocationChange: false });
    }, error => {
      console.log(" ver el error ", error);
      console.error('Error al enviar la propuesta', error);
      let errorMessage = 'Error desconocido';
      if (typeof error.error === 'string') {
        try {
          // Parsea el JSON stringificado para convertirlo en objeto
          const parsed = JSON.parse(error.error);
          // parsed.error es el campo “error” con tu mensaje
          errorMessage = parsed.error || errorMessage;
        } catch (e) {
          // Si no es JSON válido, muestra el string crudo
          errorMessage = error.error;
        }
      } else if (error.error && typeof error.error === 'object') {
        // En caso de que el backend ya lo devolviera como objeto
        errorMessage = error.error.error || errorMessage;
      }
      this.router.navigate(['/login']);

      return this.toastr.error(errorMessage)

    })
  }

}