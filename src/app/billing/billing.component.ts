import { Directive, AfterViewInit, ElementRef } from '@angular/core';
 
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';
import {HttpClient, HttpResponse} from '@angular/common/http'
import { productprice } from 'src/app/services/getproduct.service';
import {productdet,stockupdate} from 'src/app/details/product'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit,AfterViewInit  {
  public fieldArray: Array<{ProductName : String,Qvantity:number, price:Int16Array ,totalprice:number}> = [];
  newAttribute: any = {};
  productdet : stockupdate[];
  table : Array<{ProductName:String,pid:String,Qvantity:number, price:Int16Array ,totalprice:number}>=[];
 customers:any = {};
 tprice: any =0;
 field :any ;
len : any;
tabledata :any ;
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

  console.log(this.tabledata);
}


getprice(productid: String,qty:number) : any{
 
 this._productprice.getprod(productid).subscribe(
   data =>{
this.productdet=data;
if ( this.productdet[0]!= null ){
console.log( "product : ", this.productdet[0].Price)
  this.cal(this.productdet[0].Price,this.productdet[0].Product_Name,qty,productid)

}else{
   
  this._messageService.add({severity:'error', summary:'Status ', detail:'Producted Not Avaible '+productid});
}
   }
 );
 

  return  
}

cal(pricef : any,productname : any,qty:number ,pid:String){

  this.tprodprice = pricef* qty;
  this.sgst=(5/100);
  this.gst=  (this.tprodprice * this.sgst);
  this.fieldArray.push({ProductName : productname,Qvantity:this.quantity ,price:pricef,totalprice:this.tprodprice});
    this.len=this.fieldArray.length;
    this.tprice=this.tprice+this.tprodprice;
    this.table.push({ProductName:productname,pid:pid,Qvantity:qty, price:pricef ,totalprice:this.tprodprice});
    console.log("table ",this.table);     
    this.productid=null;
    this.quantity=null;
    this._messageService.add({severity:'success', summary:'Status ', detail:'Producted added '+productname});
}

deleteFieldValue(index,pric,pname){
  this.confirmationService.confirm({

      message: 'Record Need to delete ?',
      accept: () => {
          this.confirm(index,pric,pname)
      }
  });
}

confirm(index,pric,pname){
     console.log(" checking sbdjks",pname)
    this.fieldArray.splice(index, 1);
    this.table.splice(index,1);
    console.log(this.table);
    this.len=this.fieldArray.length;
    this.tprice=this.tprice-pric;
    this.sgst=(5/100);
    this.gst=(this.tprodprice * this.sgst);
    this._messageService.add({severity:'warn', summary:'Status ', detail:'Row Deleted :'+pname});
}

}
