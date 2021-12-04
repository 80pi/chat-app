const socket=io()
const $formMain=document.querySelector('#form-data')
const $input=document.querySelector('input')
const $location=document.querySelector('#location')
const $msg=document.querySelector('#dyn-msg')

const msgTemp=document.querySelector("#msg-tmp").innerHTML
const linkTemp=document.querySelector("#link-tmp").innerHTML




$formMain.addEventListener('submit',(e)=>{
    e.preventDefault()
    $formMain.setAttribute('disabled','disabled')
    // const msg=document.querySelector('#text').value // anthing of our choice is nice
    const msg=e.target.elements.message.value

    socket.emit('data',msg,(err)=>{
        $formMain.removeAttribute('disabled')
        $input.value=""
        $input.focus()

        
        if(err){
            return console.log(err)
        }
        console.log('message delivered')
    })
})



socket.on('locationDis',i=>{
    console.log(i)
    
    const html=Mustache.render(linkTemp,{linkTemp:i.url,createdAtLocation:moment(i.createdAt).format('hh:mm:ss a')})
    $msg.insertAdjacentHTML('beforeend',html)
})

socket.on('display',msg=>{
console.log('message be',msg)

const html=Mustache.render(msgTemp,{msg:msg.text,createdAt:moment(msg.createdAt).format('hh:mm:ss a')})
$msg.insertAdjacentHTML('beforeend',html)
}
    )

    $location.addEventListener('click',()=>{
        $location.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition(i=>{
        socket.emit('location',{latitude:i.coords.latitude,longitude:i.coords.longitude},()=>{
            console.log('location shared to all')
            $location.removeAttribute('disabled')
        })
    })
})