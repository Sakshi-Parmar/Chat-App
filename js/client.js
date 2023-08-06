const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add('position')
    messagecontainer.append(messageElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = ''
})
const username = prompt("Enter your name to join");
socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'right')
})

socket.on('recieve', data => {
    append(`${data.message} : ${data.user} `, 'left')
})

