import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})

export class FormProductComponent {
  formProduct: FormGroup;

  stockPattern : any = /^\d*$/;

  constructor(private formBuilder : FormBuilder) {
    // this.form = this.formBuilder.group({
    //   name: ['',[Validators.required,Validators.maxLength(80)]],
    //   description: ['',[Validators.required,Validators.maxLength(100)]],
    //   price: ['',[Validators.required,Validators.min(1)]],
    //   stock: [,[Validators.required,Validators.min(0),Validators.pattern(this.stockPattern)]],
    // });

    this.formProduct = this.createFormGroup();
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  save(){
    console.log(this.formProduct)
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
