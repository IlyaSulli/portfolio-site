document.addEventListener("DOMContentLoaded", showDialogue);

document.addEventListener("DOMContentLoaded", function() {
    const muteButton = document.getElementById("mute");
    const audios = document.querySelectorAll("audio");
    let isMuted = false;

    muteButton.addEventListener("click", function() {
        // Toggle the active state
        isMuted = !isMuted;
        muteButton.classList.toggle("active", isMuted);

        audios.forEach(audio => {
            if (isMuted) {
                audio.muted = true;
            } else {
                audio.muted = false;
                // Ensure the audio plays only after user interaction
                if (audio.paused) {
                    audio.play().catch(error => {
                        console.log("Audio play was prevented:", error);
                    });
                }
            }
        });
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

let currentSentence = 0;
let typing = false;
let typeTimeout;
let currentMusic = "";

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

function updateBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
}

function updateMusic(musicUrl) {
    const audio = document.querySelector("audio");
    if (audio.src !== musicUrl) {
        audio.src = musicUrl;
        audio.play();
    }
}

function showDialogue() {
    const speakArea = document.getElementById("speakArea");
    speakArea.style.visibility = "visible";

    function nextSentence() {
        if (currentSentence < dialogue.length) {
            const { userImage, name, text, backgroundImage, music } = dialogue[currentSentence];
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

            // Update background image
            updateBackground(backgroundImage);

            // Update music if it has changed
            if (music !== currentMusic) {
                currentMusic = music;
                updateMusic(music);
            }

            typeSentence(text, () => {
                speakArea.onclick = handleNextClick;
            });
        } else {
            if (typeof endPageUrl !== 'undefined' && endPageUrl) {
                window.location.href = endPageUrl;
            } else {
                console.log("No end page URL specified.");
            }
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
