// ============================================
// Portfolio Website - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initProjectGalleries();
    initSmoothScroll();
});

// ============================================
// Particle Background
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration and delay
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';

    container.appendChild(particle);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Typing Effect
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    const texts = ['Giffari Syarizky Hardiawan'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Trigger skill bar animation if it's a skill card
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // Also observe elements that should animate on scroll
    document.querySelectorAll('.timeline-card, .experience-card, .skill-card, .project-card').forEach(element => {
        if (!element.hasAttribute('data-aos')) {
            element.setAttribute('data-aos', 'fade-up');
            observer.observe(element);
        }
    });
}

// ============================================
// Skill Bars Animation
// ============================================
function initSkillBars() {
    // Skill bars will be animated when they come into view
    // The animation is triggered by the scroll observer
}

function animateSkillBar(skillCard) {
    const progressBar = skillCard.querySelector('.skill-progress');
    if (progressBar && !progressBar.classList.contains('animated')) {
        const targetProgress = progressBar.getAttribute('data-progress');
        progressBar.style.width = targetProgress + '%';
        progressBar.classList.add('animated');
    }
}

// ============================================
// Project Image Galleries
// ============================================
function initProjectGalleries() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const images = card.querySelectorAll('.project-img');
        const prevBtn = card.querySelector('.img-nav-btn.prev');
        const nextBtn = card.querySelector('.img-nav-btn.next');
        const dotsContainer = card.querySelector('.image-dots');

        if (images.length <= 1) return;

        let currentIndex = 0;

        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'image-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToImage(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.image-dot');

        function goToImage(index) {
            images[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            currentIndex = index;

            if (currentIndex >= images.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = images.length - 1;

            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToImage(currentIndex - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToImage(currentIndex + 1);
        });

        // Auto-slide (optional)
        // setInterval(() => goToImage(currentIndex + 1), 5000);
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Profile Image Placeholder
// ============================================
window.addEventListener('load', () => {
    const profileImage = document.getElementById('profileImage');

    // Create a placeholder if image fails to load
    profileImage.addEventListener('error', function () {
        this.style.background = 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.alt = '';

        // Add initials placeholder
        const wrapper = this.parentElement;
        if (!wrapper.querySelector('.placeholder-initials')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-initials';
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 4rem;
                font-weight: 800;
                color: white;
                z-index: 3;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            `;
            placeholder.textContent = 'YN';
            wrapper.appendChild(placeholder);
        }
    });

    // Trigger error check for placeholder
    if (!profileImage.complete || profileImage.naturalHeight === 0) {
        profileImage.dispatchEvent(new Event('error'));
    }
});

// ============================================
// Project Image Placeholders
// ============================================
document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('error', function () {
        // Create gradient placeholder based on index
        const colors = [
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)',
            'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)'
        ];

        const index = [...this.parentElement.children].indexOf(this);
        this.style.background = colors[index % colors.length];
        this.alt = '';

        // Add placeholder content
        const wrapper = this.parentElement;
        if (!wrapper.querySelector('.img-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'img-placeholder';
            placeholder.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%);
                z-index: 1;
            `;
            placeholder.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 212, 255, 0.5)" stroke-width="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
            `;
            wrapper.appendChild(placeholder);
        }
    });
});

// ============================================
// Hover Effects Enhancement
// ============================================
document.querySelectorAll('.experience-card, .skill-card, .timeline-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// Parallax Effect for Hero
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'font-size: 14px; color: #8892b0;');
console.log('%c💻 Built with passion using Node.js, HTML, CSS, and JavaScript', 'font-size: 12px; color: #5a6380;');
