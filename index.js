//DECLARING CONSTANTS
const newReviewForm = document.querySelector('#review-form')
const nameInput = document.querySelector('.input-text')
const reviewInput = document.querySelector('#paragraph-space')
const emailInput = document.querySelector('#email-text')

const octopus = document.querySelector('#the-man-the-legend')
const welcomeMessage = document.querySelector('#welcome-message')
const instructions = document.querySelector('#instructions')
const fortuneList = document.querySelector('#fortunes-here')
const fortunePersist = document.querySelector('#text-parent')
const noReturns = document.querySelector('#center-image')
const fortuneShop = document.querySelector('#setting-the-scene')

// LOCAL STORAGE SITUATION - start click tracking callback function
function initializeClickTracking() {
    const lastClickDate = localStorage.getItem('lastClickDate');
    const currentDate = new Date().toLocaleDateString();
    if (lastClickDate !== currentDate) {
        localStorage.setItem('clicks', "0");
        localStorage.setItem('clicksAfterDark', "0");
        localStorage.setItem('lastClickDate', currentDate);
    }
}

// LOCAL STORAGE SITUATION - start fortune tracking for fortune persistence
function initializeFortunes() {
    const lastClickDate = localStorage.getItem('lastClickDate');
    const currentDate = new Date().toLocaleDateString();
    
    if (lastClickDate === currentDate) {
        if (parseInt(localStorage.getItem('clicks')) >= 3) {
            fortunePersist.innerHTML = localStorage.getItem('savedFortunes') || '';
        }
    } else {
        fortunePersist.innerHTML = `<h1 class="welcome-text" id="welcome-message">
                                    so you've come to me for some fortune, hmm?<br></h1>
                                    <ul id="fortunes-here"></ul>
                                    <h2 class="welcome-text" id="instructions">
                                    Click a suction cup to receive your fortune. <br> I can conjure up to 3 fortunes a day.</h2>`;
        localStorage.removeItem('savedFortunes'); // Clear saved fortunes for a new day
        localStorage.setItem('clicks', '0');
        localStorage.setItem('clicksAfterDark', '0');
        localStorage.setItem('lastClickDate', currentDate);
    }
}

//OCTOPUS ANGER CALLBACK FUNCTIONS
function getAngry() {
    octopus.src = "assets/angry_octopus.svg"
}

function calmDown() {
    octopus.src = "assets/octopus_vector.svg"
}

// OCTOPUS FACT FETCH REQUEST - callback function for updateClickCount
async function hitWithFacts() {
    const response = await fetch('https://tentaculous-truths.onrender.com/octopus-facts') 
    const facty = await response.json()

    const randomIndex = Math.floor(Math.random() * facty.length)
    window.alert(`you've already recieved 3 fortunes today. have this octopus fact instead: ${facty[randomIndex].fact}`)
 }

// LOCAL STORAGE SITUATION (THE BIG ONE). Specify actions based on click counts - callback for event listener
function updateClickCount() {
    const lastClickDate = localStorage.getItem('lastClickDate');
    const currentDate = new Date().toLocaleDateString();
    let clicks = parseInt(localStorage.getItem('clicks')) || 0;
    let clicksAfterDark = parseInt(localStorage.getItem('clicksAfterDark')) || 0;
    const existingSign = document.querySelector('.mouseover-object');

    if (clicks >= 3 && lastClickDate === currentDate) {
        fortunePersist.innerHTML = localStorage.getItem('savedFortunes') || '';

        // IF USER CONTINUES CLICKING AFTER OCTOPUS FACT, ANGER
        if (clicksAfterDark >= 1) {
            window.alert("I'm an octopus, not a fortune factory! Come back tomorrow.");
            octopus.addEventListener('mouseover', getAngry);
            octopus.addEventListener('mouseout', calmDown);

            // No returns sign appears once user has thoroughly angered octopus
            if (clicksAfterDark >= 2 && !existingSign) {
                const signPlace = document.createElement('img');
                signPlace.className = 'mouseover-object';
                signPlace.src = 'assets/no-returns-mouseover.png';
                signPlace.alt = 'Old wooden sign reading no returns or refunds. Refunds is spelled terribly.';
                noReturns.append(signPlace);

                signPlace.addEventListener("click", () =>
                    window.alert("I do not guarantee results.")
                );
            }
        }

        // FIRST OFFERING OCTOPUS FACTS
        clicksAfterDark++;
        localStorage.setItem('clicksAfterDark', `${clicksAfterDark}`);

        if (clicksAfterDark === 1) {
            hitWithFacts();
        }

    } else if (lastClickDate !== currentDate) {
        clicks = 1;
        clicksAfterDark = 0;
        localStorage.setItem('clicks', `${clicks}`);
        localStorage.setItem('clicksAfterDark', `0`);
        localStorage.setItem('lastClickDate', currentDate); 
        fortuneList.innerHTML = "";
        noReturns.innerHTML = "";
        octopus.removeEventListener('mouseover', getAngry);
        postFortune();

    } else if (clicks < 3) {
        localStorage.setItem('lastClickDate', currentDate);
        clicks++;
        localStorage.setItem('clicks', `${clicks}`);
        postFortune();

        // Save fortunes only after the third one
        if (clicks === 3) {
            localStorage.setItem('savedFortunes', fortunePersist.innerHTML);
        }
    }
}

//FORM POST REQUEST - callback for event listener
async function submitReview(event) {
    
    event.preventDefault()

    const response = await fetch('https://tentaculous-truths.onrender.com/responses', {
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

//FORTUNE FETCH REQUEST - callback for updateClickCount
async function postFortune() {
    const response = await fetch('https://tentaculous-truths.onrender.com/fortunes')
    const fortune = await response.json()
    const randomIndex = Math.floor(Math.random()* fortune.length)

    //FORTUNE POST FUNCTION
        function addNewFortune(){
        const fortunePost = document.createElement("li")
        fortunePost.textContent = fortune[randomIndex].content
        fortuneList.append(fortunePost)
        }
        
        welcomeMessage.textContent = "today's fortune says"
        instructions.textContent = 'I can conjure up to 3 fortunes a day.'
        addNewFortune()
        localStorage.setItem('savedFortunes', fortunePersist.innerHTML)
}

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', initializeClickTracking)
document.addEventListener('DOMContentLoaded', initializeFortunes)
newReviewForm.addEventListener('submit', () => submitReview(event))
octopus.addEventListener('click', () => updateClickCount())

//touching the shop shelves
fortuneShop.addEventListener("click", showAnnoyance = () =>
    {window.alert("do NOT touch that")})



//Letting go of this dream:
//browser controls don't allow for audio to play on load (without user action)
// I could make a page to enter so this can be a submit event instead? 
//and then on pressing enter, it would actually feel like the audio plays with the page loading. 

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