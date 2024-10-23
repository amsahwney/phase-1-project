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
const fortuneShop = document.querySelector('#setting-the-scene')

//LOCAL STORAGE SITUATION
function initializeClickTracking() {
    const lastClickDate = localStorage.getItem('lastClickDate')
    const currentDate = new Date().toLocaleDateString()
    if (lastClickDate !== currentDate) {
        localStorage.setItem('clicks', "0")
        localStorage.setItem('lastClickDate', currentDate)
    }
}

function updateClickCount() {
    const lastClickDate = localStorage.getItem('lastClickDate')
    const currentDate = new Date().toLocaleDateString()
    let clicks = parseInt(localStorage.getItem('clicks')) || 0
    const existingSign = document.querySelector('.mouseover-object')
    
    if (clicks >= 3 && lastClickDate === currentDate) {
        window.alert("I'm an octopus, NOT a fortune factory! come back tomorrow.")
        
        //placing sign at the end of the day - no returns sign appears once user has received 3 fortunes
        if(!existingSign) {
        const signPlace = document.createElement('img')
        signPlace.className = 'mouseover-object'
        signPlace.src = 'assets/no-returns-mouseover.png'
        signPlace.alt = 'Old wodden sign reading no returns for refunds. Refunds is spelled terribly.'
        noReturns.append(signPlace)

        signPlace.addEventListener("click", showWarning = () =>
                                    {window.alert("I do not guarantee results.")})}
    } else if (lastClickDate !== currentDate) {
        clicks = 1
        localStorage.setItem('clicks', `${clicks}`)
        localStorage.setItem('lastClickDate', currentDate)
        fortuneList.innerHTML = " "
        postFortune()
    } else if (clicks < 3) {
        localStorage.setItem('lastClickDate', currentDate)
        clicks++
        localStorage.setItem('clicks', `${clicks}`)
        postFortune()
    }
}

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
    const clickBubbles = new Audio('assets/bubbles-onclick.mov')
    clickBubbles.play()
    window.alert("The currents are delivering your message to me. I shall assess the worthiness of your words soon... ")
}

//FORTUNE FETCH REQUEST
let i = parseInt(localStorage.getItem('fortuneInt'))|| 0

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
        localStorage.setItem('fortuneInt', `${i}`)//tell local storage what this number is and then set i = localcstroage. something something
        }
        }
        
        welcomeMessage.textContent = "today's fortune says"
        instructions.textContent = 'I can conjure up to 3 fortunes a day.'
        addNewFortune()
}

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initializeClickTracking)
newReviewForm.addEventListener('submit', () => submitReview(event))
octopus.addEventListener('click', () => updateClickCount())

//touching the shop shelves
fortuneShop.addEventListener("click", showAnnoyance = () =>
    {window.alert("do NOT touch that")})

// offer octupus fun facts second time user tries to surpass fortune limit
//finding an API for fortunes or octupus facts - don't use anything with an API Key yet
// if (clicksAfterDark = 2) {

// }

// should be pretty striaghtforward - regular octopus to angry

//bubbles sound loads with page
// document.addEventListener('DOMContentLoaded', playBubblesLoad = () =>
//     {const loadBubbles = new Audio('assets/bubbles-on-load.mov')
    
//     let hasPlayed = false; 
    
//     document.body.addEventListener('click', () => {
//         if (!hasPlayed) {
//             loadBubbles.play()
//             hasPlayed = true;
//             }
//         })
//     })

//Letting go of this dream but:
// I could make a page to enter so this can be a submit event instead? 
//and then it would actually feel like the audio plays with the page loading. 


// offer octupus fun facts second time user tries to surpass fortune limit
//finding an API for fortunes or octupus facts - don't use anything with an API Key yet
// if (clicksAfterDark = 2) {

// }

// should be pretty striaghtforward - regular octopus to angry
