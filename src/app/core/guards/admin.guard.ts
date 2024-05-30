import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthFirebaseService } from '../services/auth.firebase.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const uathSvc = inject(AuthFirebaseService)
  const toast = inject(ToastrService)

return new Promise((resolve)=>{
  
    if(uathSvc.rol == "admin"){
      resolve(true)
    }else{
      toast.error("solo los admin pueden ingresar", "Permisos induficientes")
      resolve(false)
    }
  })

};
