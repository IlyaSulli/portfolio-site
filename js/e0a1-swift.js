document.addEventListener("DOMContentLoaded", showDialogue);

window.onload = function() {
    document.body.style.backgroundImage = "url('../assets/images/dnd/forest.png')";
}

// Dialogue functionality
const dialogue = [
    { userImage: "", name: "", text: "As the relentless sun beat down through the canopy, Swift wandered aimlessly through the forest, her path looping back on itself endlessly. Her growing thirst gnawed at her, her tongue dry and parched made her edge closer to madness." },
    { userImage: "", name: "", text: "Just when her spirit began to falter, she stumbled upon a small clearing. The sound of a gentle stream caught her attention, her eyes widening with relief as she saw a crystal-clear waterfall cascading down into a serene river" },
    { userImage: "", name: "", text: "With a burst of renewed energy, Swift dashed towards the water, her heart pounding in her chest. She knelt by the edge and scooped up handfuls of the cool, refreshing liquid, drinking deeply. The sensation was heavenly, and for a moment, she allowed herself to relax, the tension of being lost melting away with each gulp." },
    { userImage: "", name: "", text: "*SNAP*"},
    { userImage: "", name: "", text: "A sudden, sharp snap of a twig brought her senses back to full alert, her ears pricking up as she listened for the source of the sound."},
    { userImage: "", name: "", text: "Her eyes darted around the clearing, but she saw nothing. The forest was silent, the only sound, the gentle rush of the stream."},
    { userImage: "", name: "", text: "*snap*"},
    { userImage: "", name: "", text: "Emerging from the shadows, a towering figure stepped into the clearing. The automaton stood at a daunting seven feet, its round, sturdy build adorned with vibrant red ribbons fluttering gently in the breeze. A large backpack slung over its shoulders, hinting at the extensive journey it had undertaken."},
    { userImage: "../assets/images/dnd/swift.png", name: "Swift", text: "Get back beast! I'm not afraid to fight you!" },
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "Fear not, I come in peace"},
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "I am an explorer from The City of Gear Mark, seeking great talent to join our society, and I believe, you Swift of the Well are the one we seek."},
    { userImage: "../assets/images/dnd/swift.png", name: "Swift", text: "What is this City of Gear Mark you speak of?"},
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "Ha Ha Ha! I haven't heard anyone say that in a long time!"},
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "The City of Gear Mark is a place where the most talented inventors, engineers, and creators come together to share their knowledge and create the most amazing things. As a society we work together to create a better world for all, away from all the chaos and destruction of the outside world."},
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "We have been watching you Swift, and we believe you have the talent and the heart to join us. What do you say? I have to warn you that this will be the only chance you will ever get to enter" },
    { userImage: "../assets/images/dnd/swift.png", name: "Swift", text: "I... I don't know what to say. I've never heard of this place before, but at this point I have no place to go, stuck in the middle of nowhere and I don't even know where my home is." },
    { userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "Well, i'll let you think about it. This is your ticket to the city, when you decide to join, tear it and you will be brought to the city." },
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
