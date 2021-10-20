
const express = require('express')
const router= express.Router()
const feild =require('../models/field')

router.get('/', async(req,res)=>{
    console.log('data is called')
    try{
        
       const allfeild= await feild.find()
       res.json(allfeild)
    }catch(err){
        res.send('error' , err)
    }
})


router.post('/',async(req,res) =>{
  const addfeild=new feild(
    {
      requestName:req.body.requestName,
requestDescripition:req.body.requestDescripition,
modelName:req.body.modelName,
modelType:req.body.modelType,
staffMember:req.body.staffMember,
contrator:req.body.contrator,
crDocument:req.body.crDocument, 
selectedDate:req.body.selectedDate,
       additionalDescription:req.body.additionalDescription 
    }
  )

  console.log("checking "+ addfeild);
  try{
      const result = await addfeild.save()
    res.json(result)
  }catch(err){
      res.send('error'+err)
  }
})


module.exports=router