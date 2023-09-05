const textElement = document.getElementById('typewritterText');
const cursorElement = document.getElementById('typewritterCursor');
const text = "Let's start chatting";

let charIndex = 0;

function type() {

    textElement.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(type, 50);

}

type();