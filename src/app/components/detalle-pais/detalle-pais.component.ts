import { Component, Input, inject } from '@angular/core';
import { PaisesService } from '../../core/services/paises.service';

@Component({
  selector: 'app-detalle-pais',
  standalone: true,
  imports: [],
  templateUrl: './detalle-pais.component.html',
  styleUrl: './detalle-pais.component.css'
})
export class DetallePaisComponent {
  @Input() pais!:{nombre:string,foto:string}

  

}
