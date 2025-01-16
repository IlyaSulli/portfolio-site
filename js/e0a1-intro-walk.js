window.onload = function() {
    document.body.style.backgroundImage = "url(../assets/images/dnd/walktocity.jpg)";
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
        text: "The moment you take the ticket from the automaton, something changes. Its rigid stature relaxes, and a faint light seems to flicker in its eyes—a spark of life, a glimmer of something beyond mere programming. The automaton's voice, usually monotone, carries a hint of warmth.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: ""
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "Thank you for choosing to join us at The City of Gear Mark. Now, take my hand, and I will guide you to the city.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You pause, uncertainty gnawing at the edges of your thoughts. Can you trust this machine, this metal being? But as your gaze meets its softly lit crimson eye, you see a reflection of something familiar—a shared sense of purpose. With a deep breath, you extend your hand.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The robot's hand closes around yours. It's surprisingly warm, the metal almost organic in its touch. The grip is firm yet gentle, as if holding something fragile, something precious. A strange sense of comfort washes over you—a feeling you hadn't realized you were missing. It's been so long since you've felt such a connection, even if it is with a machine.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3",
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "You",
        text: "So, tell me about yourself. If we're going to be together for the next few days, we might as well get to know each other.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Explorer Robot",
        text: "I'm glad you asked. My name is Aybel, an S001-2R1 android. I was created by the finest engineers in Gear Mark, designed to explore, protect, and serve. My creators gave me a fascination for the world, a deep-seated curiosity that drives me to understand and protect all that I encounter.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Aybel",
        text: "My life wasn't always like this though. In the early years of my existence I was taught by some of the smartest people in the city, being shown how to survive and live solo on this unique planet we call Novaterra and after my learning was complete I was sent out of the city to find people like you.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "There's a note of pride in Aybel's voice, as if speaking of a distant but cherished memory.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "But my journey wasn't always like this. In the early years of my existence, I was taught by the greatest minds in the city, learning to survive, to thrive, in this unique world of Novaterra. I remember those days fondly—days of exploration, of learning, of discovering the wonders of this planet. Once I was deemed ready, I was sent out to find people like you, those who seek a place of refuge, a place of true belonging.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: " As Aybel speaks, you're drawn into his words, the cadence of his voice soothing yet filled with an unspoken weight. Hours pass as he recounts tales of the city, of the challenges he faced in the wild, of the survival techniques he mastered. His stories are vivid, painting pictures in your mind of places you've never been, of dangers you've never faced, and of triumphs that feel almost within reach.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Days pass by and you find yourself asking endless questions, each one met with either an enthusiastic explanation or a quiet, contemplative pause. Some of his stories bring tears to your eyes—tales of loss, of loneliness, of a world that can be both beautiful and cruel. Other stories bring a smile to your face, tales of joy, of small victories, of moments of connection that defy the cold logic of machinery.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Just as you begin to feel the weight of the journey, hope fading with the passing hours, Aybel's unwavering optimism keeps you going. He never falters, his steps as steady as the day you met him, his voice a constant reassurance in the growing darkness.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The third night begins and something changes. Aybel's usual calm demeanor gives way to a quiet urgency, not unpacking to set rest for the night but instead moving at a faster pace than before.",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Aybel",
        text:  "\"We must keep going,\" he says, his voice firm. \"There's no time to stop. It's just over this hill\"",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3",
    },
    {
        userImage: "",
        name: "",
        text: " Exhausted, your legs heavy with fatigue, you push forward, driven by a need to understand what lies ahead. Then, through the haze of your exhaustion, you see it—peeking from the horizon...",
        backgroundImage: "../assets/images/dnd/walktocity.jpg",
        music: "../assets/audio/dnd/153_Secret_Garden.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The City of Gear Mark.",
        backgroundImage: "../assets/images/dnd/cityofgearmarkdistance.jpg",
        music: "../assets/audio/dnd/The Quiet Earth - Thomas Barrandon.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The sight takes your breath away. Perched on a blackened mountain, the city stands apart from the barren landscape that surrounds it. It's both industrial and regal, a fortress of steel and stone, glowing with an ethereal light that seems to pulse from within.",
        backgroundImage: "../assets/images/dnd/cityofgearmarkdistance.jpg",
        music: "../assets/audio/dnd/The Quiet Earth - Thomas Barrandon.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The buildings rise high, piercing the sky, their spires vanishing into the clouds above. It's more magnificent than you ever imagined—each structure a testament to the ingenuity and power of those who built it. The city stretches on for miles, its scale almost too vast to comprehend, a labyrinth of metal and light.",
        backgroundImage: "../assets/images/dnd/cityofgearmarkdistance.jpg",
        music: "../assets/audio/dnd/The Quiet Earth - Thomas Barrandon.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As you approach, the view of the city is gradually obscured by the towering city wall, a solid slab of concrete that spans hundreds of feet high, cutting off any glimpse of what lies beyond. The closer you get, the more imposing it becomes, a barrier that feels almost alive, humming with the power of the city it protects.",
        backgroundImage: "../assets/images/dnd/cityofgearmarkdistance.jpg",
        music: "../assets/audio/dnd/The Quiet Earth - Thomas Barrandon.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Reaching the entrance, the ambient light fades, replaced by deep shadows that seem to swallow the landscape. Your once giddy and excited feeling is replaced with a chill that runs down your spine as the world narrows to the path ahead. Your grip tightens on Aybel's hand, the warmth you once felt now replaced by a cold, unyielding metal.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Two metallic figures emerge from the darkness—guards, their forms massive and imposing. Statue-like, their spears crossed to block your path, their eyes glowing a menacing red.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknown.jpg",
        name: "Guard 1 & 2",
        text: "Halt! You are not welcome here. Leave now, or face death for trespassing on city grounds.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Confusion and fear grip you. You look to Aybel, seeking guidance, but find him oddly still. His headscarf, once a symbol of warmth, slips from his head, revealing a cold, expressionless face. And then, in a voice that seems to echo with authority, he speaks in a language you cannot understand.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Aybel",
        text: "ᛈᚪᛋᛋᚹᚩᚱᛞ× ᛏᚻᛖ ᚷᚱᛠᛏ ᛒᛖᛁᚩᚾᛞ. ᛏᚻᛖᛁ ᛞᚩᚾ×ᛏ ᛋᚢᛋᛈᛖᚳᛏ ᚪᚾᛁᚦᛁᛝ. ᚳᚩᚾᛏᛁᚾᚢᛖ ᚹᛁᚦ ᛞᛖᚠᚪᚢᛚᛏ ᛈᚱᚩᛏᚩᚳᚩᛚ",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The guards react immediately, their spears uncrossing in a smooth, synchronized motion and as they step aside, their heads bow slightly in respect.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknown.jpg",
        name: "Guard 1",
        text: "Alright, come with us.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Relief washes over you as you prepare to follow, but Aybel remains motionless, his gaze fixed on the ground. A sinking feeling grows in your chest as you realize something is wrong.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "You",
        text: "What's going on Aybel? Are you coming?",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/explorer.png",
        name: "Aybel",
        text: "\"I'm sorry, but this is as far as I can take you,\" he says, his voice barely above a whisper. \"As an outsider now, I cannot return. You must continue your journey alone.\"",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "His words hit you like a blow. You hadn't realized how much you had come to rely on him, how much his presence had anchored you in this strange, new world and without thinking, you pull him into a tight embrace. The cold metal metal against your skin sent shivers down your arms but even so, you didn't care.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Aybel doesn't respond, his body stiff and unyielding. He's never been hugged before, never experienced the warmth of another being. For a moment, he remains still, processing this unfamiliar sensation, before slowly raising his arms to awkwardly return the embrace.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "When you finally let go, there's a sadness in Aybel's eye, a flicker of something almost human. You exchange farewells, your voice trembling with emotion, before turning to follow the guards. The heavy stone doors begin to retract, revealing a harshly lit corridor, the light so bright it stings your eyes.",
        backgroundImage: "../assets/images/dnd/cityentrance.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As you step inside, the world outside fades, swallowed by the shadows of the city walls. You make your way through the facility, corridors twisting and turning, each different yet eerily similar. Guards stand watch at every corner, their eyes tracking your every move, their expressions unreadable.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The guards stop at a door, their presence filling the small space with a suffocating tension. You feel the weight of their eyes on you, but your lips remain sealed, fear tightening its grip on your throat.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The silence is broken by the sound of a door sliding open. A polished white robot in green medical scrubs steps into the corridor, its movements smooth and precise.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"Welcome,\" it says, its voice calm and reassuring. \"Apologies for the security measures; they're necessary to ensure the city's safety and to prevent imposters from slipping in.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "Now, I'll need your ticket to tag you for identification within the city.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Your hands tremble slightly as you dig into your pocket, pulling out the ticket. It gleams in the harsh light, its surface reflecting a thousand colors. For a moment, you're mesmerized by its beauty, a symbol of your journey, of the hope that brought you here.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "Thank you,\" it says, taking the ticket with a gentle grip. \"Before we can let you in, I will need to perform a screening for any outside viruses and foreign objects. For everyone's peace of mind, nothing from the outside can enter the city.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The nurse hands you a medical gown and with a single movement, it presses its finger to a sensor on the wall, and the door beside you slides open with a soft hiss. The room beyond is stark, almost clinical, with walls of polished metal and a single bench.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "Place all your belongings on the bench, change into the gown, and proceed through the next door. Stand in the middle of the room, and remain still until the lasers stop. I'll meet up with you afterward.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: " Numbly, you follow the instructions, your mind a whirl of thoughts and emotions. The environment around you is so alien, so advanced, that it feels like stepping into another world. Everything is sleek, efficient, devoid of the imperfections you're accustomed to.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You change into the gown, your clothes feeling heavy as you place them on the bench. The cool air of the room sends a shiver down your spine as you step forward, the door sliding shut behind you with an almost imperceptible click.",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "In the center of the room, you catch a glimpse of your reflection—pale, tired, but determined. Beside it, a large black device looms, its surface smooth and featureless, except for the front panel with hundreds of steel nozzles",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You remember the nurse's words, the instructions clear in your mind. Stand still. Wait. Don't move. The thoughts repeat like a mantra as you take your place in the center of the room",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The silence is oppressive, broken only by the sound of your own breathing. Then, without warning, the room hums to life",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "WHRRRRRRR... *silence* ... WHRRRRRR",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A grid of red lasers springs to life, crisscrossing the room in intricate patterns. They move slowly, methodically, scanning every inch of the space around you, inching upwards until they finally disappear.",
        backgroundImage: "../assets/images/dnd/thescanner.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "And then... nothing. The room is silent once more. You stand there, waiting, anxiety clawing at your chest. Why hasn't the door opened? What's taking so long?",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Finally, the door slides open, revealing the nurse. Its expression, usually unreadable, now carries a trace of concern.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"I have good news and bad news,\" it says, stepping closer. \"The bad news is that we detected a dangerous pathogen in your brain. It's slowly destroying your brain to survive.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The words hit you like a physical blow, your heart hammering in your chest. A pathogen? In your brain? How? When? The questions spiral out of control, your mind racing with fear.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"The good news,\" it continues, its voice steady, \"is that we have the cure and once it is removed, you'll be able to enter the city.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Panic sets in. The idea of something so invasive, so sinister, lodged in your mind, is too much to bear. You barely register the nurse's next words, lost in your own thoughts. What if the cure doesn't work? What if something goes wrong? Will I die here, in this cold, sterile room, so far from everything I know?",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"I see you're stressed,\" it says, a note of sympathy in its voice. \"But everything will be fine. Follow me, and we'll have this fixed in minutes.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Your legs move automatically, following the nurse as it leads you to another room. The walls here are lined with hospital beds, each one behind a thick curtain. The smell of antiseptic fills the air, sharp and sterile, adding to the surreal atmosphere.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The nurse stops at a bed near the end of the row, the curtains drawn back to reveal a simple, pristine surface.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "\"Please lie down,\" it instructs, its tone gentle but firm. \"We'll administer a vaccine to kill the parasite. To ensure precision, I'll need to strap you in. This will ensure that the needle goes into the correct place. If you feel uncomfortable at any time, just let me know, and I'll stop.\"",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },

    {
        userImage: "",
        name: "",
        text: "The bed feels cold beneath you as you lie down, the metal straps snapping into place around your arms and legs with a soft click. The restraints are tight, holding you securely to the bed. You’re completely immobilized, the reality of the situation sinking in as the nurse moves to retrieve a large syringe filled with a glowing blue liquid.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/245_Secret_Facility.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The sight of the syringe sends a wave of fear through you, but you force yourself to remain calm. This is for your safety, you tell yourself. This is necessary. The nurse leans in, its face close to yours as it gently presses the needle into your arm.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "As the liquid enters your bloodstream, a cold, tingling sensation spreads through your body. It starts in your arm, but quickly spreads, sending chills down your spine. Something isn’t right. The tingling intensifies, turning into a sharp, uncomfortable prickling that crawls across your skin.",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "You",
        text: "STOP! I want to stop, this isn't r—",
        backgroundImage: "../assets/images/dnd/corridorwall.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Your voice is cut off as a wave of dizziness crashes over you. The world tilts, the room spinning wildly as you feel your body sinking into the bed. Your vision blurs, darkening at the edges, and you hear the nurse’s soft, almost mocking laughter echoing in your ears.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/nurse.png",
        name: "Robot Nurse",
        text: "You thought you had a choice...",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The nurse’s cold, mechanical face, staring into your soul. Darkness sets upon you.",
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
        text: "You’re falling, the sensation of weightlessness pulling you down, down, into an abyss of endless black. The world around you fades into nothingness, the shapes and colors dissolving into the void. Your muscles go limp, your head lolls to one side, sinking deeper and deeper into a sea of darkness.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "The last thing you glimpse before your vision fades completely is the room around you, the curtains parting as more robotic figures enter. They move with eerie precision, their faces obscured by shadows, revealing 4 other creatures also locked into separate beds, in the same situation as you. Who are they? What are they?",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "You call out with the last bit of energy within you",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "../assets/images/dnd/unknownprofile.jpg",
        name: "You",
        text: "help! hel...",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Darkness",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "PAIN—a searing, excruciating pain that rips through your consciousness, as if a million needles are stabbing into your mind at once. The agony is unbearable, consuming every thought, every sensation. You try to scream, but no sound comes out.",
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
        text: "The pain disappears as quickly as it came, leaving behind a numb, hollow void.",
        backgroundImage: "../assets/images/dnd/falling.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: " A rush of euphoria follows, a wave of bliss that washes over you, erasing every trace of the person you once were. Your memories, your identity, your very essence—all gone in an instant.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "Leaving only the ghost of who you was in the outside world",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "A voice fills the void, commanding, authoritative, shaping your thoughts, your reality. It tells you who you are, who you must be in this city. And you listen. You accept it all as truth, unquestioning, unresisting.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "But deep within, something stirs. A flicker of doubt, a whisper of unease.",
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
        text: "SOMETHING isn't right",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
    {
        userImage: "",
        name: "",
        text: "This history, these people... they aren’t real.",
        backgroundImage: "../assets/images/dnd/fallingnobody.jpg",
        music: "../assets/audio/dnd/248_Alien_Reactor.mp3"
    },
];

const endPageUrl = 'e0-complete.html'
