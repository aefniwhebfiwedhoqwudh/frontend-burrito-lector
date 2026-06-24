import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend-practica-2.onrender.com/auth';

  constructor(private http: HttpClient) {}

  login(correo: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo, clave });
  }

  registro(nombre: string, correo: string, clave: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, { nombre, correo, clave });
  }

  guardarSesion(token: string, usuario: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obtenerUsuario() {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}