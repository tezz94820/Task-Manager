const mongoose = require('mongoose')


//schema is the complete structure of your data to be passsed in database
const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[ true , 'Please provide a name'],
        trim:true,
        maxlength:[20 , 'name must be less than 20 characters']
    } , 
    completed : {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Task' , TaskSchema)    //Task is the name of the model and Taskschema is the schema
//we will send this to controllers where we operate the work of manipulating the data

//Task is the first collection in our database