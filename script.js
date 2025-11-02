document.addEventListener('DOMContentLoaded', function() {
    // 3D Cursor Effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-link');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add a slight delay to the follower for a trailing effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Cursor hover effects
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.opacity = '0.5';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.opacity = '1';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const x = e.pageX - button.offsetLeft;
            const y = e.pageY - button.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Typing Effect
    const typed = new Typed('.typing', {
        strings: ['Software Developer', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 1500,
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hamburger') && !e.target.closest('.nav-links')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .contact-item, .form-group');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in-up');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add glow effect to skill items on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            item.style.setProperty('--x', `${x}px`);
            item.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 20;
            const y = (window.innerHeight / 2 - e.pageY) / 20;
            
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
    
    // Add animation to project cards on hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            // Add glow effect
            const glow = card.querySelector('.glow-effect');
            if (glow) {
                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(108, 99, 255, 0.2), transparent 70%)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const glow = card.querySelector('.glow-effect');
            if (glow) {
                glow.style.background = 'transparent';
            }
        });
    });
    
    // Add animation to skill items
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Add animation to form inputs on focus
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Initialize all animations
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
});
