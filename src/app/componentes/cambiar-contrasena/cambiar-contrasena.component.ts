import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: false,
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioS: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {
    this.formulario.setValue({
      password: '',
      newPassword: '',
      confirmNewPassword: '',

    });
  }

  password = new FormControl('', Validators.required);
  newPassword = new FormControl('', Validators.required);
  confirmNewPassword = new FormControl('', Validators.required);

  formulario = new FormGroup({
    password: this.password,
    newPassword: this.newPassword,
    confirmNewPassword: this.confirmNewPassword,
  })

  CambiarContrasenia(form: any) {
    console.log(" contrasena-----------r ", form.value.password);
    
    this.usuarioS.actualizarContrasena(localStorage.getItem("correo")!, form.value.password, form.value.newPassword).subscribe(res => {
      this.toastr.success('Contrasena actualizada ', '', {
        timeOut: 6000,
      })
      this.router.navigate(['/login'], { relativeTo: this.route, skipLocationChange: false });
    }, error => {
      console.log(" ver el error ", error);
      return this.toastr.error("error")
    })
      
  }

  mostrarErrorConfirmacion: boolean = true;
  verificarConfirmacion(contrasenaConfirmada: any) {
    console.log("ver con confir: ", contrasenaConfirmada.value)
    if (contrasenaConfirmada.value == this.newPassword.value) {
      this.mostrarErrorConfirmacion = false
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      this.cdr.detectChanges();  
    } else {
      this.mostrarErrorConfirmacion = true
      console.log("mostrarErrorConfirmacion ", this.mostrarErrorConfirmacion)
      contrasenaConfirmada?.setErrors({ noCoinciden: true });  
      this.cdr.detectChanges();  
    }

  }


}
