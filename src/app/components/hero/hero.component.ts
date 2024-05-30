import { Component, inject } from '@angular/core';
import { UtilsService } from '../../core/services/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {


  utilSvc = inject(UtilsService)
  spinerSvc = inject(NgxSpinnerService)
  data:any
  urlGit:string=""

  ngOnInit(): void {
    this.spinerSvc.show()
    this.utilSvc.getInfoGitHub().subscribe(data=>{
      this.data = data
      this.urlGit=data.pagina
      this.spinerSvc.hide()
    })
  }
}
