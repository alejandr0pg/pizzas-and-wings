import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:any = {
    data: {
      user_login: ''
    }
  };
  guest = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	return this.http.get('http://pizzaandwings.com.pa/api/get_nonce/?get_current_user=true').subscribe((response:any) => {
        console.log('Response is ', response);
        if(response.status == "ok") {
          if(response.user) {
            this.user = response.user;
            this.guest = false;
          }
        }
    });
  }

}
