// DesignBell JavaScript - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initButtonInteractions();
    initMobileMenu();
    
    console.log('DesignBell website loaded successfully!');
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for sticky nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for elements coming into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.benefit-item, .process-step, .portfolio-item, .pricing-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Button interactions and CTA handling
function initButtonInteractions() {
    // Primary CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle different button actions
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Get Started') || buttonText.includes('Subscribe')) {
                handleSubscriptionClick();
            } else if (buttonText.includes('SEE PLANS')) {
                scrollToPricing();
            } else if (buttonText.includes('schedule a call')) {
                handleScheduleCall();
            }
        });
    });
    
    // Client login button
    const loginBtn = document.querySelector('.nav-login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            handleClientLogin();
        });
    }
}

// Handle subscription/get started clicks
function handleSubscriptionClick() {
    // In a real implementation, this would open a subscription modal or redirect
    showNotification('Redirecting to subscription page...', 'info');
    
    // Simulate redirect after short delay
    setTimeout(() => {
        // window.location.href = '/subscribe';
        console.log('Would redirect to subscription page');
    }, 1000);
}

// Scroll to pricing section
function scrollToPricing() {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        const offsetTop = pricingSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle schedule call clicks
function handleScheduleCall() {
    showNotification('Opening calendar booking...', 'info');
    // In real implementation: window.open('https://calendly.com/designbell', '_blank');
}

// Handle client login
function handleClientLogin() {
    showNotification('Redirecting to client portal...', 'info');
    // In real implementation: window.location.href = '/login';
}

// Show notification messages
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #FFFFFF;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(30, 40, 117, 0.12);
                padding: 16px 20px;
                z-index: 1000;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
            }
            
            .notification-info {
                border-left: 4px solid #4169E1;
            }
            
            .notification-success {
                border-left: 4px solid #10B981;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            
            .notification-message {
                font-size: 14px;
                font-weight: 500;
                color: #374151;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                color: #6B7280;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: #374151;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Handle close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 3000);
}

// Remove notification with animation
function removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

// Mobile menu functionality (for future expansion)
function initMobileMenu() {
    // Currently using simple responsive design
    // This function is ready for hamburger menu implementation if needed
    
    // Handle mobile navigation visibility
    const handleResize = () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) {
            // Mobile view - could add hamburger menu here
        } else {
            // Desktop view - ensure nav is visible
            if (navLinks) {
                navLinks.style.display = 'flex';
            }
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
}

// Portfolio item interactions
function initPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this could open a modal with project details
            showNotification('Opening project details...', 'info');
        });
    });
}

// Pricing card interactions
function initPricingInteractions() {
    const pricingCard = document.querySelector('.pricing-card');
    
    if (pricingCard) {
        // Add subtle hover effects beyond CSS
        pricingCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        pricingCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Form validation (for future contact forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Analytics tracking (placeholder for real implementation)
function trackEvent(eventName, properties = {}) {
    // In real implementation, send to Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, properties);
    
    // Example: gtag('event', eventName, properties);
    // Example: mixpanel.track(eventName, properties);
}

// Track button clicks for analytics
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            section: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Initialize additional interactions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioInteractions();
    initPricingInteractions();
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button (optional)
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4169E1;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(65, 105, 225, 0.3);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
}

// Initialize scroll to top button
// addScrollToTopButton(); // Uncomment if you want this feature

// Export functions for potential external use
window.DesignBell = {
    scrollToPricing,
    showNotification,
    trackEvent,
    scrollToTop
};
