import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const noAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const toasSvc = inject(ToastrService)
  //const user =localStorage.getItem('user')

return new Promise((resolve)=>{
  onAuthStateChanged(getAuth(),auth=>{
  
    if(!auth){// || !user){
      resolve(true)
    }else{
      //toasSvc.error("Ya se encuentra logueado")
      resolve(router.createUrlTree(['']))
    }
  })
})
  
};
