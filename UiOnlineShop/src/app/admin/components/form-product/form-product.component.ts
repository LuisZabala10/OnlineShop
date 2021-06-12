import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms'
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})

export class FormProductComponent {
  formProduct: FormGroup;

  stockPattern : any = /^\d*$/;

  constructor(private productService : ProductService) {
    this.formProduct = this.createFormGroup();
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  save(){

    Swal.fire({
      title: '¿Seguro de crear este producto?',
      text: "Confirme por favor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        const product : Product = {
          name: this.formProduct.get('name')?.value,
          description : this.formProduct.get('description')?.value,
          price : this.formProduct.get('price')?.value,
          stock : this.formProduct.get('stock')?.value
        }
    
        this.productService.addProduct(product).subscribe(result => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido creado',
            showConfirmButton: false,
            timer: 1000
          })
          this.formProduct.reset();
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
  createFormGroup(){
    return new FormGroup({
      name : new FormControl('',[Validators.required,Validators.maxLength(80)]),
      description : new FormControl('',[Validators.required,Validators.maxLength(100)]),
      price : new FormControl('',[Validators.required,Validators.min(1)]),
      stock : new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.stockPattern)])
    })
  }

}
