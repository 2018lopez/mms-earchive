
const express = require('express'),
    PORT = 3001,
    bodyParser = require('body-parser'),
    server = express(),
    session = require('express-session'),
    router = require('./router/router'),
    cors = require('cors')
    cookieParser = require("cookie-parser")
    fileupload = require("express-fileupload");
    
    dotenv=require('dotenv')
    dotenv.config()
    

    server.use(bodyParser.json())
          .use(bodyParser.urlencoded({extended : true}))
          .use(cors())
        .use(cookieParser())
        .use(express.static('public'))
        .use('/api',router)
        .use(fileupload({useTempFiles : true}))
        .listen(PORT,()=>console.log(
            `[+] server started on port ${PORT} 
            [http://localhost:${PORT}]`
        )
    )