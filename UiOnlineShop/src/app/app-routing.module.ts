import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale/sale.component';

const routes : Routes = [
    {
        path : '',
        component : SaleComponent
    },
    {
        path : 'tienda-venta-productos',
        component : SaleComponent
    },
    {
        path : 'admin', loadChildren: ()=> import('./admin/admin.module').then(m=> m.AdminModule)
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}