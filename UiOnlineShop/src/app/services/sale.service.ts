import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Sale } from '../sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private BASE_URL = 'http://localhost:4000/api/sales/'

  constructor(private httpClient: HttpClient) { }

  saveSale(sale : Sale){
    return this.httpClient.post(this.BASE_URL,sale)
  }

}
