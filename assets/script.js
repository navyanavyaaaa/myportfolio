document.addEventListener('DOMContentLoaded', function () {
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const bgMusic = document.getElementById('bg-music');
    const greeting = document.getElementById('greeting');
    const hour = new Date().getHours();

    // Set greeting based on the time of day
    greeting.textContent = hour >= 3 && hour < 12 ? "Good Morning!" :
                          (hour >= 12 && hour < 18) ? "Good Afternoon! " : "Good Evening! ";

    // Check localStorage for music state
    const musicPlaying = localStorage.getItem('musicPlaying') !== 'false'; // Default to true if not set

    // Update icon based on stored state
    musicIcon.src = musicPlaying ? "images/music.png" : "images/musicoff.png";

    // Try to play if it should be playing
    if (musicPlaying) {
        bgMusic.play().catch(error => {
            // If autoplay fails due to browser policy
            localStorage.setItem('musicPlaying', 'false');
            musicIcon.src = "images/musicoff.png";
        });
    } else {
        bgMusic.pause();
    }

    // Add event listener for music toggle button
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.src = "images/music.png";
            localStorage.setItem('musicPlaying', 'true');
        } else {
            bgMusic.pause();
            musicIcon.src = "images/musicoff.png";
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Set current time from localStorage if available
    const savedTime = localStorage.getItem('musicCurrentTime');
    if (savedTime) {
        bgMusic.currentTime = parseFloat(savedTime);
    }

    // Save current playback time periodically
    setInterval(() => {
        if (!bgMusic.paused) {
            localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
        }
    }, 1000);

    // Handle page unload - save the current state
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('musicCurrentTime', bgMusic.currentTime);
        localStorage.setItem('musicPlaying', !bgMusic.paused);
    });

    // Handle navbar visibility on scroll for projects page
    if (window.location.pathname.includes('projects.html')) {
        const navbar = document.querySelector('nav');
        let lastScrollTop = 0;

        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Always show navbar when scrolling up
            if (scrollTop < lastScrollTop) {
                navbar.style.top = '0';
            } else {
                // Only hide navbar when scrolling down significantly
                if (scrollTop > 150) {
                    navbar.style.top = '-100px';
                }
            }

            lastScrollTop = scrollTop;
        });
    }

    // 🍂 Falling Leaves Animation
    const leafContainer = document.querySelector('.falling-leaves');
    if (leafContainer) {
        const leafImages = ["images/leaf1.png", "images/leaf2.png"];

        for (let i = 0; i < 25; i++) {
            const leaf = document.createElement("img");
            const isLeaf1 = Math.random() > 0.5;

            leaf.src = isLeaf1 ? leafImages[0] : leafImages[1];
            leaf.classList.add("leaf");

            const size = isLeaf1 ? 40 : 60;
            leaf.style.width = `${size}px`;
            leaf.style.height = `${size}px`;

            leaf.style.left = `${Math.random() * 100}vw`;
            leaf.style.animationDuration = `${5 + Math.random() * 10}s`;
            leaf.style.animationDelay = `${Math.random() * 5}s`;

            leafContainer.appendChild(leaf);
        }
    }

    // Message bubble functionality - ADD THIS CODE HERE
    const messageBubble = document.querySelector('.message-bubble');
    
    if (messageBubble) {
        messageBubble.addEventListener('click', function() {
            this.classList.add('hidden');
            localStorage.setItem('messageBubbleHidden', 'true');
        });
        
        if (localStorage.getItem('messageBubbleHidden') === 'true') {
            messageBubble.classList.add('hidden');
        }
    }
});

// Fetch respondent count
window.addEventListener("DOMContentLoaded", () => {
    fetch("https://script.google.com/macros/s/AKfycbyk4kR3GFILxMC9yRe6AytnUqgKJGG3jVRVYq4kSCJj5KH7Eo3z2VxeL4ejMZwDz7Plog/exec") // Replace with your actual URL
        .then(response => response.json())
        .then(data => {
            document.getElementById("respondent-count").textContent = data.count;
        })
        .catch(error => {
            console.error("Error fetching response count:", error);
        });
});