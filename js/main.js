// Main JavaScript for Lumen Alta Template
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider functionality
    initSlider();
    
    // Handle cookie consent
    initCookieConsent();
    
    // Handle menu toggle
    initMenuToggle();
    
    // Add scroll animations
    initScrollAnimations();
});

// Slider functionality
function initSlider() {
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dot.classList.add('active');
        });
    });
    
    // Auto-rotate slides every 5 seconds
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }, 5000);
}

// Cookie consent functionality
function initCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const allowButton = document.querySelector('.btn-allow');
    const denyButton = document.querySelector('.btn-deny');
    
    // Check if user has already made a choice
    if (localStorage.getItem('cookieConsent')) {
        cookieConsent.style.display = 'none';
    }
    
    // Handle allow button click
    allowButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'allowed');
        cookieConsent.style.display = 'none';
    });
    
    // Handle deny button click
    denyButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'denied');
        cookieConsent.style.display = 'none';
    });
}

// Menu toggle functionality
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    
    menuToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        // Additional menu functionality would go here
        // For a full implementation, you would need to create a mobile menu
    });
}

// Scroll animations
function initScrollAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.card, .insight-card, .solution-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Digital playground text scrolling effect
    const digitalPlayground = document.querySelector('.digital-playground p');
    if (digitalPlayground) {
        const text = digitalPlayground.textContent;
        digitalPlayground.innerHTML = text + ' ' + text;
        
        let position = 0;
        setInterval(() => {
            position--;
            if (position <= -digitalPlayground.offsetWidth / 2) {
                position = 0;
            }
            digitalPlayground.style.transform = `translateX(${position}px)`;
        }, 30);
    }
}

// Form validation
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    let valid = true;
    const requiredFields = this.querySelectorAll('input[required], select[required], textarea[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    if (valid) {
        // In a real implementation, you would send the form data to a server
        alert('Form submitted successfully! In a real implementation, this would be sent to your server.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});
