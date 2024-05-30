import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  http = inject( HttpClient)
  router = inject(Router)

  goto(path : string){
    this.router.navigate([path]);
  }

  getInfoGitHub(): Observable<any> {
    return this.http.get<any>('https://api.github.com/users/gabriel-remon').pipe(
      map(data =>  {
        return {
          nombre: data.login,
          foto: data.avatar_url,
          repositorios: data.public_repos,
          pagina:data.html_url
        }
      })
    );
  }

  
}
