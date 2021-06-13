import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/product.model';
import Swal from 'sweetalert2';

import {ProductService} from '../../../services/product.service'
import {InventoryService} from '../../../services/inventory.service'
import { Inventory } from 'src/app/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products : Product[] = [];
  stockPattern : any = /^\d*$/;
  formInventory: FormGroup;

  constructor(private productService: ProductService, private inventoryService: InventoryService) {
    this.formInventory = this.createFormGroup(); 
  }

  ngOnInit(): void {

    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(products => this.products = products)
  }

  createFormGroup(){
    return new FormGroup({
      code : new FormControl('',[Validators.required]),
      amount : new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.stockPattern)])
    })
  }

  save(){

    Swal.fire({
      title: '¿Seguro de registrar este inventario?',
      text: "Confirme por favor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        const inventory : Inventory = {
          code: this.formInventory.get('code')?.value,
          amount : this.formInventory.get('amount')?.value
        }
    
        this.inventoryService.updateInventory(inventory).subscribe(result => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inventario actualizado',
            showConfirmButton: false,
            timer: 1000
          })
          this.formInventory.reset();
        }, error=> {
          if(error.status === 0){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo salio mal!. Network error.`,
              confirmButtonColor: '#0d6efd',
            })
          }
          else{
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Algo salio mal!. \n${error.statusText}`,
              confirmButtonColor: '#0d6efd',
            })
          }
        });
      }
    })
  }

}
