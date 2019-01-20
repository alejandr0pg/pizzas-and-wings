import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from '../../services/storage.service';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-duplicate',
  templateUrl: './duplicate.component.html',
  styleUrls: ['./duplicate.component.css']
})
export class DuplicateComponent implements OnInit, AfterContentChecked {

  cantidad = 0;
  new = 'NO';
  pizza:any;
  order:any;
  loading = true;

  constructor(
    private storage:StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    $("#menu-slider").removeClass('bg-blue');

    // Obtenemos la pizza
    if( this.storage.get('pizza') ) {
      this.pizza = this.storage.get('pizza');
    } else {
      // Mandamos a que arme la pizza.
      this.router.navigate(['/type']);
    }
  }

  ngAfterContentChecked() {
    this.loading = false;
  }

  sumar() {
    if( this.cantidad < 100 ) {
      this.cantidad += 1;
    }
  }

  restar() {
    if( this.cantidad > 0 ) {
      this.cantidad -= 1;
    }
  }

  toggle(){
    if( this.new == 'SI' ){
      this.new = 'NO';
    } else {
      this.new = 'SI';
    }
  }

  next() {
    // Le damos formato a la orden
    this.order = {
      object: this.pizza,
      cantidad: 1 + this.cantidad
    }

    let path = "http://pizzaandwings.com.pa/api/add_cart/";
    let producto = "?product=" + this.pizza.producto_id;
    let cantidad = "&quantity=" + this.order.cantidad;

    $.get(path + producto + cantidad, 
      (data, status) => {
        
        console.log(data);
        console.log(status);

        this.order.item_id = data.cart_item_id;
        // Guardamos en el LocalStorage.
        this.storage.push('order', this.order);
        // Borramos el cache.
        this.storage.delete('pizza');
        this.storage.delete('size');
        if( this.new === 'SI' ) {
          // Mandamos a que escoja el tamaño.
          this.router.navigate(['/sizes']);
        } else {
          // Mandamos a la siguiente pagina
          this.router.navigate(['/escorts']);
        }
      })

    
  }



}
