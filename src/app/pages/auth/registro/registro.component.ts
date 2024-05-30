import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../../components/form-register/form-register.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormRegisterComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

}
