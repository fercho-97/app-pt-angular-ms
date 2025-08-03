export interface RegistroRequest {
    primerNombre: string | null;
    segundoNombre: string | null;
    primerApellido: string | null;
    segundoApellido: string | null;
    cedula: string | null;
    celular: string | null;
    correo: string | null;
    password: string | null;
    fechaRegistro: Date | null;
    idCarrera: number | null;
    idFacultad: number | null;
    tipoUsuario: string | null;
}