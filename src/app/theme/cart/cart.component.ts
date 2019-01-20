import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

declare var $:any;

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartCount:number = 0;

  constructor() { }

  ngOnInit() {
  	$.get("http://pizzaandwings.com.pa/api/get_cart_contents_count", 
      (data, status) => {
          if( status == "success" ) {
           this.cartCount = data;
          }
      });
  }

  sumar() {
    if( this.cartCount < 100 ) {
    	return this.cartCount += 1;  
  	  
    }
  }

  restar() {
    if( this.cartCount > 0 ) {
  	  return this.cartCount -= 1;
    }
  }


}
