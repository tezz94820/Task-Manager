const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const notFound = require('./middlewares/Not-Found.js')
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware.js')

//connecting database
const { connectDB } = require('./db/connect.js')          //this returns a (connect) promise
require('dotenv').config()   ////it stores our connection  mobgodb URL and we .config() it in order to start it 


//middlewares
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)
app.use('*', notFound)          //set the function in the middlewares folder

app.use(errorHandlerMiddleware)



const port = process.env.PORT || 3000
//we made sure that first database connection happens and then only server starts
const start = async  () => {        //a async function because connectDb returns a promise which is asynchronous and app.listen is synchronous 
    try {
        await connectDB(process.env.MONGO_URI)       //in order to run the async function first we added await keyword . 
        app.listen(port , (req,res) => console.log(`server is Listening to port ${port}...`) )
        //in order to call something from .env file always use proces.env.variableName
    } catch (error) {
        console.log(error)
    }
}
start()         //call to start function





//app.get('/api/v1/tasks')                       --- get all the tasks
//app.post('/api/v1/tasks')                      --- create a new task
//app.get('/api/v1/tasks/:id')                  --- get single task
//app.patch('/api/v1/tasks/:id')                  --- update task
//app.delete('/api/v1/tasks/:id')                  --- delete task

//we used patch because just updates the specific elements but put it deletes the old one and makes the new updated docuent enter in database

