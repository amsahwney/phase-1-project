//DECLARING CONSTANTS
const newReviewForm = document.querySelector('#review-form')
const nameInput = document.querySelector('.input-text')
const reviewInput = document.querySelector('#paragraph-space')
const emailInput = document.querySelector('#email-text')

const octopus = document.querySelector('#the-man-the-legend')
const welcomeMessage = document.querySelector('#welcome-message')
const instructions = document.querySelector('#instructions')
const fortuneList = document.querySelector('#fortunes-here')

//FORM POST REQUEST
async function submitReview(event) {
    
    event.preventDefault()

    const response = await fetch('http://localhost:3000/responses', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify( { 
            name: nameInput.value,
            email: emailInput.value,
            review: reviewInput.value} )
    })
    const newReview = await response.json()

    newReviewForm.reset()
    window.alert("The currents are delivering your message to me. I shall assess the worthiness of your words soon... ")

}


//FORTUNE FETCH REQUEST
let i = 0
async function postFortune() {
    const response = await fetch('http://localhost:3000/fortunes')
    const fortune = await response.json()


    //FORTUNE POST FUNCTION
        function addNewFortune(){
        if (i < fortune.length){
        const fortunePost = document.createElement("li")
        fortunePost.textContent = fortune[i].content
        fortuneList.append(fortunePost)
        i++
        }
        }

        welcomeMessage.textContent = "your fortune today says"
        instructions.textContent = 'I can conjure up to 3 fortunes a day.'
        addNewFortune()
}

//EVENT LISTENERS
newReviewForm.addEventListener('submit', () => submitReview(event))
octopus.addEventListener('click', () => postFortune())


// limit to one 3 fortunes per day - click tracking
// localStorage - you can save stuff in a window for later 
// store when were the last clicks made date and time

// after 3 clicks on the page, any button pressed should display an angry popup
//I'm an octopus, not a fortune factory!

// offer octupus fun facts second time use tries to surpass fortune limit
//finding an API for fortunes or octupus facts - don't use anything with an API Key yet

// a "DO NOT TOUCH THAT" button

// mouseover animations - last priority
// should be pretty striaghtforward - regular octopus to angry
// key frames - can be used for shaking or something

// "no returns or refunds!!" // "I cannot guarantee results"

//can event listeners trigger audio? download audio file and put it in assets and then research
// DOMcontentloaded event listener for bubbles on load

// const showWarning = () => {
//     window.alert("Fortune")
// }


//OLD CODE TO COPY FOR OCTOPUS MAYBE
// //this is probably how i will make buttons for my website
// // link is a containedr for the image. not the other way around 
// // becuase then the link doesn't wrap itself around the whole image it will just be somewhere inside the image (location unknown)

// const linkToIMDB = document.createElement('a')
// linkToIMDB.href = 'https://www.imdb.com/title/tt1099212/'
// navbar.append(linkToIMDB)

// const linkImage = document.createElement('img')
// linkImage.src = "https://static.wikia.nocookie.net/twilightsaga/images/a/a4/Bella-306318_429619423747956_93621998_n.jpg/revision/latest?cb=20130824013830"
// linkToIMDB.append(linkImage)