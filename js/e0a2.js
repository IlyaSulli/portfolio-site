document.addEventListener("DOMContentLoaded", showDialogue);

window.onload = function() {
    document.body.style.backgroundImage = "url('../assets/images/dnd/lab.png')";
}

// Dialogue functionality
const dialogue = [
    { userImage: "", name: "", text: "Upon tearing the ticket, a dark mist envelops you, collapsing to the ground almost instantaneously, seeing nothing, feeling nothing, only the sensation remaining...hearing."},
    { userImage: "", name: "", text: "The automaton that just moments ago handed you the ticket, now picks your limp body up and throws you into their rucksackb before moments later hearing its mechanical limbs whir as it starts to move."},
    { userImage: "", name: "", text: "Over the next few days you fall into limbo, the sensation of never knowing if you are awake or asleep not knowing what they are going to do."},
    { userImage: "", name: "", text: "You wake up in a cold sweat, the feeling of the unknown still lingering,"},
    { userImage: "", name: "", text: "ᚽᛆᚢᛁ ᛁᚭᚢ ᚴᚭᛐ ᛆ ᛐᛆᛁᛚ?"},
    { userImage: "", name: "", text: "You hear a voice, a voice that is not your own, a voice that is not the automaton, a voice that is not familiar."},
    { userImage: "", name: "", text: "The voice speaks again"},
    { userImage: "../assets/images/dnd/unknown.jpg", name: "Voice 1", text: "" },
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
