// require socket.io and pass port number

const io = require('socket.io')(3000,{
    cors:{
        
    }
})


// runs every single time when client connects to a server....
io.on('connection',socket=>{
    console.log(socket.id)
})