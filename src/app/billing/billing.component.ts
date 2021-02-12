import { Directive, AfterViewInit, ElementRef } from '@angular/core';
 
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import {HttpClient, HttpResponse} from '@angular/common/http'
import { productprice } from 'src/app/services/getproduct.service';
import {productdet} from 'src/app/details/product'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit,AfterViewInit  {
  public fieldArray: Array<{ProductName : String,Qvantity:number, price:number ,totalprice:number}> = [];
  newAttribute: any = {};
  productdet : productdet[];
 customers:any = {};
 tprice: any =0;
 field :any ;
len : any;
 public productid:any;
 public quantity: any;
  tprodprice: number;
  gst: number =0;
  sgst: number;
  constructor(private confirmationService: ConfirmationService, private _messageService: MessageService , private http:HttpClient,private _productprice:productprice,private el: ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
 
  ngOnInit(): void {
    
  }
  
  addFieldValue() {

    if(this.productid==null|| this.productid==""){
      this._messageService.add({severity:'error', summary:'Validation ', detail:'Enter the ProductID'});
    }else if(this.quantity==null) {
      this._messageService.add({severity:'error', summary:'Validation ', detail:'Enter the quantity'});
    }else if (this.productid!=null||this.quantity!=null){
       this.getprice(this.productid,this.quantity);
  }
}


getprice(productid: String,qty:number) : any{
 
 this._productprice.getprod(productid).subscribe(
   data =>{
this.productdet=data;
if ( this.productdet[0]!= null ){
console.log( "product : ", this.productdet[0].Price)
  this.cal(this.productdet[0].Price,this.productdet[0].Product_Des,qty)

}else{
   
  this._messageService.add({severity:'error', summary:'Status ', detail:'Producted Not Avaible '+productid});
}
   }
 );
 

  return  
}

cal(pricef : number,productname : any,qty:number){

  this.tprodprice = pricef * qty;
  this.sgst=(5/100);
  this.gst=  (this.tprodprice * this.sgst);
  this.fieldArray.push({ProductName : productname,Qvantity:this.quantity ,price:pricef,totalprice:this.tprodprice});
    this.len=this.fieldArray.length;
    this.tprice=this.tprice+this.tprodprice;        
    this.productid=null;
     this.quantity=null;
     this._messageService.add({severity:'success', summary:'Status ', detail:'Producted added '+productname});
}

deleteFieldValue(index,pric){
  this.confirmationService.confirm({

      message: 'Record Need to delete ?',
      accept: () => {
          this.confirm(index,pric)
      }
  });
}

confirm(index,pric){
    this.fieldArray.splice(index, 1);
    this.len=this.fieldArray.length;
    this.tprice=this.tprice-pric;
    this.gst=  (this.tprodprice * (100/5));
    this._messageService.add({severity:'warn', summary:'Status ', detail:'Row Deleted '});
}

}
