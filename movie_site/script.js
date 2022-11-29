let trivia = [];
const button = document.getElementById('next-trivia-button');
const triviaText = document.getElementById('trivia-text');
button.disabled = true;

let currentTriviaIndex = -1; // default to -1

// get the trivia from the json file
fetch('./trivia.json')
    .then((response) => response.json()) // turn it to json
    .then((json) => onLoadedTrivia(json)); // concat it onto the trivia array

function onLoadedTrivia(json) {
    trivia = trivia.concat(json);
    button.removeAttribute('disabled');
    triviaText.innerHTML = "";
    changeText();
}

function changeText() {
    currentTriviaIndex = currentTriviaIndex >= trivia.length - 1 ? 0 : currentTriviaIndex + 1;
    triviaText.innerText = trivia[currentTriviaIndex];
}

button.onclick = () => {
    changeText();
};