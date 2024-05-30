import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
        //canActivate:[authGuard,admin2Guard]
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/peliculas.routes').then(m=>m.peliculas_routes)
        //canActivate:[authGuard]
    },
    {
        path: '**',
        component:HomeComponent
        //canActivate:[authGuard,admin2Guard]
    },
];
