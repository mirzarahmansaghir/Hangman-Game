const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
    furits: ["Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon"],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    countries: ["Pakistan", "Hungary", "Kyrgyzstan", "Switzerland", "Zimbabwe", "Dominica"]
};

let winCount = 0;
let count = 0;
let chosenWord = "";

// Max wrong attempts
const maxWrong = 6;

// Draw parts on canvas
const drawPart = (count) => {
    const context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.strokeStyle = "#000";

    // Draw according to the count (basic Hangman parts)
    switch (count) {
        case 1: // base
            context.beginPath();
            context.moveTo(10, 130);
            context.lineTo(130, 130);
            context.stroke();
            break;
        case 2: // pole
            context.beginPath();
            context.moveTo(40, 130);
            context.lineTo(40, 10);
            context.stroke();
            break;
        case 3: // top line
            context.beginPath();
            context.moveTo(40, 10);
            context.lineTo(100, 10);
            context.stroke();
            break;
        case 4: // rope
            context.beginPath();
            context.moveTo(100, 10);
            context.lineTo(100, 30);
            context.stroke();
            break;
        case 5: // head
            context.beginPath();
            context.arc(100, 40, 10, 0, Math.PI * 2);
            context.stroke();
            break;
        case 6: // body
            context.beginPath();
            context.moveTo(100, 50);
            context.lineTo(100, 90);
            context.stroke();
            break;
        case 7: // arms
            context.beginPath();
            context.moveTo(100, 60);
            context.lineTo(80, 80);
            context.moveTo(100, 60);
            context.lineTo(120, 80);
            context.stroke();
            break;
        case 8: // legs
            context.beginPath();
            context.moveTo(100, 90);
            context.lineTo(80, 110);
            context.moveTo(100, 90);
            context.lineTo(120, 110);
            context.stroke();
            break;
        default:
            break;
    }
};

// Display option buttons
const displayOption = () => {
    optionsContainer.innerHTML = `<h3>Please Select An Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

// Block all buttons after game over
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    optionsButtons.forEach(button => button.disabled = true);
    letterButtons.forEach(button => button.disabled = true);
    newGameContainer.classList.remove("hide");
};

// Generate word and display dashes
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)].toUpperCase();

    let displayItem = chosenWord.replace(/./g, `<span class="dashes">_</span>`);
    userInputSection.innerHTML = displayItem;
};

// Initialize the game
const initializer = () => {
    winCount = 0;
    count = 0;
    userInputSection.innerHTML = "";
    letterContainer.innerHTML = "";
    optionsContainer.innerHTML = "";
    newGameContainer.classList.add("hide");
    letterContainer.classList.add("hide");
    resultText.innerText = "";

    // Clear canvas
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Create letter buttons A-Z
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);

        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;
                    }
                });

                if (winCount === charArray.length) {
                    resultText.innerHTML = `<h2>You Win 🎉</h2><p>The word was: ${chosenWord}</p>`;
                    blocker();
                }
            } else {
                count += 1;
                drawPart(count + 1);
                if (count === maxWrong) {
                    resultText.innerHTML = `<h2>Game Over 😞</h2><p>The word was: ${chosenWord}</p>`;
                    blocker();
                }
            }

            button.disabled = true;
        });

        letterContainer.append(button);
    }

    displayOption();
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;
