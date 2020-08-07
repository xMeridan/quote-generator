const quoteConainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let data;

function showLoadingSpinner() {
    loader.hidden = false;
    quoteConainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteConainer.hidden = false;
    }
}

async function getQuoteFromApi() {
    showLoadingSpinner();
    const apiURL = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiURL);
        data = await(response.json());
        newQuote();
        removeLoadingSpinner();
    }
    catch (error) {
        window.alert("There is an error within the api, ", error);
    }
}

function newQuote() {
    let quote = data[randomNumber()];
    authorText.innerText = quote.author;
    // Reduced font size for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }
    else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = quote.text;
}

function randomNumber() {
    let random = Math.floor(Math.random() * data.length -1);
    return random;
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuoteFromApi();