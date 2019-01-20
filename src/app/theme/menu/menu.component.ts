import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart, Event as NavigationEvent} from '@angular/router';

import { StorageService } from '../../services/storage.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu = [
  	{ name: 'Tamaño', route: '/sizes', index: 0 },
  	{ name: 'Tipo de Pizza', route: '/type', index: 1 },
  	{ name: 'Duplica tu pizza', route: '/duplicate', index: 2 },
  	{ name: 'Acompañantes', route: '/escorts', index: 3 },
  	{ name: 'Finalizar orden', route: '/finish', index: 4 },
  ];
  test;
  selected:any;
  currentUrl: string = '/';

  constructor(private storage:StorageService,private router: Router, private location: Location) { 
    router.events.forEach((event: NavigationEvent) => {
        if(event instanceof NavigationStart) 
        {
            this.currentUrl = event.url;

            this.selected = this.menu.find(item => {
               return item.route == this.currentUrl
            })
        }
    });

    
  }

  ngOnInit() {
    //this.selected = this.menu[0];

    this.selected = this.menu.find(item => {
       return item.route == this.location.path()
    })
  }

  prevMenu() {
    if( this.selected.index > 0 ) {
        let index = this.selected.index - 1;
        // Verificamos
        if( this.selected.index === 2 ){
          if(! this.storage.get('pizza') ) {
            // Mandamos a que arme la pizza.
            let index = this.selected.index - 2;
          }
        }
        //
        this.selected = this.menu[index];
        this.router.navigate([this.selected.route]);
    }
  }

  nextMenu() {
    if( this.selected.index < 4 ) {
      // Verificamos
      let index = this.selected.index + 1;
      //
      // tamaño
      if( this.selected.index === 0 ){
        if(! this.storage.get('size') ) {
          // 
          index = this.selected.index;
        } else {
          // Simulamos el click
          $('#sizeReady')[0].click();
          //document.getElementById("saveSize").click();
        }
      }
      // type
      if( this.selected.index === 1 ){
        if(! this.storage.get('pizza') ) {
          // 
          index = this.selected.index;
        } else {
          // Simulamos el click
          $('#typeReady')[0].click();
          //document.getElementById("typeReady").click();
          return true;
        }
      }
      
      // duplicate
      if( this.selected.index === 2 ){
        if(! this.storage.get('pizza') ) {
          // Mandamos a que arme la pizza.
          index = this.selected.index + 2;
        } else {
          // Simulamos el click
          $('#duplicateReady')[0].click();
          //document.getElementById("duplicate").click();
          return true;
        }
      }

      this.selected = this.menu[index];
      this.router.navigate([this.selected.route]);
    }
  }

}
