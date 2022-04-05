// use cors so that do different ports can communicate....

const io=require('socket.io')(3000,{
    cors:{
        origin:["http://localhost:8080"]
    }
})

let users = [];
// dummy admin....adn user
  //users.push({userId:"d51d4a56-4ed1-45ce-b4e9-1e57a2e2d261",socketId:"z83qHl9XBgG80mdpAAAB"})
 // users.push({userId:"d51d4a56-4ed1-45ce-b4e9-1e57a2e2d259",socketId:"9HfX1GOKt1thnuLHAAAB"})
  //users.push({userId:"d51d4a56-4ed1-45ce-b4e9-1e57a2e2d260",socketId:"9HfX1GOKt1thnuLHAAAB"})

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


io.on('connection',socket=>{
  
    console.log(`connected with id : ${socket.id}`);

    //send message
    socket.on("send-message",(message,room)=>{
      socket.to(room).emit("receive-message",message)
        
    })

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit("getUsers", users);
     });

    //when disconnect
    socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
     })

})