import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../../theme/cart/cart.component';
import { Router } from "@angular/router";
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-escorts',
  templateUrl: './escorts.component.html',
  styleUrls: ['./escorts.component.css']
})
export class EscortsComponent implements OnInit {

  escorts = [
    { 'name': 'Pepitos horneados', slug: 'pepitos-horneados', loading: false },
    { 'name': 'Buffalos wings', slug: 'buffalo-wings-boneless', loading: false },
    { 'name': 'Acompañantes', slug: 'acompanamientos', loading: false },
    { 'name': 'Bebidas', slug: 'acompanamientos', loading: false },
    { 'name': 'Salsas y aderesos', slug: 'salsas-y-aderezos', loading: false },
    { 'name': 'Postres', slug: 'postres', loading: false },
  ];

  products = new Array();

  constructor(private cart: CartComponent, private router: Router) { }

  ngOnInit() {
    //
    $("#menu-slider").addClass('bg-blue');
    //
    for (var i = 0; i < this.escorts.length; ++i) {
      //
      this.getProducts(this.escorts[i]);
    }
  }

  getProducts(escort:any) {
    escort.loading = true;
    //
    $.get("http://pizzaandwings.com.pa/api/get_products_category/?cat=" + escort.slug, 
      (data, status) => {
          if( status == "success" ) {
            escort.loading = false;
            //console.log('products::' + escort.slug )
            this.products[escort.slug] = data.products;
            //
            //console.log(this.products);

          }
      });
  }

  restar(item) {
    if( item.cantidad > 0 ) {
      item.cantidad -= 1;
      //
      $.get("http://pizzaandwings.com.pa/api/set_cant_item_cart/?product=" + item.key + "&quantity=" + item.cantidad, 
        (data, status) => {
          this.cart.restar();       
        });
    }
  }

  sumar(item) {
    if( item.cantidad < 100 ) {
      item.cantidad += 1;
      //
      $.get("http://pizzaandwings.com.pa/api/add_cart/?product=" + item.id + "&quantity=1", 
        (data, status) => {
          console.log('sumar:log');
          //console.log(data);
          //console.log(status);
          item.key = data['cart_item_id'];  

          this.cart.sumar();   
      });

      
    }
  }

  getCantidad(item) {
    if( !item.cantidad ) {
      item.cantidad = 0;
    }
    //
    return item.cantidad;
  }

  next() {
  	// Mandamos a la siguiente pagina.
  	this.router.navigate(['/finish']);
  }

}
