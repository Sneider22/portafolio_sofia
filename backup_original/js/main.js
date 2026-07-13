document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const hoverTargets = document.querySelectorAll('.hover-target, a');

    // Check if device supports hover (exclude mobile)
    if (window.matchMedia("(hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Animate dot instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            target.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // Scroll reveal effect for project images
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-item, .split-col, .project-gallery-section, .project-video-section').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(item);
    });

    // Smooth scroll for anchor links - cautiously
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu if a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Lightbox & Carousel Logic
    const initGalleries = () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <button class="lightbox-control prev">&lsaquo;</button>
            <img class="lightbox-img" src="" alt="">
            <button class="lightbox-control next">&rsaquo;</button>
        `;
        document.body.appendChild(lightbox);
        
        const lbImg = lightbox.querySelector('.lightbox-img');
        const lbClose = lightbox.querySelector('.lightbox-close');
        const lbPrev = lightbox.querySelector('.prev');
        const lbNext = lightbox.querySelector('.next');
        
        let currentGallery = [];
        let currentIndex = 0;
        
        const openLightbox = (imgSrc, galleryName) => {
            const galleryElement = document.querySelector(`.carousel[data-gallery="${galleryName}"]`);
            if(!galleryElement) return;
            const images = Array.from(galleryElement.querySelectorAll('.lightbox-trigger'));
            currentGallery = images.map(img => img.src);
            currentIndex = currentGallery.indexOf(imgSrc);
            
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        
        const updateLightboxImage = () => {
            lbImg.src = currentGallery[currentIndex];
            lbImg.style.animation = 'none';
            lbImg.offsetHeight; // trigger reflow
            lbImg.style.animation = 'revealUp 0.3s ease forwards';
        };
        
        const nextImage = () => {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            updateLightboxImage();
        };
        
        const prevImage = () => {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            updateLightboxImage();
        };
        
        lbClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        lbNext.addEventListener('click', nextImage);
        lbPrev.addEventListener('click', prevImage);
        
        document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', (e) => {
                const galleryName = e.target.closest('.carousel').getAttribute('data-gallery');
                openLightbox(e.target.src, galleryName);
            });
        });
        
        // Carousel Logic
        document.querySelectorAll('.carousel').forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            const cPrev = carousel.querySelector('.carousel-control.prev');
            const cNext = carousel.querySelector('.carousel-control.next');
            if(!items.length) return;
            
            let cIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
            if(cIndex === -1) cIndex = 0;

            const updateCarousel = () => {
                items.forEach((item, idx) => {
                    item.classList.toggle('active', idx === cIndex);
                });
            };
            
            if(cNext) cNext.addEventListener('click', () => {
                cIndex = (cIndex + 1) % items.length;
                updateCarousel();
            });
            if(cPrev) cPrev.addEventListener('click', () => {
                cIndex = (cIndex - 1 + items.length) % items.length;
                updateCarousel();
            });
        });
    };
    initGalleries();

    // Theme Switch Logic
    const themeBtns = document.querySelectorAll('.theme-btn');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    const applyTheme = (theme) => {
        if(theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    };

    applyTheme(currentTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    });
});
