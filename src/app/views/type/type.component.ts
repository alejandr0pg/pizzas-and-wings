import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { DragulaService } from 'ng2-dragula';
import { Router } from "@angular/router";
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit, OnDestroy {

  loading = true;

  size:any;
  bandeja:any[] = [];

  pizza:any = {
    flavors: [],
    portions: 0,
    size: {},
    producto_id: 0
  }

  types = [
    { id: 1, name: 'Clásica' },
    { id: 2, name: 'Especial' },
    { id: 3, name: 'Combinada' }
  ];

  selected:any = { id: 1, name: 'Clásica', index: 0 };

  clasicos:any[] = [
    { id:1, name:"Pollo", img: 'http://localhost:4200/assets/img/pizzas/1-09.png', picture: 'http://localhost:4200/assets/img/pizzas/pollo.png', type: '1'},
    { id:2, name:"Peperoni", img: 'http://localhost:4200/assets/img/pizzas/1-10.png', picture: 'http://localhost:4200/assets/img/pizzas/peperoni.png', type: '1'},
    { id:3, name:"Hawaiana", img: 'http://localhost:4200/assets/img/pizzas/1-11.png', picture: 'http://localhost:4200/assets/img/pizzas/hawaiana.png', type: '1'},
    { id:4, name:"Doble queso", img: 'http://localhost:4200/assets/img/pizzas/1-12.png', picture: 'http://localhost:4200/assets/img/pizzas/2quesos.png', type: '1'},
  ];

  especiales:any[] = [
    { id:5, name:"Especial P&W", img: 'http://localhost:4200/assets/img/pizzas/1-16.png', picture: 'http://localhost:4200/assets/img/pizzas/especialp&w.png', type: '2'},
    { id:6, name:"Cuatro quesos", img: 'http://localhost:4200/assets/img/pizzas/1-15.png', picture: 'http://localhost:4200/assets/img/pizzas/4quesos.png', type: '2'},
    { id:7, name:"Vegetariana", img: 'http://localhost:4200/assets/img/pizzas/1-14.png', picture: 'http://localhost:4200/assets/img/pizzas/vegetariana.png', type: '2'},
    { id:8, name:"Carbonara", img: 'http://localhost:4200/assets/img/pizzas/1-13.png', picture: 'http://localhost:4200/assets/img/pizzas/carbonara.png', type: '2'},
  ];

  constructor(
    private storage:StorageService,
    private router: Router, 
    private dragulaService: DragulaService) { 
    dragulaService.drop.subscribe((value) => {
      //console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.dropModel.subscribe((value:any) => {
      this.onDropModel(value.slice(1));
    });
  }

  ngOnInit() {
    // Borramos el cache anterior
    this.storage.delete('pizza');
    //
    $("#menu-slider").removeClass('bg-blue');

    if( this.storage.get('size') ) {
      this.size = this.storage.get('size');
    } else {
      // Mandamos a seleccionar el tamaño.
      this.router.navigate(['/sizes']);
    }

    this.dragulaInit();

    this.loading = false;
  }

  ngOnDestroy() {
    this.dragulaService.destroy('flavors');
  }

  dragulaInit() {
    this.pizza = {
      flavors: [],
      portions: 0,
      size: {}
    }

    this.dragulaService.setOptions('flavors', {
      copy: (el, source)=>{
        //
        return true;
      },
      accepts: (el, target, source, sibling) => {
        // Validamos las porciones
        return !this.validate('finish') && this.validate('is_target', target);
      }
    });
  }

  reset(){
    this.bandeja = [];
    this.pizza = {
      flavors: [],
      portions: 0,
      size: {}
    }
  }

  prevCategory() {
    if( this.selected.index > 0 ) {
      let index = this.selected.index - 1;
      this.selectType(this.types[index]);
      this.selected.index = index;
    }
  }

  nextCategory() {
    if( this.selected.index < 2 ) {
      let index = this.selected.index + 1;
      this.selectType(this.types[index]);
      this.selected.index = index;
    }
  }

  selectType(type) {
    this.selected = type;
    this.reset();
  }

  validate(rule, object:any = {}) {
    switch (rule) {
      case "is_target": {
          if( object.id === "drag" ) {
            return true;
          } else {
            return false;
          }
        
      }
      case "finish": {
        if( this.pizza.portions < this.size.portions) {
          return false;
        } else {
          return true;
        }
        
      }
      default: {
        console.log("Invalid choice");
        
      }
    }
  }

  private onDrop(args) {
    let [el, target, source] = args;
    // do something
    if(target && target.id === "drag") {
      this.pizza.portions += 1;
    }
  }

  private onDropModel(args:any):void {
    let [el, target, source] = args;
    // Agregamos los sabores a un arreglo para que 
    // luego sea enviado al servidor para hacer el pedido.
    this.pizza.flavors.push(el.dataset);    
  }

  delete(index) {
    this.bandeja.splice(index, 1);
    this.pizza.flavors.splice(index, 1);
    this.pizza.portions -= 1;
  }

  next() {
    // Establecemos el tamaño
    this.pizza.size = this.size;
    this.pizza.type = this.selected;

    if( this.selected.id === 1 ) {
    	if( this.size.id === 1 ) {
    		this.pizza.producto_id = 2548;
    	}
    	if( this.size.id === 2 ) {
    		this.pizza.producto_id = 2549;
    	}
    	if( this.size.id === 3 ) {
    		this.pizza.producto_id = 2550;
    	}
    }else if( this.selected.id === 2 ||  this.selected.id === 3 ) {
    	if( this.size.id === 1 ) {
    		this.pizza.producto_id = 2551;
    	}
    	if( this.size.id === 2 ) {
    		this.pizza.producto_id = 2552;
    	}
    	if( this.size.id === 3 ) {
    		this.pizza.producto_id = 2553;
    	}
    }
    // Guardamos en el LocalStorage.
    this.storage.set('pizza', this.pizza);
    // Mandamos a la siguiente pagina.
    this.router.navigate(['/duplicate']);
  }

  addFlavor(item) {
    if(this.pizza.portions < this.size.portions) {
      this.bandeja.push(item);
      this.pizza.flavors.push(item);
      this.pizza.portions += 1;
    }
  }

}
