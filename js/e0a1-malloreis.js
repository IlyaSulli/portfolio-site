document.addEventListener("DOMContentLoaded", showDialogue);

window.onload = function() {
    document.body.style.backgroundImage = "url('../assets/images/dnd/desertvillage.jpg')";
}

// Dialogue functionality
const dialogue = [
    { userImage: "", name: "", text: ""},
    { userImage: "../assets/images/dnd/.png", name: "Mallories", text: "" },
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: ""},
];

let currentSentence = 0;
let typing = false;
let typeTimeout;

function typeSentence(sentence, callback) {
    const textContainer = document.getElementById("speakingText");
    const hint = document.getElementById("continueHint");
    textContainer.textContent = "";
    hint.style.display = "none";
    let i = 0;

    function type() {
        if (i < sentence.length) {
            textContainer.textContent += sentence.charAt(i);
            i++;
            typeTimeout = setTimeout(type, 30);
        } else {
            hint.style.display = "block";
            typing = false;
            callback();
        }
    }

    typing = true;
    type();
}

function showDialogue() {
    const speakArea = document.getElementById("speakArea");
    speakArea.style.visibility = "visible";

    function nextSentence() {
        if (currentSentence < dialogue.length) {
            const { userImage, name, text } = dialogue[currentSentence];
            const speakingNameElement = document.getElementById("speakingName");

            speakingNameElement.textContent = name;
            adjustFontSize(speakingNameElement); // Adjust font size when name changes

            if (userImage !== "" || name !== "") {
                document.getElementById("speakingImage").style.display = "block";
                document.getElementById("speakingImage").style.backgroundImage = `url('${userImage}')`;
                document.getElementById("speakingNameBox").style.display = "block";
                document.getElementById("speakingName").style.display = "block";
            } else {
                document.getElementById("speakingImage").style.display = "none";
                document.getElementById("speakingNameBox").style.display = "none";
                document.getElementById("speakingName").style.display = "none";
            }

            typeSentence(text, () => {
                speakArea.onclick = handleNextClick;
            });
        } else {
            gsap.to("#app", { display: "block", y: 0, duration: 1 });
            speakArea.onclick = null;
        }
    }

    function handleNextClick() {
        if (typing) {
            clearTimeout(typeTimeout);
            document.getElementById("speakingText").textContent = dialogue[currentSentence].text;
            typing = false;
            document.getElementById("continueHint").style.display = "block";
        } else {
            currentSentence++;
            nextSentence();
        }
    }

    speakArea.onclick = handleNextClick;
    nextSentence();
}

ticket.addEventListener("click", () => {
    gsap.to("#app", {
        y: 100, duration: 1, onComplete: () => {
            document.getElementById("app").style.display = "none";
            showDialogue();
        }
    });
});

function adjustFontSize(element) {
    let containerWidth = element.offsetWidth;
    let textWidth = element.scrollWidth;
    let fontSize = parseInt(window.getComputedStyle(element).fontSize);

    while (textWidth > containerWidth && fontSize > 0) {
        fontSize--;
        element.style.fontSize = fontSize + 'px';
        textWidth = element.scrollWidth;
    }
}
