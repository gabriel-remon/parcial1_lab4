import { Component } from '@angular/core';
import { DetalleRepartidorComponent } from '../../../components/detalle-repartidor/detalle-repartidor.component';
import { TablaRepartidorComponent } from '../../../components/tabla-repartidor/tabla-repartidor.component';
import { FormRepartidorComponent } from '../../../components/form-repartidor/form-repartidor.component';
import { CommonModule } from '@angular/common';
import { DetallePaisComponent } from '../../../components/detalle-pais/detalle-pais.component';
import { Repartidor } from '../../../core/models/repartidor.model';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [DetalleRepartidorComponent,
    TablaRepartidorComponent,
    FormRepartidorComponent,
    CommonModule,
    DetallePaisComponent],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
  repartidorSelc!:Repartidor
  paisRepartidor:any;
  repartidorSeleccionado(repartidor:Repartidor){
    this.repartidorSelc = repartidor
    this.paisRepartidor={
      nombre:repartidor.pais_origen,
      foto:repartidor.url_foto_pais
    }
  
  }
}
