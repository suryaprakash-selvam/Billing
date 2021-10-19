import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http'
import {MessageService} from 'primeng/api';
import { productprice } from 'src/app/services/getproduct.service';
import {productdet} from 'src/app/details/product'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  ProductID : number;
  Price:number
  la:string
  Remarks:string
  checked:boolean;
  cname:String
  cities: any[];
  productdet : productdet[];
  label:any;
  value:any;
  selectedCityCode: string;
  productdet1: any;
  status: string;


  constructor(private http:HttpClient, private _messageService: MessageService,private _productprice:productprice) { 
  
  }

  ngOnInit(): void {
    this.checked=false;
    this._productprice.getprodlst().subscribe(
      datas =>{
        this.productdet1=datas.data;
        console.log("checking data"+this.productdet1);
      }
    );

    this.checked=false;
  }
  postData(){
    console.log("checking data"+this.ProductID);
    if(this.checked == true){
       this.status="A";
    }else {
      this.status="B";
    }
    let url="http://localhost:3005/stockupdate/"
   this.http.post(url,{
    Pid:this.ProductID,
    Price:this.Price,
    lastest_avaliabity : this.la,
    Pname : this.Remarks,
    cname : "Surya"
   } ).subscribe(data => {
    console.log(data);
    this._messageService.add({severity:'success', summary:'Status ', detail:'Producted Added :' +this.ProductID});
   this.update(data);
   },(error)=>{
     console.log(error);
     this._messageService.add({severity:'error', summary:'error ', detail:'Producted Dupilcated :' + this.ProductID});
   });
  }
  
update(data:any){
  console.log(data)
  let url1="http://localhost:3005/produp/"
  this.http.post(url1,{
    ProductId:this.ProductID,
    Price:this.Price,
    ProductDes : this.Remarks,
    Remarks : "Surya",
    ProdStatus : this.status
   } ).subscribe(data => {

    this._messageService.add({severity:'success', summary:'Status ', detail:'Producted Added In Main :' +this.ProductID});
    console.log("suc  ",data);
    this.ProductID = null
    this.Price = null
     this.Remarks=null
     this.la=null
   },(error) => {
    console.log("err ",error);
    this._messageService.add({severity:'error', summary:'error ', detail:'Producted Dupilcated :' + this.ProductID});
   }

   )
}

}
