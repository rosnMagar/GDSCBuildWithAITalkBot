## Inspiration
Building for everyone regardless of the disabilities. 

## What it does
It provides you meal plans or nutrition information based on the information that you gave to FoooTrition. For example, if you say your sex, weight, any disabilities you have, or health concerns, FoooTrition will give the best suggestions for you.

## How we built it
We leveraged Google's Gemini REST API as the main chatbot and customized Gemini to provide accurate nutrition suggestions for people with disabilities who require heavy monitoring of their daily nutrient intake. We used express.js as the backend server to communicate with Gemini API and host a secure and safe website following industry-level programming patterns. We used EJS from express.js for the front end to render dynamic websites and plain HTML and JavaScript for simple web activities. For design elements, we utilized Canva and TailwindCSS to create a simple yet beautiful user interface. 

We also used Web Speech API to synthesize voice for diction for people with visual impairment.  The code itself is very simple in appearance and self-explanatory, so it requires minimal comments.  

## Challenges we ran into
The initial challenge was to create a product that could help people with disability. Creating a UI element that is responsive and having accessibility features like speech recognition, and natural speech generation. Creating a product that has a vast range of functionality while being simplistic was also a major challenge.

## Accomplishments that we're proud of
With a very simple design, colorblind friendly design, and speech recognition technology, it is very easy to use FoooTrition for everyone. 


## What we learned
We learned that the world is a shared space and everyone should get an equal opportunity to utilize the products that are offered to them.  Because of people's conditions, they should not have difficulty in using software. With Google's Gemini API, we can solve this problem by minimizing the number of complex buttons, instead, we use the software as if it were a real conversation, full of audio-visual and textual feedback. People, regardless of their age, or physical conditions have the right to fully leverage any provided services without having to dodge hundreds of buttons just to perform a simple task. 

We also learned a lot about nutrition, and how disability and certain conditions might affect a person's overall nutrition goals. Cooking for people with disabilities, who require heavy monitoring of their daily nutrient intake is a challenging task, and a simple solution like FoooTriton can dramatically simplify such a challenging task.

## What's next for FoooTrition
The next plan is to expand the supported languages in order to have users from all over the world. Also, by using image detection, based on the pictures users take FoooTrition will analyze them, and provide them best meal plan based on the missing nutrition.
