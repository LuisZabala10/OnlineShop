import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Product } from '../product.model';
import { Sale } from '../sale.model';
import {ProductService} from '../services/product.service'
import { SaleService } from '../services/sale.service'; 


@Component({
  selector: 'app-products',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  products : Product[] = [];

  formSale: FormGroup;

  amountPattern : any = /^\d*$/;

  constructor(private productService: ProductService,private saleService :SaleService) { 
    this.formSale = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(products => this.products = products)
  }

  onSelect(selected: any){
    const code = selected.target.value

    this.productService.getProduct(code).subscribe(product =>{

      console.log(product);
      this.formSale.get('stock')?.setValue(product.stock)
      this.formSale.get('price')?.setValue(product.price)
    })

  }

  createFormGroup(){
    return new FormGroup({
      code : new FormControl('',[Validators.required]),
      price : new FormControl(0,[Validators.required]),
      stock : new FormControl(0,[Validators.required]),
      total : new FormControl(0,[Validators.required]),
      amount : new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.amountPattern)])
    })
  }

  onBuy(){
    const amount = this.formSale.get('amount')?.value;
    const price = this.formSale.get('price')?.value;
    const stock = this.formSale.get('stock')?.value;

    if(amount > stock){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay existencia suficiente para realizar su compra',
        confirmButtonColor: '#0d6efd',
      })
    }

    const total = price*amount;

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
        
        const sale : Sale = {
          code: this.formSale.get('code')?.value,
          amount : this.formSale.get('amount')?.value
        }
        this.saveSale(sale,total)
      }
    })
  }

  saveSale(sale : Sale, total: Number){
    this.saleService.saveSale(sale).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Inventario actualizado',
        text: `Su compra hizo un total de ${total}`,
        showConfirmButton: true
      })
      this.formSale.reset();
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

}
