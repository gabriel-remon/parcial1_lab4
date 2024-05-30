import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Repartidor } from '../../core/models/repartidor.model';
import { RepartidorServices } from '../../core/services/repartidor.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringValidator } from '../../core/validators/string.validator';
import { edadValidator } from '../../core/validators/edad.validator';

@Component({
  selector: 'app-form-repartidor',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-repartidor.component.html',
  styleUrl: './form-repartidor.component.css'
})
export class FormRepartidorComponent {
  @Input() repartidor!:Repartidor;
  @Input() pais:any;
  @Output() tareaRealizada = new EventEmitter<any>();

  tipoForm ="Agregar repartidor"
  repartidorSvc = inject(RepartidorServices)
  toasSvc = inject(ToastrService)
  spinerSvc = inject(NgxSpinnerService)
  imagen :any;

  ngOnInit():void{
    if(this.repartidor){
      this.tipoForm = "Modificar repartidor"
      this.pais = this.repartidor.pais_origen as string
      this.form.patchValue({
        nombre: this.repartidor.nombre,
        pais: this.repartidor.pais_origen,
        nacimiento: this.repartidor.fecha_nacimiento,
        unidad_propia: this.repartidor.unidadPropia?"true":null,
        cantidad_helados: this.repartidor.capacidad_helados.toString(),
        dni: this.repartidor.dni
        //imagen:this.pelicula.src_foto
      });
      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.form.controls.pais.setValue(this.pais.nombre, { emitEvent: false });
  }



  form= new FormGroup ({
    nombre: new FormControl('',[Validators.required,stringValidator()]),
    pais: new FormControl('',[Validators.required]),
    nacimiento: new FormControl('',[Validators.required,edadValidator(18)]),
    dni: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(11)]),
    cantidad_helados: new FormControl('',[Validators.required,Validators.min(1),Validators.max(50)]),
    unidad_propia: new FormControl('',)
  })


  submit(){
    this.spinerSvc.show()
    const nuevoActor:Repartidor ={
      nombre:this.form.value.nombre  as string,
      fecha_nacimiento:this.form.value.nacimiento  as string,
      pais_origen:this.form.value.pais  as string,
      capacidad_helados: parseInt(this.form.value.cantidad_helados as string),
      dni:this.form.value.dni as string,
      unidadPropia:this.form.value.unidad_propia?true:false,
      id:"",
      url_foto_pais:this.pais.foto
    }

    if(this.repartidor){
      nuevoActor.id = this.repartidor.id
      this.repartidorSvc.updateData(nuevoActor as Repartidor).then(()=>{
        this.tareaRealizada.emit()
      }).finally(()=>this.spinerSvc.hide())
    }else{
      this.repartidorSvc.newData(nuevoActor as Repartidor).then((data)=>{
        if(data.estado){
          this.toasSvc.success(data.mensaje)
        }else{
          this.toasSvc.error(data.mensaje)
        }
        this.tareaRealizada.emit()
      }
    ).finally(()=>this.spinerSvc.hide())
    }

    this.form.reset()
  }

}
