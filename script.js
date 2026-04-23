// ─── INTRO LOADER ──────────────────────────────────────────────────────────
(function () {
    const loader = document.getElementById('intro-loader');
    if (!loader) return;

    const video = document.getElementById('intro-video');
    const logoSnap = document.getElementById('intro-logo-snap');
    const STORAGE_KEY = 'cas_intro_seen';
    const isFirstVisit = !localStorage.getItem(STORAGE_KEY);

    function dismissLoader(fast) {
        const duration = fast ? 0.35 : 1.1;
        const scale = fast ? 1 : 1.25;
        gsap.to(loader, {
            opacity: 0,
            scale: scale,
            duration: duration,
            ease: fast ? 'power1.in' : 'power2.inOut',
            onComplete: () => loader.remove()
        });
    }

    if (isFirstVisit) {
        localStorage.setItem(STORAGE_KEY, '1');
        video.style.display = 'block';
        video.play().catch(() => dismissLoader(false));
        video.addEventListener('ended', () => dismissLoader(false));
        setTimeout(() => { if (loader.parentElement) dismissLoader(false); }, 12000);
    } else {
        logoSnap.style.display = 'flex';
        setTimeout(() => dismissLoader(true), 700);
    }
})();
// ───────────────────────────────────────────────────────────────────────────

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

// Hero Background Zoom + Fade Out
gsap.to(".hero-bg-zoom", {
    scale: 1.3,
    opacity: 0,
    scrollTrigger: {
        trigger: ".hero-pane",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Starfield visibility logic:
// - Pages with a hero background image (index, events): stars fade in as you scroll past the hero
// - Pages without a hero bg image (about): stars are immediately visible
if (document.getElementById("globalStarfield")) {
    if (document.querySelector(".hero-bg-zoom")) {
        // Scroll-triggered fade: hidden until Saturn/GIF scrolls away
        gsap.fromTo("#globalStarfield",
            { opacity: 0 },
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: ".hero-pane",
                    start: "40% top",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    } else {
        // No hero bg — show stars immediately (about page)
        gsap.set("#globalStarfield", { opacity: 1 });
    }
}


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

    // Brand accent colors (20% of stars)
    const accentColors = [
        '144, 78, 250',   // Neon purple  (#904EFA)
        '180, 100, 255',  // Light violet
        '255, 160, 64',   // Orange flame (#FFA040)
    ];

    const numStars = window.innerWidth < 768 ? 100 : 250;
    const stars = Array.from({ length: numStars }).map(() => {
        const isAccent = Math.random() < 0.20; // 20% coloured
        const color = isAccent
            ? accentColors[Math.floor(Math.random() * accentColors.length)]
            : '245, 245, 250'; // near-white
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: isAccent ? Math.random() * 1.5 + 0.8 : Math.random() * 1.2 + 0.3,
            speed: Math.random() * 0.2 + 0.05,
            opacity: Math.random(),
            fadeDir: Math.random() > 0.5 ? 1 : -1,
            color,
            isAccent,
        };
    });

    function drawStars() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
            // Drift upward
            star.y -= star.speed;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }

            // Twinkle
            star.opacity += 0.005 * star.fadeDir;
            if (star.opacity >= 1)   star.fadeDir = -1;
            if (star.opacity <= 0.1) star.fadeDir =  1;

            ctx.globalAlpha = star.opacity;

            if (star.isAccent) {
                // Glow halo for accent stars
                const glow = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.size * 5
                );
                glow.addColorStop(0,   `rgba(${star.color}, ${star.opacity})`);
                glow.addColorStop(0.4, `rgba(${star.color}, ${star.opacity * 0.4})`);
                glow.addColorStop(1,   `rgba(${star.color}, 0)`);
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
                ctx.fill();
            }

            // Core dot
            ctx.fillStyle = `rgba(${star.color}, 1)`;
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
        rotation: 75,
        xPercent: -20,
        // yPercent: 15,
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5
        }
    });
}
