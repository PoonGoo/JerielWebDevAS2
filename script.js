document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
            links.forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector(".hamburger");
    hamburger.onclick = function() {
        const navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
    }

    // Typewriter effect
    const typewriterContainer = document.getElementById("typewriter-container");
    const messages = ["Famous Bands!", "Iconic Hits!", "Guitars!"];
    let messageIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70;
    const erasingSpeed = 50; 
    const newTextDelay = 2000;

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



    //-------------------------GALLERY PAGE START ------------------
 
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let thumbnails = document.querySelectorAll('.thumbnail .item');
    
    let countItem = items.length;
    let itemActive = 0;

    next.onclick = function(){
        itemActive = itemActive + 1;
        if(itemActive >= countItem){
            itemActive = 0;
        }
        showSlider();
    }

    prev.onclick = function(){
        itemActive = itemActive - 1;
        if(itemActive < 0){
            itemActive = countItem - 1;
        }
        showSlider();
    }

    // auto play slider
    let refreshInterval = setInterval(() => {
        next.click();
    }, 5000)

    function showSlider(){
        let itemActiveOld = document.querySelector('.slider .list .item.active');
        let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
        itemActiveOld.classList.remove('active');
        thumbnailActiveOld.classList.remove('active');
    
        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');
    
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000)
    }
    
    // click thumbnail
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        })
    })


     //-------------------------GALLERY PAGE END ------------------


    // Memory Card Game
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const gameBoard = document.getElementById("game-board-js");
    const timerElement = document.getElementById("timer");
    const winScreen = document.getElementById("win-screen");

    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let startTime;
    let timerInterval;

    const images = [
        "images/californiacation.jpg",
        "images/californiacation.jpg",
        "images/californiacation.jpg",
        "images/californiacation.jpg",
        "images/californiacation.jpg",
        "images/image6.jpg"
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCards() {
        const cardImages = shuffle([...images, ...images]);
        cardImages.forEach((image, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="card-back"></div>
                <div class="card-front">
                    <img src="${image}" alt="Card Image">
                </div>
            `;
            card.addEventListener("click", () => flipCard(card));
            gameBoard.appendChild(card);
            cards.push({ element: card, image: image, id: index });
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector("img").src;
        const img2 = card2.querySelector("img").src;

        if (img1 === img2) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === images.length) {
                endGame();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    }

    function startGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0;
        gameBoard.innerHTML = "";
        winScreen.style.display = "none";
        timerElement.textContent = "Time: 0s";

        createCards();
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);

        // Show timer and update button style
        timerElement.style.display = "block";
        startButton.style.margin = "50px auto";
        startButton.style.display = "block";

        // Animation effect for the start button
        startButton.classList.add("animate-button");

        // Remove animation class after 1 second
        setTimeout(() => {
            startButton.classList.remove("animate-button");
        }, 1000);
    }


    function updateTimer() {
        const currentTime = new Date();
        const timeElapsed = Math.floor((currentTime - startTime) / 1000);
        timerElement.textContent = `Time: ${timeElapsed}s`;
    }

    function endGame() {
        clearInterval(timerInterval);
        winScreen.style.display = "block";
        gameBoard.innerHTML = ""; // Remove all cards

        // Style adjustments for win screen
        winText.style.fontSize = "36px";
        winText.style.color = "#fefefe";
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);

    });
