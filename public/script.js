import { addMessage, displayMessage, resetChat } from "./chat.js"
import { speak } from "./speak.js"

document.addEventListener('DOMContentLoaded', () => {

    const textInput = document.getElementById('text-input')
    const meterPopup = document.getElementById('popup')

    const startAudio = new Audio('start.mp3');
    const endAudio = new Audio('end.mp3');

    var loading = true
    var voices = []

    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser. Try Chrome.")
        return
    }


    if('speechSynthesis' in window){
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices()
            loading = false
        }
    }

    // display the saved message first
    displayMessage()

    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1
    recognition.continuous = false; // Keep listening for a longer period
    recognition.interimResults = false; // Display real-time results


    document.getElementById('start-recognition').addEventListener('click', () => {
        try{
            speechSynthesis.cancel()
            startAudio.play()
            meterPopup.classList.remove('translate-y-full')
            meterPopup.classList.add('translate-y-0')
            recognition.start()
        } catch (error){
            alert(error)
        }
    })

    document.getElementById('submit').addEventListener('click', async () => {
        speechSynthesis.cancel()
        submitButtonPress()
    })

    textInput.addEventListener("keydown", (event) => {

        if(event.ctrlKey && event.key === "Enter"){
            event.preventDefault()
            speechSynthesis.cancel()
            submitButtonPress()
        }
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
        speak(val, voices[4])
    }

    recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error)
    }

    recognition.onspeechend = () => {
        console.log("Speech ended.")
        endAudio.play()
        meterPopup.classList.remove('translate-y-0')
        meterPopup.classList.add('translate-y-full')
        recognition.stop()
    }

    const submitButtonPress = async() => {
        if(textInput.value === "") { 
            alert('Please type or say something')
            return
        };
        const promptInput = textInput.value
        textInput.value = ""
        addMessage("user", promptInput)
        displayMessage()

        const val = await getValueFromGemini(promptInput)
        addMessage("server", val)
        displayMessage()
        speak(val, voices[4])
    }
})

const getValueFromGemini = async (prompt) => {

    try {

        const response = await fetch('/process-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({text: prompt})
        })

        document.getElementById('text-input').value = ''

        if(!response.ok) throw new Error('Failed to communicate with the server ')

        const serverResponse = await response.json();
        return serverResponse.text
    } catch (error) {
        console.error("Error: ", error)
    }
}
window.addEventListener("beforeunload", () => {
    if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    console.log("Speech synthesis stopped due to navigation or close.");
    }
});