import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormHeladosComponent } from '../../components/form-helados/form-helados.component';
import { TablaHeladosComponent } from '../../components/tabla-helados/tabla-helados.component';
import { Helado } from '../../core/models/helado.model';
import { HeladosServices } from '../../core/services/helados.service';
import { DetalleHeladoComponent } from '../../components/detalle-helado/detalle-helado.component';

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [CommonModule,
    FormHeladosComponent,
    TablaHeladosComponent,
  DetalleHeladoComponent],
  templateUrl: './helados.component.html',
  styleUrl: './helados.component.css'
})
export class HeladosComponent {

  helado!:Helado|undefined
  heladoSvc = inject(HeladosServices)


  heladoSelec(helado:Helado){
    this.helado = helado
  }

  tareaRealizada(){
    this.helado=undefined
  }
  
}
