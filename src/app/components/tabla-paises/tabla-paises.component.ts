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
        "nombre": "Moldova",
        "foto": "https://flagcdn.com/w320/md.png"
    },
    {
        "nombre": "United States",
        "foto": "https://flagcdn.com/w320/us.png"
    },
    {
        "nombre": "Mayotte",
        "foto": "https://flagcdn.com/w320/yt.png"
    },
    {
        "nombre": "Nauru",
        "foto": "https://flagcdn.com/w320/nr.png"
    },
    {
        "nombre": "Mozambique",
        "foto": "https://flagcdn.com/w320/mz.png"
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
