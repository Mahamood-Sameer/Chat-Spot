const express = require('express')

const app = express()

const socket = require('socket.io')

app.set("view-engine",'ejs')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('Room.ejs')
})

app.get('/:id',(req,res)=>{
    res.render('index.ejs',{RoomName:req.params.id})
})

const io=socket(app.listen(3000)) ;


io.on('connection',(socket)=>{
    
    socket.on('joined',(data)=>{
        socket.broadcast.emit('joined',data)
    })
  
    socket.on('start-chatting',(data)=>{
        socket.broadcast.emit('start-chatting',data)
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })

    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('disconnected')
    })
    

})



