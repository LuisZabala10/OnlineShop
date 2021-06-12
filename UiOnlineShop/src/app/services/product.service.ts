import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Product} from '../product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  getProducts(){
    return this.httpClient.get<Product[]>('http://localhost:4000/api/products/');
  }
}
