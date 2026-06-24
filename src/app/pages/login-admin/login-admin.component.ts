import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {
  correo = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ingresar() {
    this.authService.login(this.correo, this.clave).subscribe({
      next: (res: any) => {
        if (res.usuario.rol !== 'admin') {
          this.error = 'No tienes permisos de administrador';
          return;
        }
        this.authService.guardarSesion(res.access_token, res.usuario);
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = 'Correo o clave incorrectos';
      }
    });
  }
}