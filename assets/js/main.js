/* 
   Super Home Interiors - Interactions
   Vanilla JS (ES6+)
*/

document.addEventListener('DOMContentLoaded', () => {
    // Header transition on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for reveal animations
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Mobile Menu logic
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            if (navLinks.classList.contains('active')) {
                mobileToggle.innerHTML = '<i data-lucide="x"></i>';
            } else {
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            }
            lucide.createIcons();
        });
    }

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


// Close mega menu when clicking outside
document.addEventListener('click', function(e) {
    const hasDropdown = document.querySelector('.has-dropdown');
    if (hasDropdown && !hasDropdown.contains(e.target)) {
        hasDropdown.classList.remove('active');
    }
});

// Mega menu hover fix
document.querySelectorAll('.has-dropdown').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
    });
});
