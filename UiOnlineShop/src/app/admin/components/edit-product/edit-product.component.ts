import { Component, OnInit } from '@angular/core';
import {Router,NavigationExtras} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {ActivatedRoute, Params} from '@angular/router'
import { Product } from 'src/app/product.model';
import {ProductService} from '../../../services/product.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  formProduct: FormGroup;
  product!: Product;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService : ProductService
  ) {
      this.formProduct = this.createFormGroup()
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      const code = params.code;
      this.productsService.getProduct(code).subscribe(data=>{
        this.product = data;
        this.formProduct = this.createFormGroup(this.product);
      })  
    })
  }

  createFormGroup(product?: Product){
    return new FormGroup({
      code: new FormControl(product?.code,[Validators.required]),
      name : new FormControl(product?.name,[Validators.required,Validators.maxLength(80)]),
      description : new FormControl(product?.description,[Validators.required,Validators.maxLength(100)]),
      price : new FormControl(product?.price,[Validators.required,Validators.min(1)])
    })
  }

  save(){
    Swal.fire({
      title: '¿Seguro de editar este producto?',
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
          code: this.formProduct.get('code')?.value,
          name: this.formProduct.get('name')?.value,
          description : this.formProduct.get('description')?.value,
          price : this.formProduct.get('price')?.value
        }
    
        this.productsService.editProduct(product.code!,product).subscribe(result => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido actualizado',
            showConfirmButton: false,
            timer: 1000
          })
          //this.formProduct.reset();
          this.router.navigate(['/admin/productos'])
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
