/* ============================================
   سطحة النسيم وشرق الرياض - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ==================== HERO SLIDER ====================
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 6000);

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            if (counter.dataset.animated) return;
            
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.dataset.animated = 'true';
                }
            };
            
            updateCounter();
        });
    }

    // Run counter when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }

    // ==================== AOS (Animate on Scroll) ====================
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const aosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                aosObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    aosElements.forEach(el => aosObserver.observe(el));

    // ==================== LIGHTBOX ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentLightboxIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);
        
        item.addEventListener('click', () => {
            currentLightboxIndex = index;
            openLightbox(img.src);
        });
    });

    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentLightboxIndex];
    }

    function showNextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentLightboxIndex];
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showPrevImage();
        if (e.key === 'ArrowLeft') showNextImage();
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== PARALLAX on CTA ====================
    const ctaBg = document.querySelector('.cta-bg-image');
    if (ctaBg) {
        window.addEventListener('scroll', () => {
            const rect = ctaBg.parentElement.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const sectionCenter = rect.top + rect.height / 2;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.15; // Reduced speed for better control
                const yPos = (viewportCenter - sectionCenter) * speed;
                // Limit movement to bleed area (100px)
                const limitedYPos = Math.max(-80, Math.min(80, yPos));
                ctaBg.style.transform = `translateY(${limitedYPos}px)`;
            }
        });
    }

    // ==================== AREAS MAP (Leaflet) ====================
    const mapElement = document.getElementById('areasMap');
    if (mapElement && typeof L !== 'undefined') {
        // Center the map around East Riyadh
        const map = L.map('areasMap').setView([24.75, 46.80], 11);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);

        // Fix for mobile rendering issues - multiple attempts
        setTimeout(() => { map.invalidateSize(); }, 100);
        setTimeout(() => { map.invalidateSize(); }, 500);
        setTimeout(() => { map.invalidateSize(); }, 1000);
        setTimeout(() => { map.invalidateSize(); }, 2000);

        window.addEventListener('resize', () => {
            map.invalidateSize();
        });

        // Ensure map renders properly when section comes into view
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => map.invalidateSize(), 100);
                    setTimeout(() => map.invalidateSize(), 400);
                }
            });
        }, { threshold: 0.05 });
        mapObserver.observe(mapElement);

        // Define locations to place markers
        const locations = [
            { name: "حي النسيم", coords: [24.7360, 46.8184] },
            { name: "حي السلي", coords: [24.6596, 46.8329] },
            { name: "حي الجزيرة", coords: [24.6833, 46.7909] },
            { name: "حي الفيحاء", coords: [24.6958, 46.8130] },
            { name: "حي الربوة", coords: [24.7132, 46.7562] },
            { name: "حي الروابي", coords: [24.6983, 46.7831] },
            { name: "حي الريان", coords: [24.7197, 46.7915] },
            { name: "حي الروضة", coords: [24.7360, 46.7725] },
            { name: "حي الخليج", coords: [24.7770, 46.8040] },
            { name: "حي القادسية", coords: [24.8239, 46.8180] },
            { name: "حي الندوة", coords: [24.8327, 46.8643] },
            { name: "حي الجنادرية", coords: [24.8551, 46.8524] }
        ];

        // Custom Leaflet icon styling
        const LeafIcon = L.Icon.extend({
            options: {
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        });
        const defaultIcon = new LeafIcon();

        const locationListEl = document.getElementById('locationList');

        locations.forEach(loc => {
            const marker = L.marker(loc.coords, { icon: defaultIcon })
                .addTo(map)
                .bindPopup(`<b>${loc.name}</b>`);
            
            if (locationListEl) {
                const li = document.createElement('li');
                li.textContent = loc.name;
                li.addEventListener('click', () => {
                    // Update active state in list
                    document.querySelectorAll('#locationList li').forEach(el => el.classList.remove('active'));
                    li.classList.add('active');
                    
                    // Pan map and show popup
                    map.flyTo(loc.coords, 14, { duration: 1.5 });
                    marker.openPopup();
                });
                locationListEl.appendChild(li);
            }
        });
    }

    // ==================== TOUCH SWIPE for Lightbox ====================
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }, { passive: true });

});
