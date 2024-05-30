import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
        //canActivate:[authGuard,admin2Guard]
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./pages/auth/peliculas.routes').then(m=>m.peliculas_routes),
        canActivate:[noAuthGuard]
    },
    {
        path: 'repartidor',
        loadChildren: ()=> import('./pages/repartidor/peliculas.routes').then(m=>m.repartidor_routes),
        canActivate:[authGuard]
    },
    {
        path: '**',
        component:HomeComponent
        //canActivate:[authGuard,admin2Guard]
    },
];
