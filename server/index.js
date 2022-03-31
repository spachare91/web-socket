// use cors so that do different ports can communicate....

const io=require('socket.io')(3000,{
    cors:{
        origin:["http://localhost:8080"]
    }
})

//this function in called whenever a client connects
// ON for server means something is comming from client
// EMIT means to send to all clients

io.on('connection',socket=>{
    console.log(`connected with id : ${socket.id}`);
    socket.on("send-message",(message,room)=>{
        // send message comming from an cient...to other clients
        if(room===''){
            socket.broadcast.emit("receive-message",message)
        }else{
            // useful for 1-1 communication....
            socket.to(room).emit("receive-message",message)
        }
        
        //console.log(message)
    })

    socket.on("join-room",(room,cb)=>{
        // joining to a particuar room....
        //one use can join mulitple rooms...
        socket.join(room)
        // send from client to server & server back to client......
        cb(`JOined room :${room}`)

    })
})