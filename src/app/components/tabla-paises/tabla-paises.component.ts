import { Component, EventEmitter, Output, inject } from '@angular/core';
import { PaisesService } from '../../core/services/paises.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css'
})
export class TablaPaisesComponent {

  @Output() paisElegido = new EventEmitter<any>();
  paisesSvc = inject(PaisesService)
  spinerSvc = inject(NgxSpinnerService)
  tosastSvc = inject(ToastrService)
  paises:any =[]
  paisesBackUp= [
    {
        "nombre": "Spain",
        "foto": "https://flagcdn.com/w320/es.png"
    },
    {
        "nombre": "Seychelles",
        "foto": "https://flagcdn.com/w320/sc.png"
    },
    {
        "nombre": "Angola",
        "foto": "https://flagcdn.com/w320/ao.png"
    }
]
  ngOnInit(): void {

    this.spinerSvc.show()
    /*next?: ((value: { nombre: string; foto: string; }[]) => void) | null | undefined, 
    error?: ((error: any) => void) | null | undefined, 
    complete?*/
    this.paisesSvc.getCountries().subscribe(
      response => { 
        this.paises = response
        this.tosastSvc.success("Se cargaron con exito los paises")
        this.spinerSvc.hide()
      },
      (error) => { 
        this.tosastSvc.error(error.message,"Error en la solicitud HTTP")
        this.tosastSvc.success("Se cargaron los paises guardados localmente")
        this.paises = this.paisesBackUp
        this.spinerSvc.hide()
       }
      );
   
  }

  seleccionarPais(pais:any){
    this.paisElegido.emit(pais)
  }
}
