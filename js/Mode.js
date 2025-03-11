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

    if(light){ //switch dark
        button.textContent = "Dark";
        localStorage.setItem("modeToggle", "light")
    }
    else{ //switch light
        button.textContent = "Light";
        localStorage.setItem("modeToggle", "dark")
    }
}