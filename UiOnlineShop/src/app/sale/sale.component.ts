import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDo from '@angular/common/locales/es-DO'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';
import {ProductService} from '../services/product.service'
import { SaleService } from '../services/sale.service'; 

registerLocaleData(localeDo,'es-DO')


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

      this.formSale.get('stock')?.setValue(product.stock)
      this.formSale.get('price')?.setValue(product.price)
    })

  }

  createFormGroup(){
    return new FormGroup({
      productCode : new FormControl('',[Validators.required]),
      price : new FormControl(0,[Validators.required]),
      stock : new FormControl(0,[Validators.required]),
      total : new FormControl(0,[Validators.required]),
      amount : new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.amountPattern)])
    })
  }

  //confirma que la venta este correta y luego llama a la funcion que crea la venta
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

      return;
    }

    const total = price*amount;

    Swal.fire({
      title: '¿Seguro de ralizar esta compra?',
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
          productCode: this.formSale.get('productCode')?.value,
          amount : this.formSale.get('amount')?.value
        }
        this.saveSale(sale,total)
      }
    })
  }

  //crea la venta
  saveSale(sale : Sale, total: number){

    const totalFormated = formatCurrency(total,'es-DO','RD');

    this.saleService.saveSale(sale).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Compra realizada',
        text: `Su compra hizo un total de ${totalFormated}`,
        showConfirmButton: true,
        confirmButtonColor: '#0d6efd',
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
          text: `Algo salio mal!. \n${error.error}`,
          confirmButtonColor: '#0d6efd',
        })
      }
    });
  }

}
