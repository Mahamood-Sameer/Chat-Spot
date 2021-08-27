const express = require('express')

const app = express()

const socket = require('socket.io')

app.set("view-engine",'ejs')

app.use(express.static('public'))

app.get('/Chat-Spot',(req,res)=>{
    res.render('Room.ejs')
})

app.get('/Chat-Spot/:id',(req,res)=>{
    res.render('index.ejs',{RoomName:req.params.id})
})

const io=socket(app.listen(3000)) ;


var ids=[];
var names =[];

io.on('connection',(socket)=>{
    

    ids.push(socket.id)

    socket.on('joined',(data)=>{
        names.push(data.Person)
        socket.broadcast.emit('joined',data)
    })
  
    socket.on('start-chatting',(data)=>{
        socket.broadcast.emit('start-chatting',data)
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })

    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('disconnected',{Person:names[ids.indexOf(socket.id)]})
    })
    

})



