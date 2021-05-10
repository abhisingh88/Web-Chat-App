const socket = io('http://localhost:8000');

//above line connect the server to this js
//below gto get dom element
const form = document.getElementById('sendCont')
const messageInput = document.getElementById('message')
const messageCont = document.querySelector('.cont')

//audion function to beep
var audio = new Audio('ping.mp3')

//fucntion which will apaned to the container
const append = (message, postion) => {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(postion)
    messageCont.append(messageElement);
    if (postion == 'left') {
        audio.play();
    }
}
//if the form get submitted send the message to the server
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

//ask new user for his name 
const name = prompt('Enter your name to join')
socket.emit('new-user-joined', name);

//if new user joins recieve the event from server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left')
})

//if server sends a message  receive it
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left');
})

//if the user left the chat then append in chat that following user had left the chat
socket.on('leave', name => {
    append(`${name} left the chat`, 'right');
})

