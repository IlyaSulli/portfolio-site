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
        text: "Nightfall descended, the heat of the day dissipating into a cool, refreshing breeze. The air grew crisp, and the world seemed to hold its breath. With one final burst of energy, Malloreis looked up and beheld the Enchanted Mycelium Grove—a sight like no other. Before them stood a glowing forest of luminous mushrooms, their ethereal light casting a serene, teal glow across the landscape."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: ""
    },
    {
        userImage: "",
        name: "",
        text: "Exhausted from a grueling week-long trek, Malloreis collapsed onto the cool, soft earth, feeling the tension slowly drain from their weary limbs. They lay on their back, gazing up at the bioluminescent canopy above, the mushrooms towering like ancient sentinels, their caps aglow with a gentle, otherworldly light that bathed the entire grove in a surreal, teal radiance."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The soft illumination seemed to pulse with a life of its own, each mushroom emitting a faint, rhythmic glow that created a serene, almost hypnotic atmosphere. The clear stream that wound its way through the grove mirrored this ethereal light, the water’s surface shimmering with hues of azure."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {userImage: "", name: "", text: "*SNAP*", backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"},
    {
        userImage: "",
        name: "",
        text: "The sudden, sharp snap of a twig shattered the tranquility of the grove, sending a jolt of adrenaline coursing through Malloreis's veins. Every sense was heightened, ears straining to catch the faintest sound as they tried to pinpoint the source of the disturbance."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Malloreis's eyes darted around the grove, searching the shadows for any sign of movement. But the forest had returned to its eerie silence, the only sound, the gentle rush of the stream nearby, as if the forest itself had swallowed whatever—or whoever—had caused the noise."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "From the darkness beyond the glowing mushrooms, a figure slowly emerged. It was a towering machine, standing a daunting seven feet tall. Its round, sturdy build was adorned with vibrant red ribbons that fluttered gently in the breeze, a stark contrast to its otherwise mechanical form. A large, weathered backpack was slung over its broad shoulders, evidence of the long and arduous journey it had undertaken to reach you."
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
        text: "I am an explorer from The City of Gear Mark and have traveled far and wide, searching for those with exceptional talent to join our society. And I believe, Malloreis, that you are the one we seek"
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {userImage: "../assets/images/dnd/unknownprofile.jpg", name: "Malloreis", text: "The City of Gear Mark? THE City of Gear Mark?" , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"},
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Yes, the very same. The City of Gear Mark—where the most brilliant inventors, engineers, and creators converge, sharing their knowledge to forge wonders that defy imagination."
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
        text: "I... I don't know what to say. It’s a lot to leave behind. My home, my friends... my family. How can I just walk away from everything I’ve ever known?"
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Take your time to consider, Malloreis. This is your ticket to the city. When you are ready to embrace your destiny, take this ticket and I will bring you to the city."
        , backgroundImage: "../assets/images/dnd/mushroomforest.png",
        music: "../assets/audio/dnd/228_Mushroom_Forest.mp3"
    },
]

const endPageUrl = 'e0-ticket.html';