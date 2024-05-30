import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Helado } from '../../core/models/helado.model';
import { HeladosServices } from '../../core/services/helados.service';

@Component({
  selector: 'app-tabla-helados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-helados.component.html',
  styleUrl: './tabla-helados.component.css'
})
export class TablaHeladosComponent {

  @Output() heladoElegido = new EventEmitter<Helado>();

  @Input()helados! : Helado[] |[];

  heladoSvc = inject(HeladosServices)

  ngOnInit(): void {
    if(!this.helados){
      this.heladoSvc.getData(helados =>{
        this.helados = helados
      })
    }
  }
  

  seleccionarPelicula(helado:Helado){

    this.heladoElegido.emit(helado)
  }

}
