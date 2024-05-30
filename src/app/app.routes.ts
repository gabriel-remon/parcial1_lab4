import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';
import { HeladosComponent } from './pages/helados/helados.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
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
        path: 'helados',
        component:HeladosComponent,
        canActivate:[authGuard,adminGuard]
    },
    {
        path: '**',
        component:HomeComponent
    },
];
