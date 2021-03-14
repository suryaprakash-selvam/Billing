import { Component, OnInit } from '@angular/core';

  import { productprice   } from 'src/app/services/getproduct.service';

import {HttpClient, HttpResponse} from '@angular/common/http'
import {ConfirmationService, MessageService, SortEvent} from 'primeng/api';
import {stockupdate} from 'src/app/details/product';
import { element } from 'protractor';

@Component({
  selector: 'app-update-availability',
  templateUrl: './update-availability.component.html',
  styleUrls: ['./update-availability.component.css']
})
export class UpdateAvailabilityComponent implements OnInit {
datas: stockupdate[];
one:any;
   public anyd: Array<{ProductName : String, product_id:string, price:Int16Array ,aval:number,lasaval:number}> = [];
 
  dialog:boolean;
  datass: any;
  Updatelav : number;
  products2: any;
  chachePid: stockupdate;
  chacheavs: number;
  router: any;
  constructor(private confirmationService: ConfirmationService,private http:HttpClient, private _messageService: MessageService,private _productprice:productprice) { 
  }

  ngOnInit(): void {
    
   this._productprice.getprodlst().subscribe(data =>{
   this.datas=data;
   
     
   })
  }

onRowEditInit(product: stockupdate) {
  console.log(product.Available_Stock)
  this.Updatelav=null;
  this.chachePid=product;
 
  this.dialog = true;

}

save(){
  console.log("djifj",this.chachePid)
console.log(this.chachePid.Product_Id ,"check",this.Updatelav,"andbd",this.chachePid.Available_Stock );
if(this.Updatelav != null && this.Updatelav!= 0){
  this.stockup(this.chachePid.Product_Id,this.chachePid.Available_Stock,this.Updatelav);
}else{
  this._messageService.add({severity:'warn', summary:'Status', detail:this.Updatelav+' is unable to add'});
}
}

 
  stockup(product_id:any , available_Stock:number,updateev:number){
  console.log(product_id,"1c",available_Stock,"2c",updateev)
  let url1="http://localhost:3005/stockupdating/"
  this.http.put(url1,{
    Pid:product_id,
    lastest_avaliabity:updateev,
    Available_Stock : available_Stock
    
   } ).subscribe(data => {

    this._messageService.add({severity:'success', summary:'Status ', detail:'Stock update for :' +product_id});
    console.log("suc  ",data);
    this.dialog=false
   this.ngOnInit()
    
   },(error) => {
    console.log("err ",error);
    this._messageService.add({severity:'error', summary:'error ', detail:'Check proper data :' +product_id});
   }

   )
}

onRowdeleteInit(Product){
  this.confirmationService.confirm({
    message: 'Record Need to delete ? ',
    accept: () => {
        this.confirs(Product)
    }
});

}
  confirs(Product: any) {
    console.log(Product);
this._productprice.delprod(Product).subscribe(data => {
  console.log("deleted rows",data)
  var temp = data;
  if (temp == "1"){
    this._messageService.add({severity:'success', summary:'Delete ', detail:'DELETED PRODUCT ID :' +Product});
    this.ngOnInit()
  }else {
    this._messageService.add({severity:'error', summary:'Delete ', detail:'Duplicate :' +Product});
  }
})
  }

}
