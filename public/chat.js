
name = prompt("Enter Your Name : ")

if(name==='null' || name===""){
    alert('You did not enter your name but you can still chat but as an Anonymous')
    name = "Anonymous"
}
document.getElementById('room_link').value = window.location.href

    document.getElementById("Close").addEventListener('click',()=>{
        document.querySelector('.Room__info').style.display="none"
    })


document.getElementById("copy").addEventListener('click',()=>{
    var text=document.getElementById("room_link")
    text.focus()
    text.select()

    document.execCommand('copy')
    document.getElementById("copy").innerHTML = `<i class="fa fa-copy"></i> Copied`

    setTimeout(()=>{
        document.getElementById("copy").innerHTML= `<i class="fa fa-copy"></i> Copy`
    },2000)

})

document.getElementById('NAME').innerHTML = `${name}`
var socket = io.connect('http://localhost:3000')

var message = document.getElementById("message")

var Form = document.getElementById("FORM")


var names = []

socket.emit('joined',{Person:name})

socket.on('joined',(data)=>{
    names.push(data.Person)
    document.getElementById('connectionAndDisconnection').innerHTML = `${data.Person} joined the chat...`
    setTimeout(()=>{
        document.getElementById('connectionAndDisconnection').innerHTML =""
    },2500)
})


socket.on('disconnected',(data)=>{
    document.getElementById('connectionAndDisconnection').innerHTML = `${data.Person} disconnected ....`
    setTimeout(()=>{
        document.getElementById('connectionAndDisconnection').innerHTML =""
    },2500)
})





Form.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('#chat').innerHTML += `
            <div class="message_info_you">
                <div id="name">
                    You
                </div>
                <div id="message_content">
                    ${message.value}
                </div>
            </div>
    `
    socket.emit('start-chatting', { Message: message.value, Name: name })
    message.value=""
})


socket.on('start-chatting',(data)=>{
    document.getElementById('feedback').innerHTML=""
    document.querySelector('#chat').innerHTML +=`

            <div class="message_info_others">
                <div id="name">
                    ${data.Name}
                </div>
                <div id="message_content">
                    ${data.Message}
                </div>
            </div>

    `
})


message.addEventListener("keydown",()=>{
    socket.emit('typing',{Name:name})
})

socket.on('typing',(data)=>{
    document.getElementById('feedback').innerHTML = `${data.Name} is typing...`
})



