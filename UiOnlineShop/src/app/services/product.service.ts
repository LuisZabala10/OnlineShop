import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {Product} from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = 'http://localhost:4000/api/products/'

  constructor(private httpClient : HttpClient) { }

  getProducts(){
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }

  getProduct(code:string){
    return this.httpClient.get<Product>(`${this.BASE_URL}${code}`);
  }

  addProduct(product : Product){
    return this.httpClient.post<Product>(this.BASE_URL,product)
  }

  deleteProduct(code:string){
    return this.httpClient.delete(`${this.BASE_URL}${code}`)
  }

  editProduct(code:string,product : Product){
    return this.httpClient.put(`${this.BASE_URL}${code}`,product)
  }
}
