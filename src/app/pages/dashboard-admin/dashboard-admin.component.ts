import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  usuario: any = {};
  totalLibros = 0;
  libros: any[] = [];
  vistaActual = 'dash';

  // Para agregar/editar
  mostrarFormulario = false;
  modoEdicion = false;
  libroSeleccionado: any = { titulo: '', autor: '', editorial: '', genero: '', sinopsis: '' };
  archivoImagen: File | null = null;

  constructor(
    private authService: AuthService,
    private librosService: LibrosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario();
    this.cargarLibros();
  }

  cargarLibros() {
    this.librosService.obtenerTodos().subscribe({
      next: (data) => {
        this.libros = data;
        this.totalLibros = data.length;
      }
    });
  }

  abrirAgregar() {
    this.modoEdicion = false;
    this.libroSeleccionado = { titulo: '', autor: '', editorial: '', genero: '', sinopsis: '' };
    this.archivoImagen = null;
    this.mostrarFormulario = true;
  }

  abrirEditar(libro: any) {
    this.modoEdicion = true;
    this.libroSeleccionado = { ...libro };
    this.archivoImagen = null;
    this.mostrarFormulario = true;
  }

  guardar() {
    if (this.modoEdicion) {
      this.librosService.actualizar(this.libroSeleccionado.id, this.libroSeleccionado).subscribe({
        next: (res) => {
          if (this.archivoImagen) {
            this.librosService.subirImagen(res.id, this.archivoImagen).subscribe({
              next: () => { this.mostrarFormulario = false; this.cargarLibros(); }
            });
          } else {
            this.mostrarFormulario = false;
            this.cargarLibros();
          }
        }
      });
    } else {
      this.librosService.crear(this.libroSeleccionado).subscribe({
        next: (res) => {
          if (this.archivoImagen) {
            this.librosService.subirImagen(res.id, this.archivoImagen).subscribe({
              next: () => { this.mostrarFormulario = false; this.cargarLibros(); }
            });
          } else {
            this.mostrarFormulario = false;
            this.cargarLibros();
          }
        }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este libro?')) {
      this.librosService.eliminar(id).subscribe({
        next: () => this.cargarLibros()
      });
    }
  }

  onArchivoSeleccionado(event: any) {
    this.archivoImagen = event.target.files[0];
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigate(['/admin/login']);
  }
}