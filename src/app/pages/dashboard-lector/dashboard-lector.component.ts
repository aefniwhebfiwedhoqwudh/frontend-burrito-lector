import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-dashboard-lector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-lector.component.html',
  styleUrl: './dashboard-lector.component.scss'
})
export class DashboardLectorComponent implements OnInit {
  libros: any[] = [];
  usuario: any = {};

  constructor(
    private librosService: LibrosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario();
    this.librosService.obtenerTodos().subscribe({
      next: (data) => this.libros = data,
      error: (err) => console.log('Error:', err)
    });
  }

  irGaleria() {
    this.router.navigate(['/dashboard']);
  }

  irAfinidad() {
    this.router.navigate(['/afinidad']);
  }

  salir() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}