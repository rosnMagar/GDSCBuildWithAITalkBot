import { addMessage, displayMessage, resetChat } from "./chat.js"

document.addEventListener('DOMContentLoaded', () => {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser. Try Chrome.")
        return
    }

    // display the saved message first
    displayMessage()

    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1
    recognition.continuous = false; // Keep listening for a longer period
    recognition.interimResults = false; // Display real-time results

    const textInput = document.getElementById('text-input')

    document.getElementById('start-recognition').addEventListener('click', () => {
        recognition.start()
    })

    document.getElementById('submit').addEventListener('click', async () => {
        submitButtonPress()
    })

    document.getElementById('clear').addEventListener('click', async () => {
        resetChat()
        displayMessage()
    })



    recognition.onresult = async (event) => {
        const speechText = event.results[0][0].transcript
        textInput.value = speechText
        addMessage("user", speechText)
        displayMessage()

        const val = await getValueFromGemini(speechText)
        addMessage("server", val)
        displayMessage()
        speak(val)
    }

    recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error)
    }

    recognition.onspeechend = () => {
        console.log("Speech ended.")
        recognition.stop()
    }

    const submitButtonPress = async() => {
        const val = await getValueFromGemini(textInput.value)
        addMessage("user", textInput.value)
        displayMessage()

        addMessage("server", val)
        displayMessage()
        speak(val)
    }
})

const getValueFromGemini = async (prompt) => {

    try {

        const response = await fetch('/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({text: prompt})
        })

        if(!response.ok) throw new Error('Failed to communicate with the server ')

        const serverResponse = await response.json();
        return serverResponse.text
    } catch (error) {
        console.error("Error: ", error)
    }
}

const speak = (text) => {
    try {
        if ('speechSynthesis' in window) {

            const utterance = new SpeechSynthesisUtterance(text)

            utterance.lang = 'en-US'
            utterance.pitch = 0.5
            utterance.rate = 1
            utterance.volume = 1

            speechSynthesis.speak(utterance)

            utterance.onend = () => {
                console.log("Speech ended. Ready for the next input.")
                document.getElementById('text-input').value = ''
            }
        } else {
            alert("Your browser does not support tts")
        }
    } catch (error) {
        console.error("Error:", error)
        alert("An error occurred. Please try again")
    }
}

const loadVoices = () => {
    return speechSynthesis.getVoices().length
}
