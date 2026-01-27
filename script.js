// ===== Typing Animation for Terminal =====
const typedTextSpan = document.querySelector('.typed-text');
const phrases = [
    'build clean, reliable systems',
    'turn messy ideas into working tools',
    'ship features users depend on',
    'love solving hard problems'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing after delay
setTimeout(typeText, 1500);

// ===== Navigation Active State =====
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[index]?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Smooth scroll for nav dots
navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Journey Timeline Animation =====
const journeySteps = document.querySelectorAll('.journey-step');
const trackProgress = document.querySelector('.track-progress');

function updateJourneyProgress() {
    const journeySection = document.querySelector('.journey-section');
    if (!journeySection) return;

    const sectionTop = journeySection.offsetTop;
    const sectionHeight = journeySection.offsetHeight;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate progress through the section
    const startTrigger = sectionTop - windowHeight * 0.5;
    const endTrigger = sectionTop + sectionHeight - windowHeight * 0.5;

    if (scrollPosition < startTrigger) {
        if (trackProgress) trackProgress.style.height = '0%';
        return;
    }

    if (scrollPosition > endTrigger) {
        if (trackProgress) trackProgress.style.height = '100%';
        journeySteps.forEach(step => step.classList.add('visible'));
        return;
    }

    const progress = ((scrollPosition - startTrigger) / (endTrigger - startTrigger)) * 100;
    if (trackProgress) trackProgress.style.height = `${Math.min(progress, 100)}%`;

    // Animate steps as they come into view
    journeySteps.forEach((step, index) => {
        const stepTrigger = startTrigger + ((endTrigger - startTrigger) * (index / journeySteps.length));
        if (scrollPosition >= stepTrigger) {
            step.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', updateJourneyProgress);
updateJourneyProgress();

// ===== Intersection Observer for Cards =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe bento cards with staggered delay
document.querySelectorAll('.bento-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// Observe work cards
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// ===== Glitch Effect on Hover =====
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.classList.add('glitching');
        setTimeout(() => glitchText.classList.remove('glitching'), 300);
    });
}

// Add glitch CSS dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    .glitching {
        animation: glitch 0.3s ease;
    }
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(glitchStyle);

// ===== Smooth Scroll for All Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Card Tilt Effect =====
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Stats Ring Animation =====
const ringFill = document.querySelector('.ring-fill');
if (ringFill) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ringFill.style.strokeDashoffset = 'calc(283 - (283 * 89) / 100)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(ringFill);
}

// ===== Parallax Effect for Hero =====
const bentoHero = document.querySelector('.bento-hero');
if (bentoHero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = bentoHero.offsetHeight;

        if (scrolled < heroHeight) {
            const opacity = 1 - (scrolled / heroHeight) * 0.5;
            bentoHero.style.opacity = opacity;
        }
    });
}

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #166b4d;');
console.log('%cThanks for checking out my code. Let\'s connect!', 'font-size: 14px; color: #4a5d4a;');
console.log('%c📧 keshavnarayan1702@gmail.com', 'font-size: 12px; color: #0d4f3c;');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.bento-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});
