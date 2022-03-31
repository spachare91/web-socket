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