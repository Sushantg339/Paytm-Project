require('dotenv').config()
const app = require('./src/app')
const conntectToDb = require('./src/config/db');



conntectToDb()

app.listen(3000 , ()=>{
    console.log('server is running on port 3000')
})