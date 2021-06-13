import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private BASE_URL = 'http://localhost:4000/api/inventory'

  constructor(private httpClient : HttpClient) { }

  updateInventory(inventory : Inventory){
    return this.httpClient.put(this.BASE_URL,inventory)
  }
}
