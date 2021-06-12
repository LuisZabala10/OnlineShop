import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/product.model';

import {ProductService} from '../../../services/product.service'
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products : Product[] = [];
  stockPattern : any = /^\d*$/;
  formInventory: FormGroup;

  constructor(private productService: ProductService) {
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
      stock : new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.stockPattern)])
    })
  }

  save(){
    const inventory = this.formInventory
    console.log(inventory)
  }

}
