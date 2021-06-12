import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { InventoryComponent } from './components/inventory/inventory.component';



@NgModule({
  declarations: [NavComponent, FormProductComponent, ProductsComponent, EditProductComponent, InventoryComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
