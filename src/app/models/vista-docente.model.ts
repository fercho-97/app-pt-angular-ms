export interface VistaDocente {
    idDocente: number;
    idUsuario: number;
    nombres: string;
    apellidos: string;
    cedula: string;
    celular: string;
    correo: string;
    correoValido: boolean;
    facultad: string;
    fechaCreacion: string; // o Date
    docenteActivo: boolean;
}
