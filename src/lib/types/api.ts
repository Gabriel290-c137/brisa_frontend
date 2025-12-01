// Interfaces TypeScript basadas en la API de BRISA Backend

// Esquelas
export interface CodigoEsquela {
  id_codigo: number;
  tipo: string;
  codigo: string;
  descripcion: string;
}

export interface EsquelaResponse {
  id_esquela: number;
  fecha: string;
  observaciones: string;
  codigos: CodigoEsquela[];
  estudiante?: {
    id_estudiante: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    ci: string;
  };
  curso?: {
    id_curso: number;
    nombre_curso: string;
    grado: string;
    paralelo: string;
  };
  profesor?: {
    id_persona: number;
    nombre_completo: string;
  };
}

export interface EsquelaCreate {
  id_estudiante: number;
  id_profesor?: number; // Opcional: solo para Regente/Administrativo
  fecha: string;
  observaciones: string;
  codigos: number[]; // IDs de códigos
}

// Códigos de Esquela
export interface CodigoEsquelaCreate {
  tipo: string;
  codigo: string;
  descripcion: string;
}

export interface CodigoEsquelaUpdate {
  tipo: string;
  codigo: string;
  descripcion: string;
}

// Tipos de códigos de esquela
export type TipoCodigoEsquela = 'reconocimiento' | 'orientacion';

// API Response generics
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  details?: any;
  status: number;
}

// Validation Error (from FastAPI)
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// Estudiantes
export interface Estudiante {
  id_estudiante: number;
  ci: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  direccion: string;
  nombre_completo: string;
}

// Profesores
export interface Profesor {
  id_persona: number;
  ci: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  direccion: string;
  telefono: string;
  correo: string;
  tipo_persona: string;
  nombre_completo: string;
}

// Registradores
export interface Registrador {
  id_persona: number;
  ci: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  direccion: string;
  telefono: string;
  correo: string;
  tipo_persona: string;
  nombre_completo: string;
}

// Autenticación
export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario_id: number;
  usuario: string;
  nombres: string;
  rol: string;
  permisos: string[];
  expires_in: number;
}

export interface Usuario {
  id_usuario: number;
  id_persona?: number;
  usuario: string;
  correo: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  ci: string;
  telefono?: string;
  direccion?: string;
  tipo_persona?: string;
  roles?: Rol[];
  permisos?: string[];
  estado?: string;
  is_active?: boolean;
}

export interface RegistroUsuarioRequest {
  ci: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  usuario: string;
  correo: string;
  password: string;
  telefono?: string;
  direccion?: string;
  tipo_persona: string;
  id_rol: number;
}

export interface Rol {
  id_rol: number;
  nombre: string;
  descripcion?: string;
  permisos?: Permiso[];
}

export interface Permiso {
  id_permiso: number;
  nombre: string;
  descripcion?: string;
  modulo?: string;
}

export interface StandardApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error_details?: any;
}

// ================================
// Tipos para Reportes de Estudiantes
// ================================

// Reporte: Listado de estudiantes
export interface EstudianteListadoItem {
  id_estudiante: number;
  ci: string;
  nombre_completo: string;
  fecha_nacimiento: string | null;
  edad: number | null;
  cursos: string[];
}

export interface EstudianteListadoDTO {
  total: number;
  curso: number | null;
  nivel: string | null;
  gestion: string | null;
  estudiantes: EstudianteListadoItem[];
}

// Reporte: Estudiantes con/sin apoderados
export interface ApoderadoInfo {
  tipo: 'padre' | 'madre';
  nombre_completo: string;
  telefono: string;
}

export interface EstudianteApoderadoItem {
  id_estudiante: number;
  nombre_completo: string;
  ci: string;
  apoderados: ApoderadoInfo[];
  tiene_apoderados: boolean;
}

export interface EstudiantesApoderadosResponseDTO {
  total: number;
  con_apoderados: number | null;
  estudiantes: EstudianteApoderadoItem[];
}

// Reporte: Contactos de apoderados
export interface ContactoApoderadoItem {
  id_estudiante: number;
  estudiante_nombre: string;
  estudiante_ci: string;
  tipo_apoderado: 'padre' | 'madre';
  apoderado_nombre: string;
  telefono: string;
}

export interface ContactosApoderadosResponseDTO {
  total: number;
  contactos: ContactoApoderadoItem[];
}

// Reporte: Distribución por edad
export interface RangoEdadItem {
  rango_edad: string;
  cantidad: number;
  porcentaje: number;
}

export interface DistribucionEdadResponseDTO {
  total_estudiantes: number;
  distribucion: RangoEdadItem[];
}

// Reporte: Historial de cursos
export interface CursoHistorialItem {
  id_curso: number;
  nombre_curso: string;
  nivel: string;
  gestion: string;
}

export interface EstudianteHistorialItem {
  id_estudiante: number;
  nombre_completo: string;
  ci: string;
  cursos: CursoHistorialItem[];
  total_cursos: number;
}

export interface HistorialCursosResponseDTO {
  total_estudiantes: number;
  historiales: EstudianteHistorialItem[];
}

// Reporte: Profesores Asignados
export interface ProfesorAsignadoDTO {
  id_profesor: number;
  ci: string;
  nombre_completo: string;
  telefono: string | null;
  correo: string | null;
  curso: string;
  materia: string;
}

export interface ProfesoresAsignadosResponseDTO {
  profesores: ProfesorAsignadoDTO[];
  total: number;
  curso: string | null;
  materia: string | null;
}

// Reporte: Materias por Nivel
export interface MateriaPorNivelDTO {
  id_materia: number;
  nombre_materia: string;
  nivel: string;
}

export interface MateriasPorNivelResponseDTO {
  materias: MateriaPorNivelDTO[];
  total: number;
  nivel: string | null;
}

// Reporte: Carga Académica
export interface AsignacionProfesorDTO {
  curso: string;
  nivel: string;
  gestion: string;
  materia: string;
}

export interface CargaAcademicaProfesorDTO {
  id_profesor: number;
  ci: string;
  nombre_completo: string;
  telefono: string | null;
  correo: string | null;
  asignaciones: AsignacionProfesorDTO[];
  total_asignaciones: number;
  cursos_distintos: number;
  materias_distintas: number;
}

export interface CargaAcademicaResponseDTO {
  profesores: CargaAcademicaProfesorDTO[];
  total_profesores: number;
}

// Reporte: Cursos por Gestión
export interface CursoPorGestionDTO {
  id_curso: number;
  nombre_curso: string;
  nivel: string;
  gestion: string;
  total_estudiantes: number;
}

export interface CursosPorGestionResponseDTO {
  cursos: CursoPorGestionDTO[];
  total: number;
  gestion: string | null;
  nivel: string | null;
}
