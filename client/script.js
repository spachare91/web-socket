// functio to get individua; io
import {io} from 'socket.io-client'

const messageInput  = document.getElementById("message-input")
const form = document.getElementById("form")


const role="admin"
const adminid="d51d4a56-4ed1-45ce-b4e9-1e57a2e2d261"
const userid="d51d4a56-4ed1-45ce-b4e9-1e57a2e2d261"
const convoid="f98173c9-9c5f-49c7-b074-b2508b3d0c52"


// connect wtih server.....
const socket=io('http://localhost:3000')


let online_users=[]
// creating event which runs when we connect {listeninng event comming down from server... "ON"}
socket.on('connect',()=>{

    displayMessage(`connected with id : ${socket.id}`)
   // adding user id
    socket.emit("addUser",userid)
    socket.on("getUsers", (users) => {
        
        if(role!=="admin"){

            console.log("user is connected...");
            online_users=users.filter((user)=>{
                // here it will be admin id...
                return user.userId==adminid
            })
            console.log(online_users);
        }
        else{
            console.log("admin is connected...");
            // get all online users expcet admin..
            online_users=users.filter((user)=>{
                return user.userId!=adminid
            })
            console.log(online_users);
        }
      });


    fetch(`http://localhost:5000/${convoid}`, {
    method: 'GET', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    for(let i=0;i<data.length;i++){
        displayMessage(data[i].message)
    }
    })
    .catch((error) => {
    console.error('Error:', error);
    });

    //show all users
    fetch('http://localhost:5000/getusers', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        for(let i=0;i<data.length;i++){
            displayMessage(data[i].member)
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        });



})

socket.on("receive-message",message=>{
    displayMessage(message)
})


form.addEventListener("submit",e=>{
    e.preventDefault()
    const message = messageInput.value

    if(message=== "") return 
    displayMessage(message)

    if(role!=="admin"){
        //console.log("user is connected...");
        if(online_users.length==0){
            console.log("admin is offline..just save msg");
        }else{
            console.log("admin is online..& save msg too");
            console.log("userid: ",online_users[0].userId);
            console.log("socketId: ",online_users[0].socketId);
            let room=online_users[0].socketId
            socket.emit("send-message",message,room)
        }

    }
    else{
        //console.log("admin is connected...");
        
        //this we will get from frontend when clicked on user to chat...
        const receiver_id="d51d4a56-4ed1-45ce-b4e9-1e57a2e2d260"
        let req_user=[]
        req_user=online_users.filter((user)=>{
            return user.userId==receiver_id
        })

        if(req_user.length==0){
            console.log("user is offline..just save msg");
        }else{
            console.log("user is online.. & save msg too");
            console.log("userid: ",req_user[0].userId);
            console.log("socketId: ",req_user[0].socketId);
            let room=req_user[0].socketId
            socket.emit("send-message",message,room)
        }

    }



    let data=null
    if(role=="admin"){
         data={
            "conversationId":convoid,
            "senderId":"admin",
            "message":message
        }
    }else{
        data={
            "conversationId":convoid,
            "senderId":userid,
            "message":message
        }
    }




    fetch('http://localhost:5000/addmsg', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });


    messageInput.value=""


})

function displayMessage(message){
    const div=document.createElement("div")
    div.textContent=message
    document.getElementById("message-container").append(div)
}