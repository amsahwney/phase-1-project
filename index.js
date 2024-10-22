

//DECLARING CONSTANTS
const newReviewForm = document.querySelector('#review-form')
const nameInput = document.querySelector('.input-text')
const reviewInput = document.querySelector('#paragraph-space')
const emailInput = document.querySelector('#email-text')

const octopus = document.querySelector('#the-man-the-legend')
const welcomeMessage = document.querySelector('#welcome-message')
const instructions = document.querySelector('#instructions')
const fortuneList = document.querySelector('#fortunes-here')
const noReturns = document.querySelector('#center-image')

//FORM POST REQUEST
async function submitReview(event) {
    
    event.preventDefault()

    const response = await fetch('http://localhost:3000/responses', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'}, 
        body: JSON.stringify( { 
            name: nameInput.value.trim,
            email: emailInput.value.trim,
            review: reviewInput.value.trim} )
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
        i++ //tell local storage what this number is and then set i = localcstroage. something something
        }

    //no returns sign appears once user has received 3 fortunes
        if (i > 2){ //this will need to become if sessionClicks > 2
            const signPlace = document.createElement('img')
            signPlace.className = 'mouseover-object'
            signPlace.src = 'assets/no-returns-mouseover.png'
            signPlace.alt = 'Old wodden sign reading no returns for refunds. Refunds is spelled terribly.'
            noReturns.append(signPlace)

            signPlace.addEventListener("click", showWarning = () =>
                                        {window.alert("I do not guarantee results.")})
            }
        }
        
        welcomeMessage.textContent = "today's fortune says"
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

// should be pretty striaghtforward - regular octopus to angry

//can event listeners trigger audio? download audio file and put it in assets and then research
// DOMcontentloaded event listener for bubbles on load
