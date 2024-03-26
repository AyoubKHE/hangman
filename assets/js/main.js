
if(localStorage.getItem("diamondScore") === null) {
    localStorage.setItem("diamondScore", 100);
}
if(localStorage.getItem("trophyScore") === null) {
    localStorage.setItem("trophyScore", 0);
}

let diamondScore = document.getElementById("diamond-score");
diamondScore.textContent = Number.parseInt(localStorage.getItem("diamondScore"));

let trophyScore = document.getElementById("trophy-score");
trophyScore.textContent = Number.parseInt(localStorage.getItem("trophyScore"));

let words = {
    "Verbes": ["faire", "bouger", "marcher", "jardiner", "nager", "manger", "regarder",
        "apprendre", "discuter", "donner", "partager", "acheter", "chercher", "trouver"],

    "Corp Humain": ["tete", "visage", "cou", "epaule", "poitrine", "ventre", "genou", "jambe", "bras",
        "dos", "coude", "main", "doigts", "cheville", "pied", "nez", "bouche", "oreille", "dents"],

    "Fruits": ["orange", "banane", "citron", "cerise", "framboise", "cerise", "fraise", "abricot",
        "nectarine", "kiwi", "melon", "ananas", "poire", "pomme", "raisin"],

    "Légumes": ["betterave", "brocoli", "carotte", "champignon", "chou", "cocombre", "laitue",
        "oignon", "patate", "poivron", "radis", "tomate", "ail", "courgette"],

    "Pays": ["algerie", "australie", "Belgique", "canada", "chine", "danemark", "turquie",
        "finlande", "france", "allemagne", "hongrie", "italie", "japon", "portugale", "espagne"]

}

let randomCategoryIndex = Math.floor(Math.random() * Object.keys(words).length);
let wordCategory = Object.keys(words)[randomCategoryIndex];

let randomWordindex = Math.floor(Math.random() * words[wordCategory].length);
let wordToGuess = words[wordCategory][randomWordindex];

console.log(wordCategory);
console.log(wordToGuess);

function generateWordArea() {
    let wordArea = document.getElementById("word");

    for (let i = 0; i < wordToGuess.length; i++) {
        wordArea.innerHTML += `
            <span class="word-char alpha"></span>
        `
    }

    document.getElementById("hint").textContent = wordCategory;
}

generateWordArea();

let allAlphabets = document.querySelectorAll(".alpha:not(.word-char)");

let wordChars = document.querySelectorAll(".word-char");

let manParts = document.querySelectorAll(".man-parts");
let currentPart = 0;

let numberOfCorrectAnsewrs = 0;

function handleAlphabetClic(event) {

    if (window.getComputedStyle(event.target).cursor === "default") {
        return;
    }

    event.target.style.cursor = "default";
    event.target.classList.add("disbled-alpha");

    wordChars = document.querySelectorAll(".word-char");

    let isCharExists = false;
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === event.target.textContent.toLowerCase()) {
            isCharExists = true;
            wordChars[i].textContent = wordToGuess[i].toUpperCase();
            numberOfCorrectAnsewrs++;
            if(numberOfCorrectAnsewrs === wordToGuess.length) {
                diamondScore.textContent = Number.parseInt(diamondScore.textContent) + 2;
                trophyScore.textContent = Number.parseInt(trophyScore.textContent) + 30;
                localStorage.setItem("diamondScore", diamondScore.textContent);
                localStorage.setItem("trophyScore", trophyScore.textContent);

                setTimeout(() => {
                    alert("Vous avez gagné !");
                    location.reload();
                }, 0);
                return;
            }
        }
    }
    if (!isCharExists) {
        manParts[currentPart].style.display = "block";
        currentPart++;
        
        if (currentPart === 7) {
            setTimeout(() => {
                alert(`Vous avez perdu, le mot était "${wordToGuess}"`);
                location.reload();
            }, 0);
        }
    }
}

for (let i = 0; i < allAlphabets.length; i++) {
    allAlphabets[i].addEventListener("click", handleAlphabetClic);
}

let btnRepeat = document.getElementById("btn-repeat");
btnRepeat.addEventListener("click", function () {
    trophyScore.textContent = Number.parseInt(trophyScore.textContent) - 10;
    localStorage.setItem("trophyScore", trophyScore.textContent);
    location.reload();
})

let btnHint = document.getElementById("btn-hint");
btnHint.addEventListener("click", function () {

    function getRandomIndex() {
        do {
            randomIndex = (Math.floor(Math.random() * wordToGuess.length));
        } while (currentChars[randomIndex].textContent !== "")
    }
    let currentChars = document.querySelectorAll(".word-char");
    let randomIndex = 0;
    getRandomIndex();
    if(Number.parseInt(diamondScore.textContent) > 0){
        currentChars[randomIndex].textContent = wordToGuess[randomIndex].toUpperCase();
        numberOfCorrectAnsewrs++;
        if(numberOfCorrectAnsewrs === wordToGuess.length) {
            setTimeout(() => {
                alert("Vous avez gagné !");
                location.reload();
            }, 0);
            return;
        }

        diamondScore.textContent = Number.parseInt(diamondScore.textContent) - 10;
        localStorage.setItem("diamondScore", diamondScore.textContent);
    }
})
