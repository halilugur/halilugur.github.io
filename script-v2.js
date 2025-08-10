// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileToggle.querySelector('i');

    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation for hero section
const typingText = document.getElementById('typing-text');
const roles = [
    'Senior Java Developer',
    'Spring Boot Expert',
    'Microservices Architect',
    'Full-Stack Engineer',
    'Enterprise Solutions Lead'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[currentRoleIndex];

    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before next role
    }

    setTimeout(typeRole, typeSpeed);
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeRole, 1000);
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-dark');
        navbar.classList.remove('bg-dark/90');
    } else {
        navbar.classList.remove('bg-dark');
        navbar.classList.add('bg-dark/90');
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-accent');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-accent');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.bg-dark, .bg-darker').forEach(el => {
    if (el.tagName !== 'SECTION' && el.tagName !== 'BODY') {
        el.style.opacity = '0';
        observer.observe(el);
    }
});

// Skill bars animation
const skillBars = document.querySelectorAll('.bg-accent');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('bg-accent')) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.transition = 'width 1.5s ease-out';
                entry.target.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    if (bar.parentElement.classList.contains('bg-gray-700')) {
        skillObserver.observe(bar);
    }
});

// Matrix rain effect for background
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|\\:";\'<>?,./';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize matrix rain effect
createMatrixRain();

// Glitch effect for accent elements
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.text-accent');

    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.textShadow = `
                2px 0 #ff0000,
                -2px 0 #00ffff,
                0 2px #ffff00,
                0 -2px #ff00ff
            `;
            element.style.animation = 'glitch 0.3s ease-in-out';
        });

        element.addEventListener('mouseleave', () => {
            element.style.textShadow = 'none';
            element.style.animation = 'none';
        });
    });
}

// Add glitch animation CSS
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// Initialize glitch effects
addGlitchEffect();

// Terminal cursor blinking
setInterval(() => {
    const cursors = document.querySelectorAll('.terminal-cursor');
    cursors.forEach(cursor => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    });
}, 500);

// Particle system for hero section
function createParticleSystem() {
    const hero = document.getElementById('home');
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;

    hero.appendChild(particleContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff88;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
        50% { opacity: 0.8; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particle system
createParticleSystem();

// Console welcome message
console.log(`
%c
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    Welcome to Halil UGUR's Portfolio Terminal               ║
║                                                              ║
║    > Senior Java Software Engineer                          ║
║    > 7+ Years of Enterprise Development                     ║
║    > Spring Boot & Microservices Expert                     ║
║                                                              ║
║    Type 'help' for available commands                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`, 'color: #00ff88; font-family: monospace; font-size: 12px;');

// Console commands
const commands = {
    help: () => console.log(`
Available commands:
- about: Learn more about me
- skills: View technical skills
- projects: See featured projects
- contact: Get contact information
- clear: Clear console
    `),
    about: () => console.log('Senior Java Software Engineer with 7+ years of experience in enterprise applications'),
    skills: () => console.log('Java, Spring Boot, Microservices, PostgreSQL, React, Kafka, Docker, AWS'),
    projects: () => console.log('Cargo Management Platform, IATA One Record, E-commerce Platform, Loyalty System'),
    contact: () => console.log('Email: mr.halilugur@gmail.com | LinkedIn: linkedin.com/in/halilugur'),
    clear: () => console.clear()
};

// Override console.log to handle commands
const originalLog = console.log;
console.log = function (...args) {
    const input = args[0];
    if (typeof input === 'string' && commands[input.toLowerCase()]) {
        commands[input.toLowerCase()]();
    } else {
        originalLog.apply(console, args);
    }
};
