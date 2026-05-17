/*
   Super Home Interiors - Interactions
   Version: 2.1 - Mobile Services Fix
   Fixed: Mobile nav service sub-links now clickable,
          Mega menu 8-item support
*/

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. HEADER — Scroll behaviour
       ============================================ */
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }


    /* ============================================
       2. MOBILE NAV TOGGLE
       ============================================ */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileToggle.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';
            lucide.createIcons();
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close nav ONLY when a non-service-tile link is clicked
        // (service tiles are .mob-service-tile — let those navigate freely)
        navLinks.querySelectorAll('a').forEach(link => {
            // Skip service tiles and the "View all" link — they navigate away, no close needed
            if (link.classList.contains('mob-service-tile') || link.classList.contains('mob-view-all')) {
                return; // do nothing — browser handles navigation naturally
            }

            // Skip the Services parent link (it just labels the section on mobile)
            if (link.closest('.has-dropdown') && !link.closest('.mob-services-block')) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault(); // don't navigate, just keep drawer open
                    }
                });
                return;
            }

            // All other nav links (Home, About, Portfolio, Contact) → close drawer
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
                document.body.style.overflow = '';
            });
        });
    }


    /* ============================================
       3. MEGA MENU — JS only (no CSS hover conflict)
       ============================================ */
    const hasDropdowns = document.querySelectorAll('.has-dropdown');

    hasDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.mega-menu');

        if (!trigger || !menu) return;

        // Open on mouseenter (desktop)
        dropdown.addEventListener('mouseenter', () => {
            hasDropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            dropdown.classList.add('active');
        });

        // Close on mouseleave
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('active');
        });

        // On mobile: tapping "Services" label does nothing (handled above)
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
            }
        });
    });

    // Close mega menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            hasDropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hasDropdowns.forEach(d => d.classList.remove('active'));
        }
    });


    /* ============================================
       4. SCROLL REVEAL ANIMATIONS
       ============================================ */
    const revealElements = document.querySelectorAll('.reveal, .reveal-fade');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }


    /* ============================================
       5. FAQ ACCORDION
       ============================================ */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });

            item.classList.toggle('active', !isActive);
        });
    });


    /* ============================================
       6. SMOOTH SCROLL for anchor links
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });


    /* ============================================
       7. CONTACT FORM — simple submit handler
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Enquiry Sent!';
                btn.style.background = '#25D366';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 800);
        });
    }

});
