import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  correo = '';
  clave = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ingresar() {
    this.authService.login(this.correo, this.clave).subscribe({
      next: (res: any) => {
        this.authService.guardarSesion(res.access_token, res.usuario);
        if (res.usuario.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.error = 'Correo o clave incorrectos';
      }
    });
  }
}