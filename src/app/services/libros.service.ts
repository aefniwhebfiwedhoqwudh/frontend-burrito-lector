import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = 'https://backend-practica-2.onrender.com/libros';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  crear(libro: any): Observable<any> {
    return this.http.post(this.apiUrl, libro, { headers: this.getHeaders() });
  }

  actualizar(id: number, libro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, libro, { headers: this.getHeaders() });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  subirImagen(id: number, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('portada', archivo);
    return this.http.post(`${this.apiUrl}/imagen/${id}`, formData, { headers: this.getHeaders() });
  }
}