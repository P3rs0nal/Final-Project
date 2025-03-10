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
    const beats = document.querySelectorAll(".beat");
    const playButton = document.getElementById("playButton");
    let isPlaying = false;
    let currentStep = 0;
    let interval;
    const totalS = 12;

    // Toggle beat activation on click
    beats.forEach(beat => {
        beat.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });

    // Function to play the beat sequence
    function playSequence() {
        const steps = document.querySelectorAll(`[data-step="${currentStep}"]`);

        steps.forEach(step => {
            if (step.classList.contains("active")) {
                const sound = document.getElementById(`${step.parentNode.dataset.sound}-sound`);
                if (sound) {
                    sound.currentTime = 0;
                    sound.play();
                }
            }
            step.classList.add("playing"); // Highlight current step
        });

        setTimeout(() => {
            steps.forEach(step => step.classList.remove("playing")); // Remove highlight after playing
        }, 200);

        currentStep = (currentStep + 1) % totalS; // Loop through 4 steps
    }

    // Toggle playback on button click
    playButton.addEventListener("click", function () {
        if (isPlaying) {
            clearInterval(interval);
            playButton.textContent = "Play";
        } else {
            interval = setInterval(playSequence, 150); // Play every 500ms
            playButton.textContent = "Stop";
        }
        isPlaying = !isPlaying;
    });
});