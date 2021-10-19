import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductManagement';
  display = false;
  Billing=true;
  UA=false;
 onPress() {
   if(this.Billing=true || this.UA==true){
    this.Billing= false;
    this.UA = false;
   }
   this.display = true;
 }
 

 onUA(){
   if (this.display==true || this.Billing==true){
    this.Billing= false;
    this.display= false;
   }
 this.UA=true
 }
 onBilling() {
  if(this.display=true || this.UA==true){
    this.display= false;
    this.UA = false;
   }
   this.Billing=true
 }
}
