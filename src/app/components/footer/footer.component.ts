import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  irArriba(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
