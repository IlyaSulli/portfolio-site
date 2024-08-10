window.onload = function() {
    document.body.style.backgroundImage = "url(../assets/images/dnd/desertVillage.png)";
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
        text: "The golden light of the late evening sun streamed through the arched windows of the village library, casting long shadows across the rows of ancient books and scrolls. At one of the tables, nestled between towering shelves, sat Folio—deep in concentration, the world outside forgotten.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: ""
    },
    {
        userImage: "",
        name: "",
        text: "The library, perched on the edge of the village, was a place of refuge for Folio. Here, surrounded by the wisdom of centuries, they could lose themselves in the pursuit of knowledge. This evening was no different, reading up on the latest discoveries. This week, the newly found forest known as The Enchanted Mycelium Grove.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Here, there existed a special kind of fungus which on consumption would sooth the pain and speed up recovery from weeks to a matter of minutes.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Folio’s fingers traced the delicate script, eyes wide with fascination of all the endless possibilities this would open for the village and help expand quicker.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Time slipped away unnoticed, and soon Folio was the only one left in the library. The silence was absolute, broken only by the soft rustle of pages and the distant call of a desert bird outside.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "With a sigh of contentment, Folio carefully closed the book, running a hand over its newly cracked leather cover, and began to gather their things. The library’s vast emptiness felt almost comforting, like an old friend.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Folio's footsteps echoed softly on the terracotta tiles, making their way to the large wooden doors. They creaked open and Folio stepped out into the cool desert night, looking out onto the dunes of the desert that span infinitely.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As they turned to lock the door behind them, a shadow shifted in the periphery of their vision, the silhouette slowly looming over more and more of the door until the entire doorway was covered in darkness.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "*Clump* *Clump* *Clump*",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The hairs on the back of Folio's neck raised, as they look back",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A towering figure emerged. The robot stood tall, Its face illuminated by a soft blue glow that radiated from its single eye. Its sturdy frame was decorated with deep red ribbons that fluttered gently in the breeze.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Folio",
        text: "Get back beast! I'm not afraid to fight you!",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Fear not, I come in peace",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "I am an explorer from The City of Gear Mark, seeking great talent to join our society, and I believe, you Folio are the one we seek.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Folio",
        text: "THE City of Gear Mark? I've read so much about the city!",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "It is precisely your thirst for knowledge that makes you valuable, Folio. We have been observing you. Your dedication, your intellect—these are qualities we seek in those who will shape the future",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "We would like to invite you to the city to become one of our residents, but I have to warn you will never be able to return back.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Folio felt their pulse quicken. The thought of leaving their village, their home, was daunting. Yet the prospect of joining such a prestigious society, of having access to the world’s most advanced knowledge, was equally exhilarating. The opportunity was incredible, but it came with a heavy price—leaving behind everything they knew.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },

    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "I understand that this is a difficult decision. But I must tell you, this opportunity is fleeting. Just to remind you that if you choose to join us, you will be granted access to knowledge and resources beyond your wildest dreams. But if you decline, this chance will never come again",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The robot’s words hung in the air, their weight pressing down on Folio; they glanced back at the library, at the village they had always known. Then their gaze returned to the machine, standing tall and resolute against the vast desert night.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Take your time to decide, Folio. Once you decide, take this ticket and I will bring you to the city.",
        backgroundImage: "../assets/images/dnd/desertVillage.png",
        music: "../assets/audio/dnd/7_The_Desert_Awaits.mp3"
    },

]

const endPageUrl = 'e0-ticket.html';
