const mongoose = require('mongoose')
//we have moved the connection url to .env file

//change the password to your password and add your database name after/ and before ? i.e /task-manager?


const connectDB = url => {
    mongoose.connect(url)      //this function is returning a promise
}

module.exports = {connectDB}





//here server is listening first and then we are connecting to database but the above meyhod  that is we made  an function and sent to app.js and now first
//first we will connect tp database and only then we will listen to server.

// mongoose
//     .connect(connectionString)
//     .then( () => console.log('Connected to database'))
//     .catch( (error) => console.log(error))
