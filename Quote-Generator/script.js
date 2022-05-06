let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");


// show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if(quote.text.length>50) {
        quoteText.classList.add('long-quote');
    } 
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// fetching the data from the api using async function
async function getQuotes() {
    loading();
    const api = "https://type.fit/api/quotes";
    try {
        const response = await fetch(api);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catching the error
    }
}

function tweet() {
    const twitterURL = `https://twitter.com/intent/tweet/?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweet);

getQuotes();