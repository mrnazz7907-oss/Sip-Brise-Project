
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. LENIS - SMOOTH SCROLL
    // =====================================

    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true
    });

    // =====================================
    // 2. GSAP - SCROLL TRIGGER
    // =====================================

    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);


    // =====================================
    // 3. ANIMASI INDEX / HALAMAN UTAMA
    // =====================================

    const heroTitles = gsap.utils.toArray(
        ".title-coffe, .title-mood, .title-brise"
    );

    if (heroTitles.length) {
        gsap.from(heroTitles, {
            y: 45,
            opacity: 0,
            duration: 1,
            stagger: 0.25,
            ease: "power3.out"
        });
    }

    gsap.from(".get-started-btn", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        delay: 0.9,
        ease: "power2.out"
    });


    // =====================================
    // 4. ANIMASI HOME / HERO SLIDER
    // =====================================

    const firstSlide = document.querySelector(
        "#hero-slider .slide-item:first-child"
    );

    if (firstSlide) {
        gsap.from(firstSlide.children, {
            y: 35,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }


    // =====================================
    // 5. ANIMASI KONTEN SAAT SCROLL
    // =====================================

    const revealElements = document.querySelectorAll(
        "main > section:not(#hero-slider), " +
        ".review-header, .review-form-container"
    );

    revealElements.forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out"
        });
    });


    // =====================================
    // 6. ANIMASI KARTU PRODUK
    // =====================================

    gsap.utils.toArray(".product-card").forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        });
    });


    // =====================================
    // 7. ANIMASI FOOTER
    // =====================================

    const footer = document.querySelector(".site-footer");

    if (footer) {
        gsap.from(footer, {
            scrollTrigger: {
                trigger: footer,
                start: "top 95%",
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    }

});
