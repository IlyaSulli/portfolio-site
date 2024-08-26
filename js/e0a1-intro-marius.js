window.onload = function() {
    document.body.style.backgroundImage = "url(../assets/images/dnd/cityofgearmarkdistance.jpg)";
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

let dialogue;
dialogue = [
    {
        userImage: "",
        name: "",
        text: "The City of Gear Mark towered over the desolate landscape like a monolith from a forgotten age. From a distance, its lights flickered like a mirage in the dawn, illuminating the horizon with a haunting, ethereal glow.",
        backgroundImage: "../assets/images/dnd/cityofgearmarkdistance.jpg",
        music: ""
    },
    {
        userImage: "",
        name: "",
        text: "As you drew closer, the city's true nature revealed itself: an endless, imposing wall of concrete, stretching for miles without a break. There were no gates, no windows—no sign of life beyond its cold, stone exterior. It was a fortress, sealed shut, hiding whatever secret technology lay within.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Inside those walls, technology and innovation thrived—so they said. Protected from the dangers that plagued the outside world, the inhabitants of Gear Mark shielded their advancements with absolute secrecy. No whispers or sounds ever reached the outside. It was a place of unsolved mysteries, and for those few desperate enough to seek answers, it became an obsession.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Curiosity drew people together. And for a particular group of wanderers, it became an unrelenting force, pulling them closer to the city’s foreboding walls.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The group had camped on the outskirts for days, scouring every inch of the city’s massive wall, seeking a crack, a flaw—anything that could grant them a glimpse inside. Weeks passed with no success, only frustration, until one day, by some stroke of luck, something was found.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A single pipe, hidden amongst the jagged black boulders near the city’s base, jutted from the wall. It was corroded, its surface rough and rusted, dripping foul-smelling liquid into the cracked earth below. Small, unassuming, but it was a lifeline—a connection to whatever lay inside the city.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Marius, driven by the gnawing need for answers, crouched cautiously beside the pipe. The stench made their eyes water, their stomach churn. The pipe’s narrow bend provided no easy answers, but desperation outweighed any common sense. With determination, Marius forced their arm into the pipe.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "They felt their way through the filth, fingers slipping against cold metal. Further and further they pushed until their hand came to rest on something hard—a metallic object lodged deep within.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "It was cold, smooth, almost spherical. Marius's heart raced as they grasped it firmly. With a quick, desperate yank, the object broke free with a sharp *SNAP*.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Pulling it from the pipe, Marius held it before them in the fading light. It was like nothing they had seen before—small, round, and humming softly with energy. Its surface was flawless, except for a soft red light pulsing from within.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Marius",
        text: "\"What are you?\" Marius whispered, awestruck.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "But no answers came. As the sun dipped lower and shadows lengthened, Marius wrapped the device in cloth and stuffed it into their pack. The weight of their discovery hung heavily in their mind as they made their way back to camp, the stench of sewage still clinging to them, but a flicker of hope now stirred within.",
        backgroundImage: "../assets/images/dnd/wastewateroutput.jpg",
        music: "../assets/audio/dnd/211_Thieves_Guild.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As Marius approached the camp, one of the group members greeted them with a tired, croaked voice.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Group member",
        text: "\"Find anything?\" the group member asked, barely looking up, their motivation fading.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Marius hesitated, clutching the pack tightly. Fear crept in, whispering dark thoughts. What if they turn against you? What if this object has nothing to do with the city? The excitement of discovery quickly gave way to dread.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Marius swallowed hard.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Marius",
        text: "\"Nothing,\" they said, their voice low and strained.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The group continued on, oblivious, each disappointed by their own failures. As the evening wore on, they gathered around the campfire, sharing stories and idle chatter. But Marius remained silent, their mind spinning with thoughts of the unknown.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Night fell, and the fire burned low. One by one, the group settled into sleep, their bodies worn and aching from the day’s efforts. Marius lay awake, restless, their mind consumed by the mysterious object in their pack. Sleep came slowly, but peace was not meant for this night.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/51_Woodland_Campsite.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "*THUD* ... *THUD* ... *THUD*",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Marius awoke to the sensation of something stone-cold gripping their legs. Their eyes snapped open in alarm, but the world remained dark. The remnants of the fire were nothing more than smoldering embers, casting faint light over the campsite.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "They tried to move, but the cold grip tightened, pinning them to the ground. Panic surged as their vision adjusted, and then they saw them.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Figures—towering above them, cloaked in shadow. Robots.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Their bulky stature and dark cloaks concealed them against the night sky, the only visible feature being their crimson eyes, glowing with an ominous intensity.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Before Marius could scream, one of the robots stepped forward and seized them by the arms. Its grip was cold and unrelenting, like iron bands.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Marius struggled, thrashing with all their might, but it was no use. The robot's strength was far beyond anything Marius could resist. A gag was roughly shoved into their mouth, silencing them.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "In moments, coarse ropes bound their arms and legs, the fibers biting into their skin. Panic gripped Marius as they fought to break free, but the robots worked with a terrifying efficiency, devoid of emotion or mercy.",
        backgroundImage: "../assets/images/dnd/camp.jpg",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A rough, suffocating bag was pulled over Marius’s head, plunging them into complete darkness. The world became muffled—the only sound was the rhythmic *thud* of the robots’ heavy steps.",
        backgroundImage: "../assets/images/dnd/darkness.png",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The robots moved in unison, carrying Marius helplessly. *THUD* *THUD* *THUD*",
        backgroundImage: "../assets/images/dnd/darkness.png",
        music: "../assets/audio/dnd/238_Mind_Flayer_Chamber.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Time dragged on, and Marius's thoughts swirled. What had they done? What was that object? Whatever mysteries the city held, Marius had angered something—or someone—far more powerful than they could have imagined.",
        backgroundImage: "../assets/images/dnd/darkness.png",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Finally, the robots halted. Marius heard the grinding of stone, then the sound of metal shifting. They were being taken deeper into the heart of the city, far beyond the reach of the outside world. With each step, the weight of dread pressed heavier on Marius.",
        backgroundImage: "../assets/images/dnd/darkness.png",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "When they stopped, Marius was thrown onto a cold, metallic table. The sharp scent of antiseptic filled the air, sterile and oppressive. The ropes were removed, but this freedom was fleeting. Cold metal restraints replaced them, locking Marius into place.",
        backgroundImage: "../assets/images/dnd/darkness.png",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The bag was yanked from Marius’s head, and blinding light flooded their eyes. Marius blinked rapidly, heart pounding as their vision adjusted.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "They were in a large medical room. Blue curtains surrounded the table on three sides, concealing whatever else lay beyond. The far wall was lined with sterile equipment, and standing nearby was a robot nurse, its cold gaze fixed on Marius with unsettling curiosity.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Without a word, the nurse began preparing something out of sight, its movements methodical and precise.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Panic set in. Marius’s mind raced. What were they going to do? Was this the end? The minutes stretched on, the silence broken only by the hum of machinery and the soft clinks of instruments being prepared.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Through a gap in the curtain, Marius caught a glimpse of a nurse and a creature—not of metal, but of flesh. Marius tried to call out, but only a muffled whisper escaped past the gag, drowned out by the artificial lights above.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Then another nurse. And another. Each one identical, yet the creatures they brought in were vastly different, each seeming to face the same fate as Marius.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"Please lie down,\" the nurse repeated in a calm, mechanical tone. \"We will administer a vaccine to eliminate the parasite. To ensure precision, I will need to strap you in. If you feel uncomfortable at any time, let me know, and I will stop.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The words were calm, but Marius knew something wasn’t right.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The nurse approached Marius with a large syringe filled with glowing blue liquid. Fear surged through them. The nurse leaned close, pressing the needle into Marius's arm.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As the liquid entered Marius's bloodstream, a cold, tingling sensation spread through their body. It started in their arm, quickly sending chills down their spine. There was no resisting now, only acceptance of what seemed to be their inevitable end.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The tingling intensified, turning into a sharp, unbearable prickling that crawled across their skin. Across the room, Marius heard the faint, desperate cries of others—creatures like them, silenced one by one.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "Creatures",
        text: "\"STOP! I want to stop, this isn’t r—\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"You thought you had a choice...\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As the world faded to black, the last thing Marius saw was the nurse’s mechanical face, its glowing eyes filled with a terrible, calculated indifference.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Falling...",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You’re falling, the sensation of weightlessness pulling you down, down, into an abyss of endless black. The world around you dissolves into nothingness, your muscles limp, your head slumping to one side as you sink deeper and deeper into a sea of darkness.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The last thing you glimpse before your vision fades completely is the room around you, the curtains parting. Each bed had a nurse like yours, all moving in eerie unison, the other creatures also locked into separate beds, unconscious.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You call out with the last bit of energy within you.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "You",
        text: "\"Help! Hel...\"",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Darkness.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "PAIN—a searing, excruciating pain rips through your mind, as if a million needles are stabbing into your consciousness all at once. The agony is unbearable, consuming every thought, every sensation. You try to scream, but no sound escapes.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "And then... nothing.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The pain vanishes as suddenly as it came, leaving behind only a numb, hollow void.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A rush of euphoria follows, a wave of bliss that washes over you, erasing every trace of the person you once were. Your memories, your identity—everything—fades in an instant.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Only the ghost of who you once were remains.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A voice fills the void, commanding, authoritative, shaping your thoughts and reality. It tells you who you are, who you must be in this city. And you listen. You accept it all as truth, without question or resistance.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "But deep within, something stirs—a flicker of doubt, a whisper of unease.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Something isn’t right.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "SOMETHING isn't right.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "This history, these people... they aren’t real.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    }
];

const endPageUrl = 'e0-complete.html'