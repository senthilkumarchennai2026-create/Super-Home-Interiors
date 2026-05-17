/*
   Super Home Interiors - Interactions
   Version: 2.3 - FAQ icon fix + universal mobile services
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. HEADER — Scroll behaviour
       ============================================ */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }


    /* ============================================
       2. MOBILE NAV — inject service tiles,
          toggle expand on "Services" tap
       ============================================ */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks     = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {

        /* Inject mobile service tiles if not already in HTML */
        const hasDropdownLi = navLinks.querySelector('.has-dropdown');
        if (hasDropdownLi && !hasDropdownLi.querySelector('.mob-services-block')) {
            const block = document.createElement('div');
            block.className = 'mob-services-block';
            block.innerHTML = `
                <span class="mob-services-label">Choose a Service</span>
                <div class="mob-services-grid">
                    <a href="/services/modular-kitchen.html"       class="mob-service-tile">Modular Kitchens</a>
                    <a href="/services/bedroom-interiors.html"     class="mob-service-tile">Bedroom Interiors</a>
                    <a href="/services/living-room-interiors.html" class="mob-service-tile">Living Room</a>
                    <a href="/services/wardrobes.html"             class="mob-service-tile">Smart Wardrobes</a>
                    <a href="/services/false-ceiling.html"         class="mob-service-tile">False Ceiling</a>
                    <a href="/services/full-home-interiors.html"   class="mob-service-tile">Turnkey Solutions</a>
                    <a href="/services/villa-interiors.html"       class="mob-service-tile">Villa Interiors</a>
                    <a href="/services/office-interiors.html"      class="mob-service-tile">Office Interiors</a>
                </div>
                <a href="/services.html" class="mob-view-all">View all services →</a>`;
            hasDropdownLi.appendChild(block);
        }

        function openDrawer() {
            navLinks.classList.add('active');
            mobileToggle.innerHTML = '<i data-lucide="x"></i>';
            lucide.createIcons();
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            navLinks.classList.remove('active');
            navLinks.querySelector('.has-dropdown')?.classList.remove('mob-expanded');
            mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
            document.body.style.overflow = '';
        }

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.contains('active') ? closeDrawer() : openDrawer();
        });

        /* Tap "Services" label → expand/collapse tiles */
        const servicesParentLink = navLinks.querySelector('.has-dropdown > a');
        if (servicesParentLink) {
            servicesParentLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    servicesParentLink.closest('.has-dropdown').classList.toggle('mob-expanded');
                }
            });
        }

        /* Regular nav links → close drawer */
        navLinks.querySelectorAll('li:not(.has-dropdown) a').forEach(link => {
            link.addEventListener('click', () => closeDrawer());
        });

        /* "View all services" → close drawer */
        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('mob-view-all')) closeDrawer();
        });
    }


    /* ============================================
       3. MEGA MENU — desktop hover
       ============================================ */
    const hasDropdowns = document.querySelectorAll('.has-dropdown');

    hasDropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.mega-menu');
        if (!menu) return;

        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                hasDropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
                dropdown.classList.add('active');
            }
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown'))
            hasDropdowns.forEach(d => d.classList.remove('active'));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hasDropdowns.forEach(d => d.classList.remove('active'));
    });


    /* ============================================
       4. SCROLL REVEAL
       ============================================ */
    const revealElements = document.querySelectorAll('.reveal, .reveal-fade');
    if (revealElements.length > 0 && window.IntersectionObserver) {
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    ro.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach(el => ro.observe(el));
    }


    /* ============================================
       5. FAQ ACCORDION — with plus/minus icon swap
       ============================================ */
    document.querySelectorAll('.faq-item').forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            /* Close all items first */
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherIcon = other.querySelector('.faq-trigger [data-lucide]');
                    if (otherIcon) {
                        otherIcon.setAttribute('data-lucide', 'plus');
                        lucide.createIcons();
                    }
                }
            });

            /* Toggle clicked item */
            item.classList.toggle('active', !isActive);

            /* Swap icon: plus ↔ minus */
            const icon = trigger.querySelector('[data-lucide]');
            if (icon) {
                icon.setAttribute('data-lucide', !isActive ? 'minus' : 'plus');
                lucide.createIcons();
            }
        });
    });


    /* ============================================
       6. SMOOTH SCROLL
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ============================================
       7. CONTACT FORM
       ============================================ */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = '✓ Enquiry Sent!';
                btn.style.background = '#25D366';
                setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 800);
        });
    }

});
