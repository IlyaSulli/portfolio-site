window.onload = function() {
    document.body.style.backgroundImage = "url(../assets/images/dnd/forestriver.png)";
    // Initialize audio
    const audio = new Audio();
    audio.loop = true;
    document.body.appendChild(audio);
}

// Dialogue functionality
const ticket = document.getElementById("ticket");
ticket.addEventListener("click", () => {
    gsap.to("#app", {
        y: 100, duration: 1, onComplete: () => {
            document.getElementById("app").style.display = "none";
            showDialogue();
        }
    });
});
// Dialogue functionality
const dialogue = [
    {
        userImage: "",
        name: "",
        text: "As the relentless sun beat down through the canopy, Swift wandered aimlessly through the forest, her path looping back on itself endlessly. Her growing thirst gnawed at her, her tongue dry and parched made her edge closer to madness.",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Just when her spirit began to falter, she stumbled upon a small clearing. The sound of a gentle stream caught her attention, her eyes widening with relief as she saw a crystal-clear waterfall cascading down into a serene river",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "With a burst of renewed energy, Swift dashed towards the water, her heart pounding in her chest. She knelt by the edge and scooped up handfuls of the cool, refreshing liquid, drinking deeply. The sensation was heavenly, and for a moment, she allowed herself to relax, the tension of being lost melting away with each gulp.",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "", name: "", text: "*SNAP*", backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A sudden, sharp snap of a twig brought her senses back to full alert, her ears pricking up as she listened for the source of the sound.",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Her eyes darted around the clearing, but she saw nothing. The forest was silent, the only sound, the gentle rush of the stream.",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "", name: "", text: "*snap*", backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Emerging from the shadows, a towering figure stepped into the clearing. The automaton stood at a daunting seven feet, its round, sturdy build adorned with vibrant red ribbons fluttering gently in the breeze. A large backpack slung over its shoulders, hinting at the extensive journey it had undertaken."
        , backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/swift.png",
        name: "Swift",
        text: "Get back beast! I'm not afraid to fight you!",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "Fear not, I come in peace",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "I am an explorer from The City of Gear Mark, seeking great talent to join our society, and I believe, you Swift of the Well are the one we seek.",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/swift.png",
        name: "Swift",
        text: "What is this City of Gear Mark you speak of?",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "Ha Ha Ha! I haven't heard anyone say that in a long time!",
        backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "The City of Gear Mark is a place where the most talented inventors, engineers, and creators come together to share their knowledge and create the most amazing things. As a society we work together to create a better world for all, away from all the chaos and destruction of the outside world."
        , backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "We have been watching you Swift, and we believe you have the talent and the heart to join us. What do you say? I have to warn you that this will be the only chance you will ever get to enter"
        , backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/swift.png",
        name: "Swift",
        text: "I... I don't know what to say. I've never heard of this place before, but at this point I have no place to go, stuck in the middle of nowhere and I don't even know where my home is."
        , backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Automaton",
        text: "Well, i'll let you think about it. This is your ticket to the city, when you decide to join, tear it and you will be brought to the city."
        , backgroundImage: "../assets/images/dnd/forestriver.png",
        music: "../assets/audio/dnd/223_Salt_Marsh.mp3"
    },
];
const endPageUrl = 'e0-ticket.html';
