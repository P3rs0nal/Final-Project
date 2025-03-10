document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("modeToggle");
    if (localStorage.getItem("modeToggle") === "light") {
        document.body.classList.add("light");
        button.textContent = "Dark";
    }
    button.addEventListener("click", modeToggle);
});

function modeToggle(){
    const body = document.body;
    const button = document.getElementById("modeToggle");
    body.classList.toggle("light");
    const light = body.classList.contains("light");

    if(light){
        button.textContent = "Dark";
        localStorage.setItem("modeToggle", "light")
    }
    else{
        button.textContent = "Light";
        localStorage.setItem("modeToggle", "dark")
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const chordButtons = document.querySelectorAll(".chord-btn");

    chordButtons.forEach(button => {
        button.addEventListener("click", function () {
            const chord = this.dataset.chord;
            playChord(chord);
            highlightChordKeys(chord);
        });
    });

    function playChord(chord) {
        const audio = document.getElementById(chord);
        if (audio) {
            audio.currentTime = 0; // Restart sound if already playing
            audio.play();
        }
    }

    function highlightChordKeys(chord) {
        const allKeys = document.querySelectorAll(".key");
        allKeys.forEach(key => key.classList.remove("active"));

        const chords = {
            "Cmaj": ["C", "E", "G"],
            "Gmaj": ["G", "B", "D"],
            "Amin": ["A", "C", "E"],
            "Fmaj": ["F", "A", "C"]
        };

        const chordNotes = chords[chord];
        chordNotes.forEach(note => {
            const noteKey = document.querySelector(`.key[data-note="${note}"]`);
            if (noteKey) {
                noteKey.classList.add("active");
            }
        });
    }
});

    document.querySelectorAll('.chord-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const chord = event.target.getAttribute('data-chord');
            playChord(chord); // Play the selected chord
        });
    });