
const { json, response } = require('express');
const express = require('express');
var bodyParser = require('body-Parser');
const app = express();
const mysql = require('mysql');
var dateTime = require('node-datetime');
var dt = dateTime.create();

app.use(bodyParser.json());

app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    next();
  });

app.get('/pro/:id',(req, res) =>{
 
  //  console.log("pro with id of " + req.params.id);

    const connect=mysql.createConnection({
        host:'localhost', 
        port: 3306,
        user:'root',
        password:'root',
        database:'textlies'
        
    })

    const queryString="SELECT * FROM stock_manager where product_id=?"
connect.query( queryString,[req.params.id],(err, rows, fields) => {
    if (err){
        console.log(err)
        res.status(500).send({message: 'errored rows'});
       return 
    }
    console.log("db gots connected" + json(rows))
    res.json(rows)
})
    
})


app.get('/productlst/',(req, res) =>{
 
    //  console.log("pro with id of " + req.params.id);
  
      const connect=mysql.createConnection({
          host:'localhost', 
          port: 3306,
          user:'root',
          password:'root',
          database:'textlies'
          
      })
  
      const queryString="SELECT * FROM stock_manager"
  connect.query( queryString,(err, rows, fields) => {
      if (err){
          console.log(err)
          res.status(500).send({message: 'errored rows'});
         return 
      }
      console.log("db gots connected" + json(rows))
      res.json(rows)
  })
      
  })
  
  

app.get('/Billnumber/',(req, res) =>{
 
    //  console.log("pro with id of " + req.params.id);
  
      const connect=mysql.createConnection({
          host:'localhost', 
          port: 3306,
          user:'root',
          password:'root',
          database:'textlies'
          
      })
  
      const queryString="select max(Bill_Number) from textlies.bill_details;"
  connect.query( queryString,(err, rows, fields) => {
      if (err){
          console.log(err)
          res.sendStatus(500)
         return 
      }
      console.log("db gots connected" + json(rows))
      res.json(rows)
  })
      
  })


  app.post('/ProdUp',(req, res) =>{

   
      const connect=mysql.createConnection({
          host:'localhost', 
          port: 3306,
          user:'root',
          password:'root',
          database:'textlies'
      })
      
    var formatted = dt.format('Y-m-d');
var Prod_Id=req.body.ProductId;     
var prod_dec=req.body.ProductDes;
var prod_Status=req.body.ProdStatus;
var Price=req.body.Price;
var cname=req.body.Remarks;
  var Values = [[Prod_Id, Price,prod_dec, prod_Status,formatted, cname]];

 const queryString="INSERT INTO `textlies`.`product_det` (`Product_id`, `Price`, `Product_Des`, `gst_status`,`Created_date`, `Company_Name`) VALUES ?;"
  connect.query( queryString,[Values],(err,result) => {
      if (err){
          console.log(err)
         return res.status(501).send(err)
      }
      console.log("db gots connected ins one data" +result.affectedRows )
      res.status(201).send(result);
  })
  })


  app.post('/stockupdate/',(req, res) =>{
 
    //  console.log("pro with id of " + req.params.id);
  
      const connect=mysql.createConnection({
          host:'localhost', 
          port: 3306,
          user:'root',
          password:'root',
          database:'textlies'
          
      })
   var   Product_Id =req.body.Pid;
   var  Price = req.body.Price;
   var  lastest_avaliabity = req.body.lastest_avaliabity;
   var Available_Stock =req.body.lastest_avaliabity;
   var  updated_date = dt.format('Y-m-d');
   var  Created_date = updated_date;
   var  Product_Name = req.body.Pname;
   var  Created_By = req.body.cname;
   var  Updated_By=req.body.cname; 
      var Values = [[Product_Id,Price,lastest_avaliabity,Available_Stock,updated_date,Created_date,Product_Name,Created_By,Updated_By]]
      const queryString="INSERT INTO `textlies`.`stock_manager` (`Product_Id`, `Price`, `lastest_avaliabity`, `Available_Stock`, `updated_date`, `Created_date`, `Product_Name`,`Created_By`, `Updated_By`) VALUES ?;"
  connect.query( queryString,[Values],(err, result) => {
      if (err){
          console.log(err)

          return res.status(501).send(err)
      }
      console.log("db gots connected" +result )
      res.status(201).send(result);
  })
  })

  
  app.put('/stockupdating/',(req, res) =>{
 
    console.log("pro with id of " + req.body.id);
  
      const connect=mysql.createConnection({
          host:'localhost', 
          port: 3306,
          user:'root',
          password:'root',
          database:'textlies'

      })
   var   Product_Id =req.body.Pid;
   var  lastest_avaliabit = req.body.lastest_avaliabity;
   var Available_Stoc =req.body.Available_Stock;
   
   var avil= parseInt(lastest_avaliabit) + parseInt(Available_Stoc);
   console.log ("avil :",avil)
   const queryString="update stock_manager set lastest_avaliabity =?,Available_Stock =? where Product_Id=?;"
  connect.query( queryString,[lastest_avaliabit,avil,Product_Id],(err, result) => {
      if (err){
          console.log(err)
          return res.status(501).send(err)
      }
      console.log("db gots connected" +result )
      res.json(result)
  })
  })

app.listen(3005, ()=>{
    console.log("server is on")
})