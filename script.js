/* ============================================
   ELITE FITNESS - JAVASCRIPT
   Vanilla JS - No frameworks
   ============================================ */

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when CTA button in mobile menu is clicked
const mobileCTABtn = mobileMenu.querySelector('.cta-btn');
if (mobileCTABtn) {
    mobileCTABtn.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
}

// ============================================
// 2. SMOOTH SCROLL & NAVIGATION
// ============================================

const navLinks = document.querySelectorAll('.nav-link, .cta-btn, #ctaButton');
const allCTAButtons = document.querySelectorAll('.cta-btn, #ctaButton');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// All CTA buttons scroll to contact section
allCTAButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// 3. STATS COUNTER ANIMATION
// ============================================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const start = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.floor(progress * target);
            
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                stat.textContent = target;
            }
        };
        
        animate();
    });
    
    statsAnimated = true;
}

// Trigger stats animation when section is in view
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target === statsSection) {
            animateStats();
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}

// ============================================
// 4. FADE-IN ANIMATIONS ON SCROLL
// ============================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.stat-card, .plan-card, .trainer-card, .contact-item, .form-group'
    );

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        scrollObserver.observe(element);
    });
};

// Run on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// 5. WHATSAPP INTEGRATION
// ============================================

const whatsappBtn = document.getElementById('whatsappBtn');

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        // Replace with your actual phone number (include country code, no spaces/dashes)
        const phoneNumber = '1234567890'; // Example: '12125551234' for +1 (212) 555-1234
        
        const message = encodeURIComponent(
            'Hi! I am interested in joining Elite Fitness. Can you tell me more about your membership plans?'
        );
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    });
}

// ============================================
// 6. CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        alert(`Thank you ${name}! We will contact you soon at ${email}`);
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send data to a backend service
        // You can uncomment and modify this to send data to your server
        /*
        const formData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // Example: Send to a backend endpoint
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Thank you! We will contact you soon.');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
        */
    });
}

// ============================================
// 7. HEADER SCROLL EFFECT
// ============================================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 10) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// 8. PLAN CARD HOVER EFFECTS
// ============================================

const planCards = document.querySelectorAll('.plan-card');

planCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Slightly lift the card
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-8px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// ============================================
// 9. TRAINER CARD ANIMATIONS
// ============================================

const trainerCards = document.querySelectorAll('.trainer-card');

trainerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// 10. BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles if not already in CSS
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.textContent = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }
                
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: rippleAnimation 0.6s ease-out;
                    pointer-events: none;
                }
                
                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// 11. LAZY LOAD IMAGES
// ============================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('[style*="background-image"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Image is already loaded via CSS, just mark as loaded
                entry.target.style.opacity = '1';
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        imageObserver.observe(img);
    });
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ============================================
// 12. ACTIVE NAVIGATION LINK
// ============================================

const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });
    
    sections.forEach(section => scrollObserver.observe(section));
};

document.addEventListener('DOMContentLoaded', updateActiveNav);

// ============================================
// 13. KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// ============================================
// 14. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for frequent events
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ============================================
// 15. PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeInUp 0.6s ease-out';
});

// Set initial opacity
document.body.style.opacity = '0';

// ============================================
// 16. CONSOLE MESSAGE
// ============================================

console.log('%c🏋️ Elite Fitness Landing Page', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #b0b9c8;');
console.log('%cNo frameworks. Pure performance.', 'font-size: 12px; color: #8b1538;');
