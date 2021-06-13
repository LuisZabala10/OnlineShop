import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ClientsGuard } from './clients.guard';
import { HomeGuard } from './home.guard';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SaleComponent } from './sale/sale.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes : Routes = [
    {
        path : '',
        component : HomeComponent,
        canActivate : [HomeGuard]
    },
    {
        path : 'tienda-venta-productos',
        component : SaleComponent,
        canActivate: [ClientsGuard]
    },
    {
        path : 'admin', loadChildren: ()=> import('./admin/admin.module').then(m=> m.AdminModule),
        canActivate: [AdminGuard]
    },
    {
        path : 'ingresar',
        component : LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path : 'sin-acceso',
        component : UnauthorizedComponent
    },
    {
        path : '**',
        component : NotfoundComponent
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}