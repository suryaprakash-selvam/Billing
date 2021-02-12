import { Component, OnInit } from '@angular/core';
import { productprice } from 'src/app/services/getproduct.service';

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
 
 
  productDialog: boolean;
  submitted: boolean;
  datass: any;
  clonedProducts: any;
  products2: any;
  constructor(private confirmationService: ConfirmationService,private http:HttpClient, private _messageService: MessageService,private _productprice:productprice) { 
  }

  ngOnInit(): void {
   this._productprice.getprodlst().subscribe(data =>{
   this.datas=data;
    for (let i=0 ; i < this.datas.length ;i++){
      console.log("listed datas : ",this.datas[i].Product_Name);
       this.one=this.datas[1].Product_Name;
      this.update(this.datas[i].Product_id,this.datas[i].Product_id,this.datas[i].Price,this.datas[i].Available_Stock,this.datas[i].lastest_avaliabity);
    }
     
   })
  }

  update(Product_Name: string, Product_id: any, Price: Int16Array, Available_Stock: number, lastest_avaliabity: number) {
    this.anyd.push({ProductName : Product_Name, product_id:Product_id, price:Price ,aval:Available_Stock,lasaval:lastest_avaliabity})
  //  console.log(" uypatdvbcfjif ",this.anyd)
  }

onRowEditInit(product: stockupdate) {
  console.log(product)
  this.clonedProducts[product.id] = {...product};
}

onRowEditSave(product: stockupdate) {
  if (product.Price ) {
      delete this.clonedProducts[product.id];
      this._messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
  }  
  else {
      this._messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
  }
}

onRowEditCancel(product: stockupdate, index: number) {
  this.products2[index] = this.clonedProducts[product.id];
  delete this.clonedProducts[product.id];
}
}
