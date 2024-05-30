import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Helado } from '../../core/models/helado.model';
import { HeladosServices } from '../../core/services/helados.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-helado',
  standalone: true,
  imports: [],
  templateUrl: './detalle-helado.component.html',
  styleUrl: './detalle-helado.component.css'
})
export class DetalleHeladoComponent {
  @Input() helado!:Helado;

  heladoSvc = inject(HeladosServices)
  spinerSvc = inject(NgxSpinnerService)
  toastSvc = inject(ToastrService)
  @Output() tareaRealizada = new EventEmitter<any>();

  eliminarHelado(){
    this.spinerSvc.show()
    this.heladoSvc.delet(this.helado?.id)
    .then(()=>this.toastSvc.success("helado eliminado con exito"))
    .catch((err)=>this.toastSvc.error(err.message))
    .finally(()=>{
      this.spinerSvc.hide()
      this.tareaRealizada.emit()
    })
  }
}
