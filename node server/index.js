//node server which will handle our socket connection
const io=require('socket.io')(8000)

const users={}

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
       users[socket.id]=name; 
       socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    //disconnect is pre defined hence funtion name must be same
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id])
        delete users[socket.id]
    })
})