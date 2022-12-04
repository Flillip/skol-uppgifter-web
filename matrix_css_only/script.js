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

function createDiv(divClass, strLength) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(GenerateRandomString(strLength));
    newDiv.appendChild(newContent);
    newDiv.classList.add(divClass)
    rainWrapper.appendChild(newDiv);
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

function createDivs(divClass, strLength) {
    for (let i = 0; i < Math.floor(width / fontSize); i++) {
        createDiv(divClass, strLength);
    }
}

function createDivs2(divClass, strLength) {
    for (let i = 0; i < Math.floor(width / fontSize); i++) {
        createDiv2(divClass, strLength, i);
    }
}

function loadVersion1() {
    currentVersion = 1;
    rainWrapper.innerHTML = '';

    createDivs("rain1", 32);

    let elements = document.querySelectorAll('.rain1');

    // Set the animationDelay of each element to a random value
    // between 0 and animationDuration:
    for (let i = 0; i < elements.length; i++) {
        let randomDuration = Math.floor(Math.random() * animationDuration);
        elements[i].style.animationDelay = randomDuration + 'ms';
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

function loadVersion() {
    width = rainWrapper.clientWidth;
    height = rainWrapper.clientHeight;
    switch (currentVersion) {
        case 1:
            loadVersion1();
            break;
        case 2:
            loadVersion2();
        default:
            break;
    }
}

loadVersion1();
window.addEventListener('resize', loadVersion);

let buttonsVisible = true;

window.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        buttonsVisible = !buttonsVisible;
        buttonWrapper.style.visibility = buttonsVisible ? 'visible' : 'hidden';
    }
});