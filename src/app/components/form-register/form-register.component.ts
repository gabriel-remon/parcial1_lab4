import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/models/user.model';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {

  @Input() pathExito!:string;
  @Input() pathRegistro!:string;
  toast = inject(ToastrService)
  spinner = inject(NgxSpinnerService)
  authFirebase = inject(AuthFirebaseService)
  utilSvc = inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  async submit() {
    const user= {
      nombre:this.form.value.nombre,
      email:this.form.value.email,
      rol:"empleado"
    }
    this.spinner.show();
    await this.authFirebase.register(user as User, this.form.value.password!, () => {
      this.utilSvc.goto(this.pathExito)
      this.toast.success("usuario logueado con exito", "Bienvenido")
    })
    this.spinner.hide();

    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }


}
