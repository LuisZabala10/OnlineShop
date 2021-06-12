import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    component : NavComponent,
    children:[
      {
        path : 'crear-producto',
        component : FormProductComponent
      },
      {
        path : 'productos',
        component : ProductsComponent
      },
      {
        path : 'editar-producto/:code',
        component : EditProductComponent
      },
      {
        path : 'inventario',
        component : InventoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
