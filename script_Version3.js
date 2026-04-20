// ============================================
// NAVIGATION & MENU FUNCTIONALITY
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.expertise-card, .jewellery-card, .stat-box, .reason, ' +
        '.education-card, .highlight-item, .institution-banner, .skills-section'
    );

    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function revealOnScroll() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call on page load
}

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHT
// ============================================

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#d4a574';
            }
        });
    });
}

// ============================================
// EDUCATION SECTION INTERACTIONS
// ============================================

function initEducationFeatures() {
    // Skill tag click feedback
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Show skill info
            const skillText = this.textContent;
            showSkillTooltip(skillText);
        });
    });

    // Highlight item counter animation
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.animation = `scaleIn 0.6s ease ${index * 0.1}s`;
                    }, 100);
                }
            });
        });
        observer.observe(item);
    });
}

// Show skill tooltip
function showSkillTooltip(skill) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = `Expertise in ${skill}`;

    tooltip.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #d4a574, #9b7d5a);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1001;
        animation: slideIn 0.4s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(tooltip);

    setTimeout(() => {
        tooltip.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => tooltip.remove(), 400);
    }, 2500);
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name) {
            showAlert('Please enter your name', 'error');
            nameInput.focus();
            return;
        }

        if (name.length < 2) {
            showAlert('Name must be at least 2 characters long', 'error');
            nameInput.focus();
            return;
        }

        if (!email || !validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }

        if (!message) {
            showAlert('Please enter your message', 'error');
            messageInput.focus();
            return;
        }

        if (message.length < 10) {
            showAlert('Message must be at least 10 characters long', 'error');
            return;
        }

        // Simulate form submission with loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showAlert(
                'Thank you! Your message has been sent successfully. We will contact you soon.',
                'success'
            );

            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ============================================
// EMAIL VALIDATION
// ============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// ALERT & NOTIFICATION SYSTEM
// ============================================

function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;

    // Add styles
    const bgColor = type === 'success' ? '#4caf50' : '#f44336';
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        z-index: 1001;
        animation: slideIn 0.4s ease;
        background-color: ${bgColor};
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        max-width: 400px;
        word-wrap: break-word;
    `;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => alertBox.remove(), 400);
    }, 3000);
}

// ============================================
// ADD ANIMATION STYLES DYNAMICALLY
// ============================================

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        * {
            -webkit-tap-highlight-color: transparent;
        }

        button, a, input, textarea {
            -webkit-touch-callout: none;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// MANAV RACHANA INSTITUTE INFO
// ============================================

function displayInstituteInfo() {
    const instituteData = {
        name: 'Manav Rachana International Institute of Research and Sciences',
        abbreviation: 'MRIIRS',
        type: 'Research & Educational Institute',
        focus: 'Biotechnology & Life Sciences',
        features: [
            'State-of-the-art laboratories',
            'Expert faculty with international experience',
            'Emphasis on hands-on research',
            'Global academic collaborations',
            'Strong industry partnerships',
            'Innovation and entrepreneurship hub'
        ]
    };

    console.log('Institute Information:');
    console.log(`Institution: ${instituteData.name}`);
    console.log(`Abbreviation: ${instituteData.abbreviation}`);
    console.log(`Type: ${instituteData.type}`);
    console.log(`Focus: ${instituteData.focus}`);
}

// ============================================
// STUDENT PROFILE STATS
// ============================================

function trackProfileStats() {
    const stats = {
        biotechProjects: 5,
        publications: 3,
        happyCustomers: 2000,
        warrantyMonths: 6,
        yearsExperience: 0.5
    };

    const profileSummary = `
        Profile Statistics:
        - Biotech Projects: ${stats.biotechProjects}+
        - Publications: ${stats.publications}
        - Happy Customers (KshatriyaJewels): ${stats.happyCustomers}+
        - Warranty Period: ${stats.warrantyMonths} months
        - Startup Experience: ${stats.yearsExperience} years
    `;

    console.log(profileSummary);
}

// ============================================
// INITIALIZE ALL FEATURES ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('='.repeat(50));
    console.log('Portfolio Website Loaded Successfully!');
    console.log('='.repeat(50));

    // Initialize all features
    initScrollAnimations();
    highlightActiveNavLink();
    initEducationFeatures();
    addAnimationStyles();
    displayInstituteInfo();
    trackProfileStats();

    console.log('All features initialized');
    console.log('='.repeat(50));
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    return current;
}

// ============================================
// RESPONSIVE BEHAVIOR
// ============================================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// END OF SCRIPT
// ============================================