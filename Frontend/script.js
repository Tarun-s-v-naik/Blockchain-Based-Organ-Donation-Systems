document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const nav = document.querySelector("nav");

    mobileMenuBtn.addEventListener("click", function () {
        nav.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (nav.classList.contains("active")) {
                nav.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust header height
                    behavior: "smooth",
                });
            }
        });
    });
    document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_ftwp6np", "template_e5913cj", this)
      .then(function(response) {
        alert("✅ Message sent successfully!");
        document.getElementById("contactForm").reset();
      }, function(error) {
        alert("❌ Failed to send message. Try again.");
        console.error("EmailJS Error:", error);
      });
  });
    // Sticky header on scroll
    const header = document.querySelector("header");
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            header.classList.add("sticky");
            if (scrollTop > lastScrollTop) {
                header.classList.add("hide");
            } else {
                header.classList.remove("hide");
            }
        } else {
            header.classList.remove("sticky", "hide");
        }
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll(".feature-card, .team-card, .about-content, .stats-container");
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    animateElements.forEach((element) => observer.observe(element));
});
