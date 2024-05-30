import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  @Input() pathRegistro!:string;
  @Input() pathExito!:string;
  toast = inject(ToastrService)
  spinner = inject(NgxSpinnerService)
  authFirebase = inject(AuthFirebaseService)
  utilSvc = inject(UtilsService)

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  async submit() {

    this.spinner.show();
    await this.authFirebase.login(this.form.value.email!, this.form.value.password!, () => {
      this.utilSvc.goto(this.pathExito)
      this.toast.success("usuario logueado con exito", "Bienvenido")
    })
    this.spinner.hide();

    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }

  accesoRapido(email: string, password: string) {
    this.form.patchValue({
      email: email,
      password: password
    });
  }
}
