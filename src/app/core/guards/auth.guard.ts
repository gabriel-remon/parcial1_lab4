import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

    
  const router = inject(Router)
  const toasSvc = inject(ToastrService)
  //const user =localStorage.getItem('user')

return new Promise((resolve)=>{
  onAuthStateChanged(getAuth(),auth=>{
  
    if(auth){// && user){
      resolve(true)
    }else{
     // toasSvc.error("Debe estas logeado para ingresar")
      resolve(router.createUrlTree(['/auth/login']))
    }
  })
})
  
};
