import { Component, Input } from '@angular/core';
import { Repartidor } from '../../core/models/repartidor.model';

@Component({
  selector: 'app-detalle-repartidor',
  standalone: true,
  imports: [],
  templateUrl: './detalle-repartidor.component.html',
  styleUrl: './detalle-repartidor.component.css'
})
export class DetalleRepartidorComponent {
  @Input() repartidor!:Repartidor;

}
