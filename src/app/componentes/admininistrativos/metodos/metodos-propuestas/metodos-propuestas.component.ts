import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { VistasService } from 'src/app/servicios/vistas/vistas.service';

@Component({
  selector: 'app-metodos-propuestas',
  standalone: false,
  templateUrl: './metodos-propuestas.component.html',
  styleUrl: './metodos-propuestas.component.css'
})
export class MetodosPropuestasComponent implements OnInit {

  observacion = new FormControl('', [
    Validators.maxLength(2000)
  ])

  observacionN = new FormControl('', [
    Validators.required,
    Validators.maxLength(2000)
  ])
  secretaria = new FormControl('', Validators.required);

  formulario = new FormGroup({
    observacion: this.observacion,
    secretaria: this.secretaria

  })

  formularioN = new FormGroup({
    observacionN: this.observacionN,
  })

  constructor(
    public ventana: MatDialogRef<MetodosPropuestasComponent>,
    private vistaS: VistasService,

    @Inject(MAT_DIALOG_DATA) public datos: any
  ) {

    this.formulario.setValue({
      observacion: '',
      secretaria: ''
    });
  }


  no_validar: boolean = false;
  validar = false;

  ngOnInit(): void {
    this.validar = this.datos.validar;
    this.no_validar = this.datos.no_validar;
    this.ObtenerSecretarias();
  }

  CerrarVentana(): void {
    this.ventana.close({ confirmado: false });
  }

  Confirmar(): void {
    if (this.validar == true) {
      this.ventana.close({ confirmado: true, valor: true, observacion: this.observacion.value, secretaria: this.secretaria.value });
    } else {
      this.ventana.close({ confirmado: true, valor: true, observacion: this.observacionN.value, secretaria: this.secretaria.value });
    }
  }

  secretarias: any = [];
  ObtenerSecretarias() {
    this.vistaS.buscarSecretariaPorEstado(true).subscribe((secretarias: any) => {
      console.log("ver secretarias: ", secretarias)
      this.secretarias = secretarias;
    }, error => {
      this.secretarias = [];
    })
  }



}
