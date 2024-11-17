let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

const chatBubbles = document.getElementById('chatBubbles');

export function displayMessage(){
    chatBubbles.innerHTML = ''
    chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div')
        messageDiv.setAttribute("markdown", "1")
        messageDiv.classList.add('message', msg.user === 'server' ? 'server' : 'user')
        messageDiv.innerHTML = `<strong>${msg.user}:</strong> ${marked.parse(msg.message || '')}`
        chatBubbles.appendChild(messageDiv)
    });

    chatBubbles.scrollTop = chatBubbles.scrollHeight
}

export function addMessage (user, message) {

    if(chatMessages.length > 100) chatQueue.shift()
    chatMessages.push({user, message})

    localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
}

export function resetChat() {
    localStorage.clear()
}
