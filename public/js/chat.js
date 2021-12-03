const socket=io()

// socket.on('countUpdate',(count)=>{
//     console.log('count be',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     socket.emit('increment')
// })
// document.querySelector('#decrement').addEventListener('click',()=>{
//     socket.emit('decrement')
// })


// challenge 1
socket.on('msg',(welcome)=>{
    console.log(welcome)
})

// challenge 2

document.querySelector('#form-data').addEventListener('submit',(e)=>{
    e.preventDefault()
    // const msg=document.querySelector('#text').value // anthing of our choice is nice
    const msg=e.target.elements.message.value
    socket.emit('data',msg)
})

socket.on('display',(msg)=>{
        console.log('message be',msg)
    })