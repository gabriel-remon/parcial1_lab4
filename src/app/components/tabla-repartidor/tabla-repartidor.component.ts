import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repartidor } from '../../core/models/repartidor.model';
import { RepartidorServices } from '../../core/services/repartidor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tabla-repartidor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-repartidor.component.html',
  styleUrl: './tabla-repartidor.component.css'
})
export class TablaRepartidorComponent {

  @Output() peliculaElegida = new EventEmitter<Repartidor>();
  @Input() tablaMin:boolean=false

  @Input()repartidores! : Repartidor[] |[];

  repartidorSvc = inject(RepartidorServices)
  spinerSvc = inject(NgxSpinnerService)
 
  ngOnInit(): void {
    this.spinerSvc.show()
    if(!this.repartidores){
      this.repartidorSvc.getData(repartidores =>{
       
        this.repartidores = repartidores
      },()=>this.spinerSvc.hide())
    }}

    seleccionarRepartidor(repartidor:Repartidor){
      this.peliculaElegida.emit(repartidor)
    }
}
