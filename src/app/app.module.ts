import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './theme/menu/menu.component';
import { FooterComponent } from './theme/footer/footer.component';
import { CartComponent } from './theme/cart/cart.component';
import { AccountComponent } from './theme/account/account.component';
import { SizesComponent } from './views/sizes/sizes.component';
import { TypeComponent } from './views/type/type.component';
import { DuplicateComponent } from './views/duplicate/duplicate.component';
import { EscortsComponent } from './views/escorts/escorts.component';
import { FinishComponent } from './views/finish/finish.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

import { StorageService } from './services/storage.service';

import { dragula, DragulaModule } from 'ng2-dragula/ng2-dragula';


const routes: Routes = [
	{ path: '', redirectTo:'/sizes', pathMatch: 'full' },
	{ path: 'sizes', component: SizesComponent },
	{ path: 'type', component: TypeComponent },
	{ path: 'duplicate', component: DuplicateComponent },
	{ path: 'escorts', component: EscortsComponent },
	{ path: 'finish', component: FinishComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/sizes" }
];

@NgModule({
  declarations: [
    SizesComponent,
    FooterComponent,
    AppComponent,
    MenuComponent,
    TypeComponent,
    DuplicateComponent,
    EscortsComponent,
    FinishComponent,
    NotFoundComponent,
    CartComponent,
    AccountComponent
  ],
  imports: [
    DragulaModule,
  	RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    StorageService,
    CartComponent,
    AccountComponent
  ],  
  bootstrap: [AppComponent, MenuComponent, FooterComponent, CartComponent, AccountComponent]
})
export class AppModule { }
