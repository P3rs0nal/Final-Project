document.addEventListener("DOMContentLoaded", function () {
    const beats = document.querySelectorAll(".beat"); //Find all beats
    const playButton = document.getElementById("playButton");
    let isPlaying = false;
    let currentStep = 0;
    let interval;
    const totalSteps = 12;

    // Allow user to click beat
    beats.forEach(beat => {
        beat.addEventListener("click", function () {
            beat.classList.toggle("active");
        });
    });

    function playSequence() {
        const steps = document.querySelectorAll(`[data-step="${currentStep}"]`);
        steps.forEach(step => {
            // Play if selected
            if (step.classList.contains("active")) {
                const sound = document.getElementById(`${step.parentNode.dataset.sound}-sound`);
                if (sound) { //Check if sound exists
                    sound.currentTime = 0;
                    sound.play();
                }
            }
            step.classList.add("playing"); // Highlight current step
        });

        setTimeout(() => {
            steps.forEach(step => step.classList.remove("playing")); // Remove highlight after playing
        }, 150);

        currentStep = (currentStep + 1) % totalSteps; // Loop through steps
    }

    // Play/stop button logic & tempo
    playButton.addEventListener("click", function () {
        if (isPlaying) {
            clearInterval(interval);
            playButton.textContent = "Play";
        } else {
            interval = setInterval(playSequence, 300); // 300ms tempo
            playButton.textContent = "Stop";
        }
        isPlaying = !isPlaying;
    });
});