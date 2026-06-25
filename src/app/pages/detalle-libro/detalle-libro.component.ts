import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.scss']
})
export class DetalleLibroComponent implements OnInit {
  idLibro: string | null = null;
  libro: any = null;
  usuario: any = {};

  estrellas = [1, 2, 3, 4, 5];
  calificacionSeleccionada = 0;

  private apiUrl = 'https://backend-practica-2.onrender.com';

  constructor(
    private route: ActivatedRoute,
    private librosService: LibrosService,
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.route.paramMap.subscribe(params => {
      this.libro = null;
      this.idLibro = params.get('id');
      if (this.idLibro) {
        this.obtenerDetallesDelLibro(this.idLibro);
      }
    });
  }

  obtenerDetallesDelLibro(id: string): void {
    this.librosService.obtenerPorId(Number(id)).subscribe({
      next: (res: any) => {
        this.libro = {...res};
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  calificar(valor: number): void {
    this.calificacionSeleccionada = valor;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.post(`${this.apiUrl}/valoraciones`, {
      usuarioId: this.usuario.id,
      libroId: Number(this.idLibro),
      puntuacion: valor
    }, { headers }).subscribe({
      next: () => console.log('Valoración guardada'),
      error: (err) => console.error('Error al guardar valoración:', err)
    });
  }
}