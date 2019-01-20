import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from "@angular/router";
import { StorageService } from '../../services/storage.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css']
})
export class SizesComponent implements OnInit, AfterContentChecked {
  //
  loading = true;

  sizes = [
    {'id': 1,'name': 'Mega', 'num': '19', 'portions': '16'},
    {'id': 2,'name': 'Familiar', 'num': '16', 'portions': '9'},
    {'id': 3,'name': 'Personal', 'num': '10', 'portions': '4'}
  ];

	selected:any = this.sizes[0];
  
  constructor(
  	private storage:StorageService,
  	private router: Router
  ) { }

  ngOnInit() {
    if( this.storage.get('size') ) {
      this.selected = this.storage.get('size');
    }

    $("#menu-slider").removeClass('bg-blue');
  }

  ngAfterContentChecked() {
    this.loading = false;
  }

  selectSize(size) {
  	this.selected = size;
  }

  next() {
  	// Guardamos en el LocalStorage.
  	this.storage.set('size', this.selected);

  	// Mandamos a la siguiente pagina.
  	this.router.navigate(['/type']);
  }

}
