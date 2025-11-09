// ============================================
// TAG SOLUTIONS - Enhanced Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ENHANCED MOBILE MENU =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Enhanced hamburger animation
            const svg = this.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                svg.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                `;
                // Add pulse effect to menu button
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                svg.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const svg = mobileMenuToggle.querySelector('svg');
                svg.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                `;
            }
        });
    });
    
    // ===== ENHANCED SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add click effect
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // ===== ENHANCED NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Enhanced navbar styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'var(--glass-bg)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'var(--shadow-lg)';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== PARALLAX EFFECTS =====
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // ===== ENHANCED SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.service-card, .segment-card, .differential-card, .stat-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Enhanced card animations
    const cards = document.querySelectorAll('.service-card, .segment-card, .differential-card, .stat-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // ===== ENHANCED STATISTICS ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    let statsObserver = null;
    
    const animateStats = () => {
        statNumbers.forEach((stat, index) => {
            const text = stat.textContent;
            let target = 0;
            let suffix = '';
            
            // Enhanced number parsing
            if (text.includes('%')) {
                target = 100;
                suffix = '%';
            } else if (text.includes('+')) {
                target = parseInt(text.replace('+', ''));
                suffix = '+';
            } else if (text.includes('/')) {
                stat.textContent = text; // Don't animate 24/7
                return;
            }
            
            let current = 0;
            const increment = target / 60;
            const duration = 2000; // 2 seconds
            const stepTime = duration / (target / increment);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = suffix === '+' ? `+${target}` : `${target}${suffix}`;
                    stat.style.background = 'linear-gradient(45deg, #FFFFFF, #E0E7FF)';
                    stat.style.webkitBackgroundClip = 'text';
                    stat.style.webkitTextFillColor = 'transparent';
                    stat.style.backgroundClip = 'text';
                    clearInterval(timer);
                    
                    // Add celebration effect
                    setTimeout(() => {
                        stat.style.animation = 'bounce 0.6s ease';
                        setTimeout(() => {
                            stat.style.animation = '';
                        }, 600);
                    }, 100);
                } else {
                    stat.textContent = suffix === '+' ? `+${Math.floor(current)}` : `${Math.floor(current)}${suffix}`;
                }
            }, stepTime);
        });
    };
    
    // Enhanced observer for stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    
                    // Add entrance animation
                    statsSection.style.opacity = '0';
                    statsSection.style.transform = 'translateY(50px)';
                    statsSection.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(() => {
                        statsSection.style.opacity = '1';
                        statsSection.style.transform = 'translateY(0)';
                    }, 200);
                    
                    setTimeout(() => {
                        animateStats();
                    }, 800);
                }
            });
        }, { threshold: 0.3 });
        
        statsObserver.observe(statsSection);
    }
    
    // ===== ENHANCED ACTIVE NAV LINK =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    link.style.color = 'var(--neutral-600)';
                    link.style.fontWeight = '500';
                });
                
                // Add active style to current link
                navLink.classList.add('active');
                navLink.style.color = 'var(--primary-600)';
                navLink.style.fontWeight = '700';
            }
        });
    });
    
    // ===== ENHANCED FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        // Enhanced form validation with animations
        const validateField = (field, validation) => {
            const formGroup = field.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            if (validation) {
                formGroup.classList.remove('error');
                field.style.borderColor = 'var(--success)';
                field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                if (errorMessage) {
                    errorMessage.style.opacity = '0';
                }
            } else {
                formGroup.classList.add('error');
                field.style.borderColor = 'var(--error)';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                if (errorMessage) {
                    errorMessage.style.opacity = '1';
                }
            }
        };
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                // Add validation logic here
                if (this.value.trim()) {
                    validateField(this, true);
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    validateField(this, true);
                }
            });
        });
    }
    
    // ===== FLOATING ELEMENTS ANIMATION =====
    function createFloatingElements() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 3; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: ${i % 2 === 0 ? 'var(--gradient-primary)' : 'var(--gradient-accent)'};
                border-radius: 50%;
                opacity: 0.1;
                pointer-events: none;
                z-index: 1;
                animation: float ${Math.random() * 4 + 6}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            hero.appendChild(element);
        }
    }
    
    createFloatingElements();
    
    // ===== MOUSE CURSOR EFFECT =====
    let mouseCursor = null;
    
    function createMouseCursor() {
        mouseCursor = document.createElement('div');
        mouseCursor.className = 'mouse-cursor';
        mouseCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-500);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
            opacity: 0.8;
        `;
        document.body.appendChild(mouseCursor);
    }
    
    if (window.innerWidth > 768) { // Only on desktop
        createMouseCursor();
        
        document.addEventListener('mousemove', (e) => {
            if (mouseCursor) {
                mouseCursor.style.left = e.clientX - 10 + 'px';
                mouseCursor.style.top = e.clientY - 10 + 'px';
            }
        });
        
        // Enhanced cursor for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .segment-card, .differential-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (mouseCursor) {
                    mouseCursor.style.transform = 'scale(2)';
                    mouseCursor.style.background = 'var(--neon-blue)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (mouseCursor) {
                    mouseCursor.style.transform = 'scale(1)';
                    mouseCursor.style.background = 'var(--primary-500)';
                }
            });
        });
    }
    
    // ===== LOADING ANIMATION =====
    function showLoadingComplete() {
        document.body.classList.add('loaded');
        
        // Animate elements in sequence
        const elements = document.querySelectorAll('.navbar, .hero-title, .hero-subtitle, .hero-cta');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Set initial states
    const initialElements = document.querySelectorAll('.navbar, .hero-title, .hero-subtitle, .hero-cta');
    initialElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // ===== ENHANCED BUTTON INTERACTIONS =====
    const buttons = document.querySelectorAll('.btn, .contact-btn, .contact-whatsapp, .nav-whatsapp');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ===== FLOATING CONTACT ANIMATION =====
    function initFloatingContact() {
        const floatingContact = document.querySelector('.contact-float');
        if (floatingContact && window.innerWidth > 768) {
            let isHovered = false;
            
            floatingContact.addEventListener('mouseenter', () => {
                isHovered = true;
                floatingContact.style.animation = 'none';
                floatingContact.style.transform = 'translateY(-50%) scale(1.1)';
            });
            
            floatingContact.addEventListener('mouseleave', () => {
                isHovered = false;
                setTimeout(() => {
                    if (!isHovered) {
                        floatingContact.style.animation = 'floatContact 3s ease-in-out infinite';
                        floatingContact.style.transform = 'translateY(-50%) scale(1)';
                    }
                }, 100);
            });
        }
    }
    
    // ===== TECH PARTICLES ENHANCEMENT =====
    function createAdvancedParticles() {
        const particlesContainer = document.querySelector('.tech-particles');
        if (!particlesContainer) return;
        
        // Remove existing particles
        const existingParticles = particlesContainer.querySelectorAll('.particle');
        existingParticles.forEach(particle => particle.remove());
        
        // Create new particles
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${i % 3 === 0 ? 'var(--neon-blue)' : i % 3 === 1 ? 'var(--neon-purple)' : 'var(--electric-indigo)'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.8 + 0.2};
                box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
                z-index: 2;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .loaded .navbar,
        .loaded .hero-title,
        .loaded .hero-subtitle,
        .loaded .hero-cta {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ===== ENHANCED SCROLL TRIGGERS =====
    function setupScrollTriggers() {
        const triggerElements = document.querySelectorAll('.about, .services, .segments, .differentials, .contact-highlight');
        
        const scrollTriggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                    
                    // Add section-specific animations
                    if (entry.target.classList.contains('services')) {
                        animateServiceCards();
                    } else if (entry.target.classList.contains('segments')) {
                        animateSegmentCards();
                    } else if (entry.target.classList.contains('differentials')) {
                        animateDifferentialCards();
                    } else if (entry.target.classList.contains('contact-highlight')) {
                        animateContactHighlight();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        triggerElements.forEach(element => {
            scrollTriggerObserver.observe(element);
        });
    }
    
    // ===== CONTACT HIGHLIGHT ANIMATIONS =====
    function animateContactHighlight() {
        const contactCards = document.querySelectorAll('.contact-card');
        const benefitsList = document.querySelectorAll('.benefits-list li');
        const badges = document.querySelectorAll('.badge-live, .badge-response');
        
        // Animate badges
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
                badge.style.animation = 'badgePulse 2s ease-in-out infinite';
            }, index * 200);
        });
        
        // Animate contact card
        contactCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 400 + (index * 150));
        });
        
        // Animate benefits list
        benefitsList.forEach((benefit, index) => {
            setTimeout(() => {
                benefit.style.opacity = '1';
                benefit.style.transform = 'translateX(0)';
            }, 600 + (index * 100));
        });
    }
    
    function animateServiceCards() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }
    
    function animateSegmentCards() {
        const cards = document.querySelectorAll('.segment-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }
    
    function animateDifferentialCards() {
        const cards = document.querySelectorAll('.differential-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 120);
        });
    }
    
    setupScrollTriggers();
    
    // Initialize new features
    initFloatingContact();
    createAdvancedParticles();
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    let ticking = false;
    
    function updateOnScroll() {
        updateParallax();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // ===== FINAL INITIALIZATION =====
    setTimeout(showLoadingComplete, 300);
    
    // Enhanced console message
    console.log('%c TAG SOLUTIONS ', 'background: linear-gradient(135deg, #0A6CFF 0%, #1E88E5 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Tecnologia que simplifica, organiza e aumenta o resultado do seu negócio ', 'font-size: 14px; color: #4B5563; font-weight: 500;');
    console.log('%c 🚀 Website carregado com sucesso! ', 'font-size: 12px; color: #10B981; font-weight: bold;');
    
    // Add page load performance
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⏱️ Tempo de carregamento: ${loadTime}ms`);
    }
    
    // ===== ENHANCED TOOLTIP SYSTEM =====
    function addTooltips() {
        const elements = document.querySelectorAll('[data-tooltip]');
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.getAttribute('data-tooltip');
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--neutral-900);
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 14px;
                    white-space: nowrap;
                    z-index: 10000;
                    opacity: 0;
                    transform: translateY(5px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                `;
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'translateY(0)';
                }, 10);
                
                this._tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', function() {
                if (this._tooltip) {
                    this._tooltip.style.opacity = '0';
                    this._tooltip.style.transform = 'translateY(5px)';
                    setTimeout(() => {
                        this._tooltip.remove();
                        this._tooltip = null;
                    }, 300);
                }
            });
        });
    }
    
    addTooltips();
    
    // ===== ENHANCED URGENCY EFFECTS =====
    function addUrgencyEffects() {
        const urgencyElement = document.querySelector('.contact-urgency');
        if (urgencyElement) {
            setInterval(() => {
                urgencyElement.style.transform = 'scale(1.02)';
                urgencyElement.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)';
                
                setTimeout(() => {
                    urgencyElement.style.transform = 'scale(1)';
                    urgencyElement.style.boxShadow = 'none';
                }, 1000);
            }, 10000); // Every 10 seconds
        }
    }
    
    // ===== CONTACT STATUS INDICATOR =====
    function updateContactStatus() {
        const statusElements = document.querySelectorAll('.contact-status');
        statusElements.forEach(element => {
            // Simulate online status with pulse effect
            element.style.animation = 'pulse 2s ease-in-out infinite';
        });
    }
    
    // ===== INTERSECTION OBSERVER FOR CONTACT =====
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger contact highlight animations
                setTimeout(() => {
                    animateContactHighlight();
                    addUrgencyEffects();
                }, 300);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe contact highlight section
    const contactSection = document.querySelector('.contact-highlight');
    if (contactSection) {
        contactSection.style.opacity = '0';
        contactSection.style.transform = 'translateY(30px)';
        contactSection.style.transition = 'all 0.8s ease-out';
        contactObserver.observe(contactSection);
    }
    
    // Initialize contact status
    updateContactStatus();
    
    // ===== FINAL CHECK =====
    console.log('✅ Todos os recursos do site foram inicializados com sucesso!');
    console.log('🚀 TAG SOLUTIONS - Tecnologias que transformam negócios!');
});