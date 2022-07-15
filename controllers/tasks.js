const Task = require('../models/Task.js')       //this is a model
//an instance of model is a document

const asyncWrapper = require('../middlewares/async');


//to get  all the task
const getAllTasks = asyncWrapper( async (req,res) => {
        const tasks = await Task.find({})       //an empty find returns all the documents.liten find does not return a promise but still you can just consider it as asynchronous function and use async and await
        res.status(200).json({tasks})
})

//create NEw Task
const createTask = asyncWrapper( async (req,res) => {
        const task = await Task.create(req.body)    //task return a promise .so make to add await keyword so that first task runs and then the synchronous function res.status and all will run
        //here we are making an instance of model which is used to create new documents in Task collection
        res.status(201).json({ task })
        //returning the task which we recently added into database
        //while testing you can pass anything but only according to your scghema only the dta is to be sent
})


//getTaskbyID
const getTask = asyncWrapper( async (req,res) => {
        const {id:taskID} = req.params          //we took the id from params and stored it in taskID variable
        const task = await Task.findOne({_id:taskID})       //find one is a mongoose query which does not return a promise but still we can use async/await
        //findOne searches for a particular id or any other property which is given it as object. // here we are checking the _id i n database is same as the id passed from user i.e taskID 
        if(!task)
            return res.status(404).json({msg: `no task with id ${taskID}`});
        res.status(201).json({task}) //finally displaying td given by the user
})

//DeleteTask
const deleteTask = asyncWrapper( async (req,res) => {
        const {id : taskID} = req.params
        const task = await Task.findOneAndDelete( {_id:taskID})     //it finds one and delete it 
        if(!task)
            return res.status(400).json({message: "Task not found"})
        
        // res.status(201).json({task}) //finally displaying td given by the user
        //as it it a delete task you can send the json 
        //or
        res.status(200).send()    ////you can send nothingbut a status of success
        //or
        // res.status(200).send({task:null , status:'success'})
})


//updateTask
const updateTask = asyncWrapper( async (req,res) => {
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID} , req.body , {
            new:true,
            runValidators: true
        })
        //here first parameter is for finding the id ...second arameter is for updating the message by req.body and ...3rd parameter is options
        //new is set sp that we get the updated value in the task whereas before setting new:true task always get the old vvalues but now we get task with new values
        //runvalidators is to run the validators which are set while declaring schemas
        if(!task)
                return res.status(400).json({message: "Task not found"})
        res.status(200).json( task )
})





module.exports = { getAllTasks ,createTask , getTask , updateTask , deleteTask }