window.onload = function() {
    document.body.style.backgroundImage = "url(../assets/images/dnd/mushroomforest.png)";
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

const dialogue = [
    {
        userImage: "",
        name: "",
        text: "Night fell and with that so did the heat, bringing temperatures down with it. With the last burst of energy Malloreis glanced up to see the Enchanted Mycelium Grove, a glowing forest of healing mushrooms."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: ""
    },
    {
        userImage: "",
        name: "",
        text: "Having made it to their destination, Malloreis lay on their back, exhausted after the week long trek. This place was something out of a dream, the teal hue of the mushrooms reflecting off the stream which runs through the forest"
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {userImage: "", name: "", text: "*SNAP*", backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"},
    {
        userImage: "",
        name: "",
        text: "A sudden, sharp snap of a twig brought the senses back to full alert, ears pricking up as Malloreis listened for the source of the sound."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Darting around, Malloreis attempted to find the source but to no success. The forest was silent, the only sound, the gentle rush of the stream."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Emerging from the shadows, a towering figure stepped into the clearing. The automaton stood at a daunting seven feet, its round, sturdy build adorned with vibrant red ribbons fluttering gently in the breeze. A large backpack slung over its shoulders, hinting at the extensive journey it had undertaken."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Malloreis",
        text: "Get back beast! I'm not afraid to fight you!"
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {userImage: "../assets/images/dnd/explorer.png", name: "Explorer Automaton", text: "Fear not, I come in peace" , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"},
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "I am an explorer from The City of Gear Mark, seeking great talent to join our society, and I believe, you  are the one we seek."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {userImage: "../assets/images/dnd/unknownprofile.jpg", name: "Malloreis", text: "THE City of Gear Mark?" , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"},
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Yes, The City of Gear Mark. The place where the most talented inventors, engineers, and creators come together to share their knowledge and create the most amazing things."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "We have been watching you Malloreis, and we believe you have the talent and the heart to join us. What do you say? I have to warn you that this will be the only chance you will ever get to enter"
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Malloreis",
        text: "I... I don't know what to say. That is a lot to leave, having to say goodbye to everyone, friends... family."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Well, i'll let you think about it. This is your ticket to the city, when you decide to join, take it and I will bring you to the city."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
]

const endPageUrl = 'e0-ticket.html';