/* ================== PORTFOLIO JAVASCRIPT - script.js =====================
Created for: My portfolio Website

This file contains ALL interactive functionality in the portfolio.
It handles:
- Page loading animation
- Mobile menu
- Smooth scrolling
- Scroll animations
- Contact form (with EmailJS email sending)
=== */

// ================== PAGE LOADING =====================
// Removes the loading screen once the page has been fully loaded

// Wait for page to load (including images)
window.addEventListener('load', () => {
    // Wait 500ms (half a second) before hiding the loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.classList.add('hide');
    }, 500);
});

// ================== DARK MODE FUNCTIONALITY =====================
// This section handles switching between light and dark themes

// Wait for page to fully load before running code
document.addEventListener('DOMContentLoaded', function () {

    // Get the dark mode button element
    const DarkModeToggle = document.getElementById('darkModeToggle');

    // Check if user has a saved preference in browser
    // localStorage.getItem() retrieves data
    const currentTheme = localStorage.getItem('theme');

    // If user previously chose dark mode, apply immediately
    if (currentTheme == 'dark') {
        document.body.classList.add('dark-mode');
    }

    DarkModeToggle.addEventListener('click', function() {
        // Toggle the 'dark-mode' class on the body element
        document.body.classList.toggle('dark-mode');

        // Save the user's choice so it persists across page visits
        // Check if dark mode is currently active
        if (document.body.classList.contains('dark-mode')) {
            // Save 'dark' preference
            localStorage.setItem('theme', 'dark');
        } else {
            // Save 'light' preference
            localStorage.setItem('theme', 'light');
        }
    });
});

// ================== MOBILE MENU TOGGLE =====================
// Makes the hamburger menu work on mobile device

// Get hamburger button element
const menuToggle = document.getElementById('menuToggle');
//Get navigation link container
const navLinks = document.getElementById('navLinks');

// When hamburger is clicked, open/close the menu
menuToggle.addEventListener('click', () => {
    //Toggle 'active' class on hamburger (transforms it to X shape)
    menuToggle.classList.toggle('active');
    //Toggle 'active' class on menu (slides it in/out)
    navLinks.classList.toggle('active');
});

// ================== CLOSE MOBILE MENU WHEN LINK CLICKED =====================
// Automatically closes mobile menu when user clicks a navigation link

// Select all navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    // Add click listener to each link
    link.addEventListener('click', () => {
        // Remove 'active' class from hamburger (returns to hamburger shape)
        menuToggle.classList.remove('active');
        // Remove 'active' class from menu (slides out)
        navLinks.classList.remove('active');
    });
});

// ================== SMOOTH SCROLLING =====================
// Makes clicking navigation links scroll smoothly to sections instead of jumping */

// Select all links that start with # (internal page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click listener to each link
    anchor.addEventListener('click', function (e) {
        // Prevent default jump behavior
        e.preventDefault();

        // Get the target section (the href value like "#about")
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // If target section exists, scroll to it smoothly
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling instead of instant
                block: 'start' // Align to top of section
            });
        }         
    });
});

// ================== NAVBAR SCROLL EFFECT =====================
// Adds shadow to navbar when user scrolls down */

window.addEventListener('scroll', () => {
    // Get navbar element
    const navbar = document.getElementById('navbar');

    // Check if user has scrolled more than 50 pixels
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================== SCROLL PROGRESS BAR =========================== */
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollTop = window.pageYOffset || documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage  = (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width = scrollPercentage + '%';
});

// ================== SCROLL ANIMATION SCROLL EFFECT =====================
// Makes sections fade in and slide up when they appear on screen

const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view
};

// Create intersection Observer instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// ================== OBSERVE DIFFERENT ELEMENTS =====================
// Tell the observer to watch these elements for animation

// Watch all elements with 'fade-in' class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Watch all section headers
document.querySelectorAll('.section-header').forEach(el => observer.observe(el));

// Watch all project cards
document.querySelectorAll('.project-card').forEach(el => observer.observe(el));

// Watch skill items with staggered delay for cool cascade effect
document.querySelectorAll('.skill-item').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
});

// Watch about text sections
document.querySelectorAll('.about-text').forEach(el => observer.observe(el));

// Watch about stats section
document.querySelectorAll('.about-stats').forEach(el => observer.observe(el));

// ================== ACTIVE NAVIGATION HIGHLIGHT =====================
// Highlights the current section in the navigation menu as you scroll

window.addEventListener('scroll', () => {
    let current = "";

    const sections = document.querySelectorAll('section');

    // Loop through each section
    sections.forEach(section => {
        // Get section's position from top of page
        const sectionTop = section.offsetTop;

        // Check if you've scrolled past this section
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {

        // Remove 'active' class from all links
        link.classList.remove('active');

        // Get the link's href (like "#about")
        const linkHref = link.getAttribute('href').slice(1); // Remove the # symbol

        // If this link matches the current section, add 'active' class
        if (linkHref === current) {
            link.classList.add('active');
        }
    });
});

// ================== CONTACT FORM WITH EMAILJS =====================
// Handles contact form submission and sends email using EmailJS service

// EMAILJS CREDENTIALS
const EMAILJS_PUBLIC_KEY = "dvTwS8mDyP75f3at1";
const EMAILJS_SERVICE_ID = "service_zk0yz9a";
const EMAILJS_TEMPLATE_ID = "template_m39jcyo";

if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Get contact form element
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();

        // Get submit button
        const submitButton = contactForm.querySelector('.form-submit');

        if (!submitButton) {
            console.error('Submit button not found!');
            return;
        }

        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Check if EmailJS is loaded
        if (typeof emailjs !== 'undefined') {
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                alert('✅ Thank you for your message!\n\nI will get back to you as soon as possible.');

                // Reset the form
                contactForm.reset();

                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
        })
            .catch(function(error) {
                console.error('FAILED...', error);

                alert('⚠️ Email service is currently unavailable.\n\nPlease try again or email me directly at: nowellintia.work@gmail.com');

                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        } else {
            alert('⚠️ Email service is currently unavailable.\n\nPlease try again or email me directly at: nowellintia.work@gmail.com');

            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// ================== UTILITY FUNCTIONS =====================
// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smoothly scroll to top of page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get the current scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// ================== ADDITIONAL FEATURES =====================
// Adds a back to top button that appears when scrolling down
// Create button element
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-gradient);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 998;
`;
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', scrollToTop);