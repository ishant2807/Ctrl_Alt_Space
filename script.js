gsap.registerPlugin(ScrollTrigger);

// Hero Fade on scroll down
gsap.to(".hero-content", {
    y: -50,
    opacity: 0,
    scrollTrigger: {
        trigger: ".hero-pane",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Hero Background Zoom
gsap.to(".hero-bg-zoom", {
    scale: 1.3,
    scrollTrigger: {
        trigger: ".hero-pane",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Smooth Cascading Animation for Panes
gsap.utils.toArray(".pane:not(.hero-pane)").forEach(pane => {
    const elements = pane.querySelectorAll(".project-number, .project-title, .cta-headline, .project-meta, .narrative-copy, .single-img-container, .contact-details");
    
    gsap.fromTo(elements, 
        { 
            y: 60, 
            opacity: 0 
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: pane,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Custom Cursor Logic
const cursorDot = document.querySelector(".cursor-dot");
const cursorHalo = document.querySelector(".cursor-halo");

if (cursorDot && cursorHalo) {
    window.addEventListener("mousemove", (e) => {
        // Dot follows instantly
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        
        // Halo follows with slight delay using GSAP
        gsap.to(cursorHalo, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
    });

    // Add hover state to interactive elements
    const interactables = document.querySelectorAll("a, button, input, textarea, .glass-card");
    interactables.forEach(el => {
        el.addEventListener("mouseenter", () => cursorHalo.classList.add("hovering"));
        el.addEventListener("mouseleave", () => cursorHalo.classList.remove("hovering"));
    });
}

// Global Starfield Canvas Logic
const starCanvas = document.getElementById("globalStarfield");
if (starCanvas) {
    const ctx = starCanvas.getContext("2d");
    let width = starCanvas.width = window.innerWidth;
    let height = starCanvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        width = starCanvas.width = window.innerWidth;
        height = starCanvas.height = window.innerHeight;
    });

    const numStars = window.innerWidth < 768 ? 100 : 250;
    const stars = Array.from({ length: numStars }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random(),
        fadeDir: Math.random() > 0.5 ? 1 : -1
    }));

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#F5F5FA";

        stars.forEach(star => {
            // Move star upwards slowly
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }

            // Twinkle effect
            star.opacity += 0.005 * star.fadeDir;
            if (star.opacity >= 1) star.fadeDir = -1;
            if (star.opacity <= 0.1) star.fadeDir = 1;

            ctx.globalAlpha = star.opacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(drawStars);
    }
    drawStars();
}

// Cinematic Planet Scroll Animation (About Us page)
if (document.querySelector(".cinematic-planet")) {
    gsap.to(".cinematic-planet", {
        scale: 1.8,
        rotation: 45,
        y: 200,
        x: -100,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });
}
