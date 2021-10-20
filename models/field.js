const mongoose = require('mongoose')


const feildSchema = new mongoose.Schema({
    requestName:String,
    requestDescripition:String,
    modelName:String,
    modelType:String,
    staffMember:String,
    contrator:String,
    crDocument:String,
    selectedDate:String,
    additionalDescription:String
})

module.exports = mongoose.model('feild',feildSchema)