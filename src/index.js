const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');



const app = express()
const server=http.createServer(app)
const io=socketio(server)

const port = process.env.PORT
app.use(express.static(path.join(__dirname,'../public')))

// let count=0

io.on('connection',(socket)=>{
    console.log('new conn')
    socket.emit('msg','welcome')
    socket.broadcast.emit('msg','A new user added')
    socket.on('data',(msg)=>{
        io.emit('display',msg)
    })
    socket.on('disconnect',()=>{
        io.emit('msg','A user got disconnected')
    })
    // socket.emit('countUpdate',count)

    // socket.on('increment',()=>{
    //     count++
    //     io.emit('countUpdate',count)
    // })
    // socket.on('decrement',()=>{
    //     count--
    //     io.emit('countUpdate',count)
    // })
    
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))