<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
=======

document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-card");
>>>>>>> 59af871 (updated Changes)
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
<<<<<<< HEAD
=======
});
document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-card");
>>>>>>> 59af871 (updated Changes)
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending your message...', 'info');
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just simulate a successful submission
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Subscribing...', 'info');
            
            // Simulate subscription process
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
            }, 1500);
        });
    }
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hide');
            } else {
                // Scrolling up
                header.classList.remove('hide');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature-card, .team-card, .about-content, .stats-container');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set notification content and style
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
                notification.style.opacity = '1';
            }, 500);
        }, 3000);
    }
    
    // Initialize any blockchain connection if available
    function initBlockchainConnection() {
        // This would be where you connect to a blockchain network
        // For example, using Web3.js to connect to Ethereum
        console.log('Blockchain connection initialized');
        
        // Check if Web3 is available
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            
            // Add connect wallet functionality to relevant buttons
            const donorRegisterBtn = document.querySelector('.primary-btn');
            if (donorRegisterBtn) {
                donorRegisterBtn.addEventListener('click', async function(e) {
                    if (e.target.textContent.includes('Register as Donor')) {
                        e.preventDefault();
                        try {
                            // Request account access
                            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                            const account = accounts[0];
                            showNotification(`Connected with account: ${account.substring(0, 6)}...${account.substring(38)}`, 'success');
                            
                            // Here you would redirect to a registration page or open a modal
                            // For demo purposes, we'll just log the connection
                            console.log('Connected account:', account);
                        } catch (error) {
                            showNotification('Failed to connect wallet: ' + error.message, 'error');
                        }
                    }
                });
            }
        }
    }
    
    // Call blockchain initialization
    initBlockchainConnection();
});
