hamburger = document.querySelector(".hamburger");
hamburger.onclick = function() 
{
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
}



// Typewriter Effect
document.addEventListener("DOMContentLoaded", function() {
    const typewriterContainer = document.getElementById("typewriter-container");
    const messages = ["Famous Bands!", "Iconic Hits!", "Guitars!"];
    let messageIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70;
    const erasingSpeed = 50; 
    const newTextDelay = 2000; // Delay between current and next text

    function type() {
        if (charIndex < messages[messageIndex].length) {
            typewriterContainer.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterContainer.textContent = messages[messageIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(type, typingSpeed);
        }
    }
    setTimeout(type, newTextDelay);
});