import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  nombre = '';
  correo = '';
  clave = '';
  error = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.registro(this.nombre, this.correo, this.clave).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Error al registrarse';
      }
    });
  }
}