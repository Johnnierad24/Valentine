// Floating Hearts Animation
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.innerHTML = '💕';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 500);

// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Music Player
const musicToggle = document.getElementById('musicToggle');
let audio = null;

musicToggle.addEventListener('click', function() {
    if (!audio) {
        // Note: You'll need to add the actual audio file
        // For now, this creates the audio element ready for the file
        audio = new Audio('music/song.mp3');
        audio.loop = true;
    }
    
    if (audio.paused) {
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
            alert('Please add your song file to the music folder as song.mp3');
        });
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-text').textContent = 'Pause Song';
    } else {
        audio.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-text').textContent = 'Play Our Song';
    }
});

// Proposal Buttons
let noClickCount = 0;
const noMessages = [
    "Are you sure? 🥺",
    "Think about it again... 💭",
    "Please? Just say yes! 🙏",
    "I know you want to say yes 😊",
    "Come on, Luna Bella! 💕",
    "Last chance before I cry 😢",
    "You're breaking my heart! 💔"
];

function handleYes() {
    const responseMsg = document.getElementById('responseMessage');
    responseMsg.innerHTML = `
        <div style="animation: fadeIn 0.5s ease;">
            <h3 style="color: var(--primary-color); font-size: 2rem; margin-bottom: 1rem;">
                🎉 Yay! You made me the happiest! 🎉
            </h3>
            <p style="font-size: 1.2rem; color: var(--soft-pink);">
                I love you so much, Luna Bella! 💕
            </p>
        </div>
    `;
    
    // Create celebration effect
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // Hide buttons
    document.querySelector('.proposal-buttons').style.display = 'none';
}

function handleNo() {
    const btnNo = document.getElementById('btnNo');
    const responseMsg = document.getElementById('responseMessage');
    
    if (noClickCount < noMessages.length) {
        responseMsg.innerHTML = `<p style="color: var(--secondary-color); font-size: 1.3rem;">${noMessages[noClickCount]}</p>`;
        noClickCount++;
        
        // Make the No button harder to click
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    } else {
        // After all messages, just trigger yes
        handleYes();
    }
}

// Countdown Timer
function updateCountdown() {
    const valentinesDay = new Date('2026-02-14T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = valentinesDay - now;
    
    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.querySelector('.countdown-message').textContent = "Happy Valentine's Day, Luna Bella! 💖";
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Gallery Lightbox
const images = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = images[index];
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = images[currentImageIndex];
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Smooth lightbox image transition
document.getElementById('lightboxImage').style.transition = 'opacity 0.3s ease';

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Special Valentine's Day Effect
function checkValentinesDay() {
    const now = new Date();
    const valentinesDay = new Date('2026-02-14');
    
    if (now.toDateString() === valentinesDay.toDateString()) {
        // Extra special effects on Valentine's Day
        document.body.style.background = 'linear-gradient(135deg, #ff1744 0%, #f50057 100%)';
        
        // More hearts!
        setInterval(createHeart, 200);
        
        // Show special message
        const specialMsg = document.createElement('div');
        specialMsg.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0,0,0,0.9); padding: 3rem; border-radius: 20px; 
                        z-index: 3000; text-align: center; max-width: 500px;">
                <h2 style="font-family: 'Great Vibes', cursive; font-size: 3rem; color: #ff1744; margin-bottom: 1rem;">
                    Happy Valentine's Day!
                </h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">
                    Luna Bella, you are my everything! Today and always! 💕
                </p>
                <button onclick="this.parentElement.remove()" style="padding: 1rem 2rem; background: #ff1744; 
                        border: none; border-radius: 50px; color: white; font-size: 1rem; cursor: pointer;">
                    Love You Too! 💖
                </button>
            </div>
        `;
        
        setTimeout(() => {
            document.body.appendChild(specialMsg);
        }, 2000);
    }
}

checkValentinesDay();

console.log('%c💕 Made with Love by Bubba for Luna Bella 💕', 'font-size: 20px; color: #ff1744; font-weight: bold;');
