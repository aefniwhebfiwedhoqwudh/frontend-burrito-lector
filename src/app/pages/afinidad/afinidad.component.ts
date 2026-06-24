import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-afinidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './afinidad.html',
  styleUrl: './afinidad.scss',
})
export class AfinidadComponent implements OnInit {
  usuario: any = {};
  afinidades: any[] = [];
  usuarios: any[] = [];
  libros: any[] = [];
  valoraciones: any[] = [];
  tabla: any[] = [];

  private apiUrl = 'https://backend-practica-2.onrender.com';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario();
    this.cargarDatos();
  }

  cargarDatos() {
    const headers = this.getHeaders();

    this.http.get<any[]>(`${this.apiUrl}/usuarios`).subscribe(usuarios => {
      this.usuarios = usuarios;

      this.http.get<any[]>(`${this.apiUrl}/libros`, { headers }).subscribe(libros => {
        this.libros = libros;

        this.http.get<any[]>(`${this.apiUrl}/valoraciones/afinidad/${this.usuario.id}`, { headers }).subscribe(afinidades => {
          this.afinidades = afinidades;

          this.http.get<any[]>(`${this.apiUrl}/valoraciones`, { headers }).subscribe(valoraciones => {
            this.valoraciones = valoraciones;
            this.construirTabla();
          });
        });
      });
    });
  }

  construirTabla() {
    const filas: any[] = [];

    for (const afin of this.afinidades) {
      const otroUsuario = this.usuarios.find(u => u.id === afin.usuarioId);
      const susValoraciones = this.valoraciones.filter(v => v.usuarioId === afin.usuarioId);

      for (const suVal of susValoraciones) {
        const miVal = this.valoraciones.find(v => v.usuarioId === this.usuario.id && v.libroId === suVal.libroId);
        if (miVal) {
          const libro = this.libros.find(l => l.id === suVal.libroId);
          filas.push({
            titulo: libro?.titulo || 'Desconocido',
            lector: otroUsuario?.nombre || 'Desconocido',
            suRating: suVal.puntuacion,
            miRating: miVal.puntuacion,
            afinidad: afin.afinidad.toFixed(0)
          });
        }
      }
    }

    this.tabla = filas;
    console.log('Tabla afinidad:', this.tabla);
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  irGaleria() {
    this.router.navigate(['/dashboard']);
  }
}