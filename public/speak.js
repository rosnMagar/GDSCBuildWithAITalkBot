
export function speak (text, voice) {
    try {
        if ('speechSynthesis' in window) {
            
            console.log(voice)
            text = markdownToText(text) 

            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = 'en-US'
            utterance.volume = 1
            utterance.pitch = 1
            utterance.voice = voice
    
            speechSynthesis.speak(utterance)

            utterance.onend = () => {
                console.log("Speech ended. Ready for the next input.")
            }
        } else {
            alert("Your browser does not support tts")
        }
    } catch (error) {
        console.error("Error:", error)
        alert("An error occurred. Please try again")
    }
}

function markdownToText(markdown) {
  return markdown
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Italics
    .replace(/~~(.*?)~~/g, '$1') // Strikethrough
    .replace(/`(.*?)`/g, '$1') // Inline code
    .replace(/```[\s\S]*?```/g, '') // Code blocks
    .replace(/!\[.*?\]\(.*?\)/g, '') // Images
    .replace(/\[.*?\]\(.*?\)/g, '') // Links
    .replace(/#+\s?(.*)/g, '$1') // Headers
    .replace(/- |\* |\+ /g, '') // Lists
    .replace(/\>\s(.*)/g, '$1') // Blockquotes
    .replace(/\n{2,}/g, '\n') // Remove multiple newlines
    .replace(/^\s+|\s+$/g, ''); // Trim whitespace
}
