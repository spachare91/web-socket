// functio to get individua; io
import {io} from 'socket.io-client'

const joinRoomButton  = document.getElementById("room-button")
const messageInput  = document.getElementById("message-input")
const roomInput  = document.getElementById("room-input")
const form = document.getElementById("form")

// connect wtih server.....
const socket=io('http://localhost:3000')

// creating event which runs when we connect {listeninng event comming down from server... "ON"}
socket.on('connect',()=>{

    displayMessage(`connected with id : ${socket.id}`)
    fetch('http://localhost:5000/92c1410b-75ad-428e-bf74-08f62fb84872', {
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

    // show all users
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
            displayMessage(data[i].member[0])
        }
        })
        .catch((error) => {
        console.error('Error:', error);
        });



})

socket.on("receive-message",message=>{
    displayMessage(message)
})

// FOR CLIENT SIDE... ON MEANS COMING FROM SERVER
// EMIT MEANS SENDING BACK TO SERVER....
// socket.emit("custom-event",)

form.addEventListener("submit",e=>{
    e.preventDefault()
    const message = messageInput.value
    const room=roomInput.value

    if(message=== "") return 
    displayMessage(message)
    socket.emit("send-message",message,room)
    let data={
        "conversationId":"92c1410b-75ad-428e-bf74-08f62fb84872",
        "senderId":"d51d4a56-4ed1-45ce-b4e9-1e57a2e2d260",
        "message":message
    }

    // fetch('',{
    //     body:data,
    //     method:"POST"
    // })

    // const data = { username: 'example' };

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

joinRoomButton.addEventListener("click",()=>{
    const room=roomInput.value
    socket.emit("join-room",room,message=>{
        displayMessage(message)
    })
})

function displayMessage(message){
    const div=document.createElement("div")
    div.textContent=message
    document.getElementById("message-container").append(div)
}