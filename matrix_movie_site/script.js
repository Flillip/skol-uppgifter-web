const rainWrapper = document.getElementById('rain-wrapper');
const buttonWrapper = document.getElementById('button-wrapper');
let width = rainWrapper.clientWidth;
let height = rainWrapper.clientHeight;
const fontSize = 11;
let animationDuration = 6000; // in milliseconds

let currentVersion = 0;

function GenerateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

}

function createDiv2(divClass, strLength, index) {
    const wrapper = document.createElement("div");
    const text = document.createElement("div");
    const gradient = document.createElement("div");
    const fillerTop = document.createElement("div");
    const fillerBottom = document.createElement("div");

    const newContent = document.createTextNode(GenerateRandomString(strLength));
    text.appendChild(newContent);

    wrapper.classList.add('raindrop-wrapper');
    text.classList.add(divClass);
    gradient.classList.add('gradient');
    fillerTop.classList.add('filler-top');
    fillerBottom.classList.add('filler-bottom');


    wrapper.appendChild(gradient);
    wrapper.appendChild(fillerTop);
    wrapper.appendChild(fillerBottom);
    wrapper.appendChild(text);
    rainWrapper.appendChild(wrapper);
}

function createDivs2(divClass, strLength) {
    for (let i = 0; i < Math.floor(width / fontSize); i++) {
        createDiv2(divClass, strLength, i);
    }
}

function loadVersion2() {
    currentVersion = 2;
    // return;
    rainWrapper.innerHTML = '';

    createDivs2("rain2", Math.floor(height / fontSize));

    const gradients = document.querySelectorAll('.gradient');
    const fillerTop = document.querySelectorAll('.filler-bottom');
    const fillerBottom = document.querySelectorAll('.filler-top');

    for (let i = 0; i < gradients.length; i++) {
        let randomDuration = Math.floor(Math.random() * animationDuration);
        gradients[i].style.animationDelay = randomDuration + 'ms';
        fillerTop[i].style.animationDelay = randomDuration + 'ms';
        fillerBottom[i].style.animationDelay = randomDuration + 'ms';
    }

}

loadVersion2();
window.addEventListener('resize', loadVersion2);

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