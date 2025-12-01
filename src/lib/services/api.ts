// Cliente HTTP para consumir la API de FastAPI
import type { 
  ApiResponse, 
  ApiError, 
  EsquelaResponse, 
  EsquelaCreate, 
  CodigoEsquela, 
  CodigoEsquelaCreate, 
  CodigoEsquelaUpdate,
  TipoCodigoEsquela,
  Estudiante,
  Profesor,
  Registrador,
  EstudianteListadoDTO,
  EstudiantesApoderadosResponseDTO,
  ContactosApoderadosResponseDTO,
  DistribucionEdadResponseDTO,
  HistorialCursosResponseDTO
} from '../types/api.js';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private buildQuery(params?: Record<string, any>) {
    if (!params) return '';
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    return qs ? `?${qs}` : '';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Obtener token del localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('brisa_auth_token') : null;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token inválido o expirado - redirigir a login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('brisa_auth_token');
            localStorage.removeItem('brisa_user_data');
            window.location.href = '/login';
          }
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP Error: ${response.status}`,
          details: errorData,
          status: response.status,
        } as ApiError;
      }

      return await response.json();
    } catch (error: any) {
      if (error.status) {
        throw error;
      }
      
      throw {
        message: 'Error de conexión. Verifique su conexión a internet.',
        details: error,
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }

  // Health endpoints
  async healthCheck(): Promise<string> {
    return this.get<string>('/health');
  }

  async getStatus(): Promise<any> {
    return this.get<any>('/status');
  }

  // Esquelas endpoints
  // List esquelas with optional filters and pagination
  async getEsquelas(params?: Record<string, any>): Promise<any> {
    const qs = this.buildQuery(params);
    return this.get<any>(`/esquelas/${qs}`);
  }

  async createEsquela(esquela: EsquelaCreate): Promise<EsquelaResponse> {
    return this.post<EsquelaResponse>('/esquelas/', esquela);
  }

  async getEsquela(id: number): Promise<EsquelaResponse> {
    return this.get<EsquelaResponse>(`/esquelas/${id}`);
  }

  async deleteEsquela(id: number): Promise<string> {
    return this.delete<string>(`/esquelas/${id}`);
  }

  // Códigos de Esquela endpoints
  async getCodigosEsquelas(tipo?: TipoCodigoEsquela): Promise<CodigoEsquela[]> {
    const queryParam = tipo ? `?tipo=${tipo}` : '';
    return this.get<CodigoEsquela[]>(`/codigos-esquelas/${queryParam}`);
  }

  async createCodigoEsquela(codigo: CodigoEsquelaCreate): Promise<CodigoEsquela> {
    return this.post<CodigoEsquela>('/codigos-esquelas/', codigo);
  }

  async getCodigoEsquela(id: number): Promise<CodigoEsquela> {
    return this.get<CodigoEsquela>(`/codigos-esquelas/${id}`);
  }

  async updateCodigoEsquela(id: number, codigo: CodigoEsquelaUpdate): Promise<CodigoEsquela> {
    return this.put<CodigoEsquela>(`/codigos-esquelas/${id}`, codigo);
  }

  async deleteCodigoEsquela(id: number): Promise<string> {
    return this.delete<string>(`/codigos-esquelas/${id}`);
  }

  // Estudiantes endpoints
  async getEstudiantes(): Promise<Estudiante[]> {
    return this.get<Estudiante[]>('/estudiantes/');
  }

  async getEstudiante(id: number): Promise<Estudiante> {
    return this.get<Estudiante>(`/estudiantes/${id}`);
  }

  // Profesores endpoints
  async getProfesores(): Promise<Profesor[]> {
    return this.get<Profesor[]>('/profesores/');
  }

  async getProfesor(id: number): Promise<Profesor> {
    return this.get<Profesor>(`/profesores/${id}`);
  }

  // Registradores endpoints
  async getRegistradores(): Promise<Registrador[]> {
    return this.get<Registrador[]>('/registradores/');
  }

  async getRegistrador(id: number): Promise<Registrador> {
    return this.get<Registrador>(`/registradores/${id}`);
  }

  // Courses endpoints
  async getCourses(): Promise<any> {
    return this.get<any>('/courses/');
  }
  async getCourseTeachersList(id: number): Promise<any> {
    return this.get<any>(`/courses/mis_cursos/${id}`);
  }

  async getCourse(id: number): Promise<any> {
    return this.get<any>(`/courses/${id}`);
  }

  async getCourseStudents(courseId: number, params?: Record<string, any>): Promise<any> {
    const qs = this.buildQuery(params);
    return this.get<any>(`/courses/${courseId}/students${qs}`);
  }

  async getCourseTeachers(courseId: number, params?: Record<string, any>): Promise<any> {
    const qs = this.buildQuery(params);
    return this.get<any>(`/courses/${courseId}/teachers${qs}`);
  }

  // Aggregations & reports
  async getEsquelasAggregateByCourse(year?: number): Promise<any> {
    const qs = this.buildQuery({ year });
    return this.get<any>(`/esquelas/aggregate/by-course${qs}`);
  }

  async getEsquelasAggregateByPeriod(group_by: string = 'year'): Promise<any> {
    const qs = this.buildQuery({ group_by });
    return this.get<any>(`/esquelas/aggregate/by-period${qs}`);
  }

  async getStudentEsquelas(studentId: number, params?: Record<string, any>): Promise<any> {
    const qs = this.buildQuery(params);
    return this.get<any>(`/students/${studentId}/esquelas${qs}`);
  }

  async getReportsRanking(params: Record<string, any>): Promise<any> {
    const qs = this.buildQuery(params);
    return this.get<any>(`/reports/ranking${qs}`);
  }

  // ================================
  // Reportes de Estudiantes
  // ================================
  
  /**
   * Obtiene listado de estudiantes filtrado por curso, nivel y/o gestión.
   * @param params - Filtros opcionales: curso_id, nivel, gestion
   */
  async getReporteEstudiantes(params?: {
    curso_id?: number;
    nivel?: 'inicial' | 'primaria' | 'secundaria';
    gestion?: string;
  }): Promise<EstudianteListadoDTO> {
    const qs = this.buildQuery(params);
    return this.get<EstudianteListadoDTO>(`/reports/students${qs}`);
  }

  /**
   * Obtiene estudiantes con o sin apoderados registrados.
   * @param con_apoderados - true: con apoderados, false: sin apoderados, null/undefined: todos
   */
  async getReporteEstudiantesApoderados(con_apoderados?: boolean): Promise<EstudiantesApoderadosResponseDTO> {
    const qs = this.buildQuery({ con_apoderados });
    return this.get<EstudiantesApoderadosResponseDTO>(`/reports/students/guardians${qs}`);
  }

  /**
   * Obtiene datos de contacto de apoderados (padres/madres).
   * @param params - Filtros opcionales: curso_id, nivel, gestion
   */
  async getReporteContactosApoderados(params?: {
    curso_id?: number;
    nivel?: 'inicial' | 'primaria' | 'secundaria';
    gestion?: string;
  }): Promise<ContactosApoderadosResponseDTO> {
    const qs = this.buildQuery(params);
    return this.get<ContactosApoderadosResponseDTO>(`/reports/students/guardian-contacts${qs}`);
  }

  /**
   * Obtiene distribución de estudiantes por rangos de edad.
   * @param params - Filtros opcionales: curso_id, nivel, gestion
   */
  async getReporteDistribucionEdad(params?: {
    curso_id?: number;
    nivel?: 'inicial' | 'primaria' | 'secundaria';
    gestion?: string;
  }): Promise<DistribucionEdadResponseDTO> {
    const qs = this.buildQuery(params);
    return this.get<DistribucionEdadResponseDTO>(`/reports/students/age-distribution${qs}`);
  }

  /**
   * Obtiene historial de cursos por estudiante.
   * @param estudiante_id - ID del estudiante (opcional, si no se especifica retorna todos)
   */
  async getReporteHistorialCursos(estudiante_id?: number): Promise<HistorialCursosResponseDTO> {
    const qs = this.buildQuery({ estudiante_id });
    return this.get<HistorialCursosResponseDTO>(`/reports/students/course-history${qs}`);
  }
}

export const apiClient = new ApiClient();
