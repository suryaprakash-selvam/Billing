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
  
  requestName:string;
  requestDescripition:string;
  modelName:string;
  modelType:string;
  staffMember:string;
  contrator:string;
  crDocument:string;
  date:Date;
  additionalDescription:string;
  selectedDate: any;
  
  modalnamedrp:any[]=[];
  modeltypedrp:any[] =[];
  staffmemberdrp:any[]=[];
  contractor:any[]=[];
    constructor(private http:HttpClient, private _messageService: MessageService,private _productprice:productprice) { 
  
  }




  ngOnInit() : void {

    this.modalnamedrp = [
      {name: '--Select--', code: ''},
      {name: 'Halo-Model1', code: 'Halo-Model1'},
      {name: 'Orbitor', code: 'Orbitor'},
      {name: 'PPM', code: 'PPM'},
      {name: 'Rover Model1', code: 'Rover Model1'}
  ]
    this.modeltypedrp =[
      {name: '--Select--', code: ''},
      {name: 'Abstract1', code: 'Abstract1'},
      {name: 'Abstract2', code: 'Abstract2'},
      {name: 'Abstract3', code: 'Abstract3'},
    ]

    this.staffmemberdrp =[
      {name: '--Select--', code: ''},
      {name: 'Soon', code: 'Soon'},
      {name: 'Shanmuk', code: 'Shanmuk'}
    ]

    this.contractor=[
      {name: '--Select--', code: ''},
      {name: 'NASA', code: 'NASA'}
    ]
  }


mdlname(event){
  console.log("log :"+ JSON.stringify(event.value.name))
  this.modelName=event.value.name
}
mdltype(event){
  console.log("log :"+ JSON.stringify(event.value.name))
  this.modelType=event.value.name
}
staffmember(event){
  console.log("log :"+ JSON.stringify(event.value.name))
  this.staffMember=event.value.name
}
contrac(event){
  console.log("log :"+ JSON.stringify(event.value.name))
  this.contrator=event.value.name
}


  postData(){
    let url="http://localhost:3030/form"
   this.http.post(url,{
    requestName:this.requestName,
requestDescripition:this.requestDescripition,
modelName:this.modelName,
modelType:this.modelType,
staffMember:this.staffMember,
contrator:this.contrator,
crDocument:this.crDocument,
selectedDate:this.selectedDate,
additionalDescription:this.additionalDescription
   } ).subscribe(data => {
    console.log(data);
    this._messageService.add({severity:'success', summary:'Status ', detail:'Producted Added :' +this.requestName});
   this.update(data);
   },(error)=>{
     console.log(error);
     this._messageService.add({severity:'error', summary:'error ', detail:'Producted Dupilcated :' + this.requestName});
   });
  }
  
update(data:any){
  console.log(data)
    console.log("suc  ",data);
    this.requestName=null
    this.requestDescripition=null
    this.modelName=null
    this.modelType=null
    this.staffMember=null
    this.contrator=null
    this.crDocument=null
    this.selectedDate=null
    this.additionalDescription=null
  
}

}
