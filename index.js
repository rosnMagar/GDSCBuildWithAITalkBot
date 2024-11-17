require('dotenv').config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const {answerPrompt} = require('./gemini.js')


app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const title = 'Welcome to FoooTutrion'
    const message = 'Talk with your FoooTrition Supporter'
    res.render('index', {title, message})
})

app.post('/process-text', async (req, res) => {
    console.log(req.body)
    const { text } = req.body
    try {
        const serverResponse = await answerPrompt(text)
        console.log("AI Response: ", serverResponse)
        res.status(200).json({text: serverResponse})
    } catch(error) {
        console.error("Failed to get a response:", error.message)
        res.status(500).json({error: "Failed to generate text"})
    }

})

app.get('/about', (req, res) => {
    const title = 'About us'
    const content = 'We provide the most straight-forward user friendly solution to your nutrition question'
    res.render('about', {title, content})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    // answerPrompt("Tell me about yourself");
})