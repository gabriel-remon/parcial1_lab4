import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Helado } from '../../core/models/helado.model';
import { HeladosServices } from '../../core/services/helados.service';
import { stringValidator } from '../../core/validators/string.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-helados',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-helados.component.html',
  styleUrl: './form-helados.component.css'
})
export class FormHeladosComponent {


  @Input() helado!:Helado;
  @Output() tareaRealizada = new EventEmitter<any>();

  tipoForm ="Agregar helado"
  heladoSvc = inject(HeladosServices)
  imagen :any;
  spinerSvc = inject(NgxSpinnerService)
  toasSvc = inject(ToastrService)

  form= new FormGroup ({
    sabor: new FormControl('',[Validators.required,stringValidator()]),
    tipo: new FormControl('',[Validators.required]),
    precio: new FormControl('',[Validators.required,Validators.min(1)]),
    peso: new FormControl('',[Validators.required,Validators.min(250),Validators.max(1000)])
  })


  ngOnInit():void{
    if(this.helado){
      this.tipoForm = "Modificar helado"
      this.form.patchValue({
        sabor: this.helado.sabor,
        tipo: this.helado.tipo,
        precio: this.helado.precio?.toString(),
        peso: this.helado.peso?.toString()
        //imagen:this.pelicula.src_foto
      });
      
    }
  }


  submit(){
    this.spinerSvc.show()
    const nuevoActor:Helado ={
      sabor:this.form.value.sabor  as string,
      //@ts-ignore
      tipo:this.form.value.tipo  as string,
      precio: parseInt(this.form.value.precio as string),
      peso: parseInt(this.form.value.peso as string),
      lista:false,
      id:"",
    }

    if(this.helado){
      nuevoActor.id = this.helado.id
      this.heladoSvc.updateData(nuevoActor as Helado).then((data)=>{
        if(data.estado){
          this.toasSvc.success(data.mensaje)
        }else{
          this.toasSvc.error(data.mensaje)
        }
        this.tareaRealizada.emit()
      }
    ).finally(()=>this.spinerSvc.hide())
    }else{
      this.heladoSvc.newData(nuevoActor as Helado).then((data)=>{
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
