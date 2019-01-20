import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(key ,JSON.stringify(value));
  }

  get(key: string):any {
  	return JSON.parse(localStorage.getItem(key));
  }

  find(object, key, value) {
    JSON.parse(object, function (k, v) {
      if(k === "") return v;     // if topmost value, return it,
      return v * 2;              // else return v * 2.
    });  
  }

  push(key: string, value: any):any {
    // Obtenemos el valor
    var data = this.get(key);
    
    if( data !== undefined && data !== null ) {
      // Añadimos el valor
      data.push(value);
    } else {
      //
      data = [];
      // Añadimos el valor
      data.push(value);
    }
    //
    this.set(key, data);
    //
    return data;
  }

  delete(key: string) {
  	localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
