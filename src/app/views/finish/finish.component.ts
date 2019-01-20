import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  nonce:any;
  loading = true;

  constructor(private http: HttpClient) { 
    // Obtenemos el nonceID
    $.get("http://pizzaandwings.com.pa/api/get_nonce/?nonce=update-shipping-method",
      (data, status) => {
        console.log("obtenemos el nonceID");
        console.log(data);
        console.log(status);
        this.nonce = data.nonce;
        this.loading = false;
      })
  }

  ngOnInit() {
  	$("#menu-slider").addClass('bg-blue');
  }

  restaurant() {
    $.post("http://pizzaandwings.com.pa/?wc-ajax=update_shipping_method", {
      'security': this.nonce,
      'shipping_method[0]':'local_pickup:1' //local_pickup:1
    }, (data, status) => {
        console.log("Comer en el restaurant");
        console.log(data);
        console.log(status);
        window.location.href='http://pizzaandwings.com.pa/checkout/';
    })
  }

  delivery() {
    $.post("http://pizzaandwings.com.pa/?wc-ajax=update_shipping_method", {
      'security': this.nonce,
      'shipping_method[0]':'free_shipping:2' //free_shipping:2
    }, (data, status) => {
        console.log("Delivery");
        console.log(data);
        console.log(status);
        window.location.href='http://pizzaandwings.com.pa/checkout/';
    })
  }



}
