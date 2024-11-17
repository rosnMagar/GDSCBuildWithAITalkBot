let chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

const chatBubbles = document.getElementById('chatBubbles');

export function displayMessage(){
    chatBubbles.innerHTML = ''
    chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div')
        messageDiv.setAttribute("markdown", "1")
        messageDiv.classList.add('message', msg.user === 'server' ? 'server' : 'user')
        if(msg.user === 'user'){
            messageDiv.className = 'px-4 py-1 rounded-lg bg-lime-400 w-fit ml-auto mr-3'
            messageDiv.innerHTML = `${marked.parse(msg.message || '')}`
        }else {
            messageDiv.className = 'm-3 my-10'
            messageDiv.innerHTML = `${marked.parse(msg.message || '')}`
        }
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
