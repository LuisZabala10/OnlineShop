import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Product[] = [];

  constructor(private productService: ProductService) { 
    
  }

  ngOnInit(): void {
    //this.products = this.productService.getProducts();
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(products => this.products = products)
  }

  deleteProduct(code: string){
    Swal.fire({
      title: '¿Seguro de borrar este producto?',
      text: "Confirme por favor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteProduct(code).subscribe(success=>{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El producto ha sido eliminado',
            showConfirmButton: false,
            timer: 1000
          })
          this.getProducts()
        },error=>{
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
