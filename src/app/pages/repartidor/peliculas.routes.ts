import { Routes } from '@angular/router';
import { AltaComponent } from './alta/alta.component';
import { ListadoComponent } from './listado/listado.component';

export const repartidor_routes: Routes = [

    {
        path: 'alta',
        component:AltaComponent
    },
    {
        path: 'listado',
        component:ListadoComponent
    }
];
