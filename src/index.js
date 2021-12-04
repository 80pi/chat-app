const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const Filter = require('bad-words');
const {generateMsg, generateUrl}=require('./utils/message')



const app = express()
const server=http.createServer(app)
const io=socketio(server)

const port = process.env.PORT
app.use(express.static(path.join(__dirname,'../public')))

// let count=0

io.on('connection',(socket)=>{
    console.log('new conn')
    socket.emit('display',generateMsg('welcome'))
    socket.broadcast.emit('msg',generateMsg('A new user added'))
    socket.on('data',(msg,cb)=>{
        const filter=new Filter()
        if(filter.isProfane(msg)){
            return cb('profantiy is not allowed')
        }
        io.emit('display',generateMsg(msg))
        cb()
    })
    socket.on('location',(loc,cb)=>{
        io.emit('locationDis',generateUrl(`https://google.com/maps?q=${loc.latitude},${loc.longitude}`))
        cb()
    })
    socket.on('disconnect',()=>{
        io.emit('msg',generateMsg('A user got disconnected'))
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