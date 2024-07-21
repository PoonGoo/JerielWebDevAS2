document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll(".nav-link");
    var sections = document.querySelectorAll(".section");

    function closeNavBar() {
        var navBar = document.querySelector(".nav-bar");
        navBar.classList.remove("active");
    }

    // click event to each navigation link
    links.forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            var targetId = this.getAttribute("href").substring(1);
            sections.forEach(function(section) {
                if (section.id === targetId) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
            links.forEach(function(link) { link.classList.remove("active"); });
            this.classList.add("active");

            closeNavBar();
        });
    });

    // Hamburger menu toggle
    var hamburger = document.querySelector(".hamburger");
    hamburger.onclick = function() {
        var navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
    };

    // Typewriter effect
    var typewriterContainer = document.getElementById("typewriter-container");
    var messages = ["Famous Bands!", "Iconic Hits!", "Guitars!"];
    var messageIndex = 0;
    var charIndex = 0;
    var typingSpeed = 70;
    var erasingSpeed = 50;
    var newTextDelay = 2000;

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

    var items = document.querySelectorAll('.slider .list .item');
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var thumbnails = document.querySelectorAll('.thumbnail .item');

    var countItem = items.length;
    var itemActive = 0;

    next.onclick = function() {
        itemActive = itemActive + 1;
        if (itemActive >= countItem) {
            itemActive = 0;
        }
        showSlider();
    };

    prev.onclick = function() {
        itemActive = itemActive - 1;
        if (itemActive < 0) {
            itemActive = countItem - 1;
        }
        showSlider();
    };  

    // auto play slider every 5 secs
    var refreshInterval = setInterval(function() {
        next.click();
    }, 5000);

    function showSlider() {
        var itemActiveOld = document.querySelector('.slider .list .item.active');
        var thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
        itemActiveOld.classList.remove('active');
        thumbnailActiveOld.classList.remove('active');

        items[itemActive].classList.add('active');
        thumbnails[itemActive].classList.add('active');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(function() {
            next.click();
        }, 5000);
    }

    // click thumbnail
    thumbnails.forEach(function(thumbnail, index) {
        thumbnail.addEventListener('click', function() {
            itemActive = index;
            showSlider();
        });
    });

    // For guitar grid content clickable
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var caption = document.getElementById('caption');
    var closeBtn = document.querySelector('.close');

    var imageGuitarGrid = document.querySelectorAll('.guitar-grid img');

    imageGuitarGrid.forEach(function(img) {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            caption.textContent = this.alt;
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    //-------------------------GALLERY PAGE END ------------------

    // Music player
    var playPause = document.querySelector("#play-stop");
    var backward = document.querySelector("#backward");
    var forward = document.querySelector("#forward");

    // record player animation
    var circleBig = document.querySelector("#circle-bg");
    var circleSm = document.querySelector("#circle-sm");

    // playing song
    var songName = document.querySelector("#song-name");
    var audio = document.querySelector("#audio");
    var coverArt = document.querySelector("#cover");
    var musicbox = document.querySelector("#musicbox");

    // control button images
    var playImg = "images/play.svg";
    var pauseImg = "images/pause.svg";

    // default controls
    playPause.src = playImg;
    var isPlaying = true;

    var songList = [
        {
            name: "Under The Bridge (Red Hot Chilli Peppers)",
            source: "audios/under-the-bridge.mp3",
            cover: "images/suck-my-kiss.jpg"
        },
        {
            name: "Everlong (Foo Fighters)",
            source: "audios/everlong.mp3",
            cover: "images/everlong.jpg"
        },
        {
            name: "High and Dry (Radiohead)",
            source: "audios/high-and-dry.mp3",
            cover: "images/the-bends.jfif"
        },
        {
            name: "Don't Look Back In Anger",
            source: "audios/dont-look.mp3",
            cover: "images/whats-the-story.jfif"
        },
        {
            name: "Basket Case",
            source: "audios/basket-case.mp3",
            cover: "images/basket-case.jpg"
        }
    ];

    function createEle(ele) {
        return document.createElement(ele);
    }

    function append(parent, child) {
        return parent.appendChild(child);
    }

    // creating track list
    var ul = createEle('ul');

    function createPlayList() {
        songList.forEach(function(song) {
            var h3 = createEle('h3');
            var li = createEle('li');

            li.classList.add("track-item");
            h3.innerText = song.name;
            append(li, h3);
            append(ul, li);
        });
        append(musicbox, ul);
    }

    var songIndex = 0;
    loadMusic(songList[songIndex]);

     //Music details
    function loadMusic() {
        coverArt.src = songList[songIndex].cover;
        songName.innerText = songList[songIndex].name;
        audio.src = songList[songIndex].source;
    }

    function playSong() {
        playPause.src = pauseImg;
        circleBig.classList.add("animate");
        circleSm.classList.add("animate");

        audio.play();
    } 

    function pauseSong() {
        playPause.src = playImg;
        circleBig.classList.remove("animate");
        circleSm.classList.remove("animate");

        audio.pause();
    } 

    function nextPlay() {
        songIndex++;
        if (songIndex > songList.length - 1) {
            songIndex = 0;
        }
        loadMusic(songList[songIndex]);
        playSong();
    }

    function backPlay() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songList.length - 1;
        }
        loadMusic(songList[songIndex]);
        playSong();
    }

    function playHandler() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    var playPauseButton = document.querySelector("#play-stop");
    playPauseButton.addEventListener("click", playHandler);

    playPause.addEventListener("click", playHandler);
    backward.addEventListener("click", backPlay);
    forward.addEventListener("click", nextPlay);
    createPlayList();

    // Memory Card Game
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const gameBoard = document.getElementById("game-board-js");
    const timerElement = document.getElementById("timer");
    const winScreen = document.getElementById("win-screen");
    const winText = document.getElementById("win-text"); 

    var cards = [];
    var flippedCards = [];
    var matchedPairs = 0;
    var startTime;
    var timerInterval;

    const images = [
        "images/californiacation.jpg",
        "images/load-game.jpg",
        "images/sacrifice-game.jpg",
        "images/live-game.jpg",
        "images/black-game.jpg",
        "images/use-game.jpg"
    ];

    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function createCards() {
        var cardImages = shuffle(images.concat(images));
        cardImages.forEach(function(image, index) {
            var card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = '<div class="card-back"></div>' +
                '<div class="card-front">' +
                '    <img src="' + image + '" alt="Card Image">' +
                '</div>';
            card.addEventListener("click", function() {
                flipCard(card);
            });
            gameBoard.appendChild(card);
            cards.push({ element: card, image: image, id: index });
        });
    }

    const flipSound = document.getElementById("flip-sound");

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            flippedCards.push(card);
            flipSound.play();
            if (flippedCards.length === 2) {
                checkForMatch();
            }
        }
    }

    //Check for a match between flipped cards
    function checkForMatch() {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
        var img1 = card1.querySelector("img").src;
        var img2 = card2.querySelector("img").src;

        if (img1 === img2) {
            matchedPairs++;
            flippedCards = [];

            if (matchedPairs === images.length) {
                endGame();
            }
        } 

        // If no match, flip the cards back after a delay
        else {
            setTimeout(function() { 
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                flippedCards = [];
            }, 1000);
        }
    }

    function startGame() {
        cards = [];
        flippedCards = [];
        matchedPairs = 0; // Reset matched pairs counter
        gameBoard.innerHTML = ""; // Clear game board
        winScreen.style.display = "none"; // Hide  win screen
        timerElement.textContent = "Time: 0s"; // Reset timer 

        createCards();
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);

        // Show timer and update button style
        timerElement.style.display = "block";
        startButton.style.margin = "50px auto";
        startButton.style.display = "block";

        startButton.classList.add("animate-button");

        setTimeout(function() {
            startButton.classList.remove("animate-button");
        }, 1000);
    }

    function updateTimer() {
        var currentTime = new Date();
        var timeElapsed = Math.floor((currentTime - startTime) / 1000);
        timerElement.textContent = "Time: " + timeElapsed + "s";
    }

    function endGame() {
        clearInterval(timerInterval); // Stop the timer
        winScreen.style.display = "block"; // Show the win screen
        gameBoard.innerHTML = ""; // Removes all cards

        winText.style.fontSize = "36px"; 
        winText.style.color = "#fefefe"; 
    }

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);
});
