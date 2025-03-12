document.addEventListener("DOMContentLoaded", function () {
    const chordButtons = document.querySelectorAll(".chord-btn");
    const playProgressionButton = document.getElementById("play-progression");
    const clearProgressionButton = document.getElementById("clear-progression");
    const chordInfo = document.getElementById("chord-info");
    const pianoKeys = document.querySelectorAll(".key");
    
    let selectedChords = [];

    const chords = {
        "Cmaj": ["C", "E", "G"],
        "Gmaj": ["G", "B", "D"],
        "Amin": ["A", "C", "E"],
        "Fmaj": ["F", "A", "C"]
    };

    // Map keyboard input to piano notes
    const keyMap = {
        "a": "C",
        "w": "C#1",
        "s": "D",
        "e": "D#1",
        "d": "E",
        "f": "F",
        "t": "F#1",
        "g": "G",
        "y": "G#1",
        "h": "A",
        "u": "A#1",
        "j": "B",
        "k": "C2"
    };


    // Chord formula info
    const chordFormulas = {
        "Cmaj": "C Major = Root (C) + Major Third (E) + Perfect Fifth (G)",
        "Gmaj": "G Major = Root (G) + Major Third (B) + Perfect Fifth (D)",
        "Amin": "A Minor = Root (A) + Minor Third (C) + Perfect Fifth (E)",
        "Fmaj": "F Major = Root (F) + Major Third (A) + Perfect Fifth (C)"
    };

    // Play notes when clicked
    pianoKeys.forEach(key => {
        key.addEventListener("click", function () {
            const note = this.dataset.note;
            playNote(note);
        });
    });

    function playNote(note) {
        const audio = document.getElementById(note);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        } else {
            console.error(`Audio element for note ${note} not found.`);
        }
    }

    // Play chord & highlight keys
    function playChord(chord) {
        const notes = chords[chord];
        let delay = 0;

        notes.forEach(note => {
            playNote(note);
            highlightKey(note);
        });
    }

    function highlightKey(note) {
        const key = document.querySelector(`.key[data-note="${note}"]`);
        if (key) {
            key.classList.add("active");
            setTimeout(() => key.classList.remove("active"), 500); // Remove highlight after .5 seconds
        }
    }
    
    document.addEventListener("keydown", function (event) {
        if (keyMap[event.key]) {
            const note = keyMap[event.key];
            playNote(note);
            highlightKey(note);
        }
    });

    function highlightChordKeys(chord) {
        const allKeys = document.querySelectorAll(".key");
        allKeys.forEach(key => key.classList.remove("active"));

        const chordNotes = chords[chord];
        chordNotes.forEach(note => {
            highlightKey(note);
        });
    }

    function showChordInfo(chord) {
        chordInfo.textContent = chordFormulas[chord];
    }

    // Chord button
    chordButtons.forEach(button => {
        button.addEventListener("click", function () {
            const chord = this.dataset.chord;
            selectedChords.push(chord);
            updateChordProgressionDisplay();
            playChord(chord);
            highlightChordKeys(chord);
            showChordInfo(chord);
        });
    });

    function updateChordProgressionDisplay() {
        const progressionDisplay = document.getElementById("chord-progression");
        progressionDisplay.innerHTML = "";

        selectedChords.forEach((chord, index) => {
            const chordElement = document.createElement("span");
            chordElement.textContent = `${index + 1}. ${chord} `;
            progressionDisplay.appendChild(chordElement);
        });
    }

    // Play chord sequence
    playProgressionButton.addEventListener("click", function () {
        let delay = 0;
        selectedChords.forEach((chord) => {
            setTimeout(() => {
                playChord(chord);
                highlightChordKeys(chord);
                showChordInfo(chord);
            }, delay);
            delay += 1000; // Play after 1 second
        });
    });

    // Clear progression
    clearProgressionButton.addEventListener("click", function () {
        selectedChords = [];
        chordInfo.textContent = "Select a chord to see its notes.";
        document.getElementById("chord-progression").innerHTML = "";
    });
});
