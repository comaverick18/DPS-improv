// improvU JavaScript - Interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initButtonInteractions();
    initMobileMenu();
    
    console.log('improvU website loaded successfully!');
});

// Toggle feature detail sections
function toggleFeatureDetail(featureId) {
    const detail = document.getElementById(featureId + '-detail');
    const button = event.target;
    
    if (detail.style.display === 'none' || detail.style.display === '') {
        // Show the detail
        detail.style.display = 'block';
        button.textContent = button.textContent.replace('→', '↑').replace('Try ', 'Hide ').replace('Start ', 'Hide ').replace('Join ', 'Hide ');
        
        // Smooth scroll to the detail
        setTimeout(() => {
            detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        // Hide the detail
        detail.style.display = 'none';
        button.textContent = button.textContent.replace('↑', '→').replace('Hide ', 'Try ').replace('Hide ', 'Start ').replace('Hide ', 'Join ');
        
        // Fix button text for specific features
        if (featureId === 'jazz') {
            button.textContent = 'Try JAZZ →';
        } else if (featureId === 'convoquest') {
            button.textContent = 'Start Quest →';
        } else if (featureId === 'improvcircle') {
            button.textContent = 'Join Session →';
        }
    }
}

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
            
            if (buttonText.includes('Start Building') || buttonText.includes('Start Free Trial')) {
                handleAppDownload();
            } else if (buttonText.includes('Download Now') || buttonText.includes('Download App')) {
                handleAppDownload();
            } else if (buttonText.includes('learn more')) {
                handleLearnMore();
            }
        });
    });
}

// Handle app download/trial start
function handleAppDownload() {
    showDownloadModal();
}

// Handle learn more clicks
function handleLearnMore() {
    showNotification('Opening more information...', 'info');
    // In real implementation: scroll to features or open modal with details
    scrollToFeatures();
}

// Scroll to features section
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        const offsetTop = featuresSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Show download modal with app store options
function showDownloadModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download improvU</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Choose your platform to start building confidence:</p>
                <div class="download-options">
                    <a href="#" class="download-option" data-platform="ios">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <div>
                            <strong>iOS App Store</strong>
                            <span>iPhone & iPad</span>
                        </div>
                    </a>
                    <a href="#" class="download-option" data-platform="android">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1333 1.0989L4.8442 5.4467a.4161.4161 0 00-.5972-.1518.416.416 0 00-.1518.5972L6.0952 9.3214C2.7803 11.1037.8508 13.9415.8508 17.1695H23.1492c0-3.228-1.9295-6.0658-5.2442-7.8481"/>
                        </svg>
                        <div>
                            <strong>Google Play</strong>
                            <span>Android devices</span>
                        </div>
                    </a>
                </div>
                <div class="trial-info">
                    <div class="trial-badge">
                        <span class="trial-dot"></span>
                        7-day free trial • No commitment
                    </div>
                    <p class="trial-description">Start your confidence journey today. Cancel anytime during your free trial.</p>
                </div>
                <div class="waitlist-section">
                    <p class="waitlist-note">Coming soon! Join our waitlist to be notified when improvU launches.</p>
                    <div class="waitlist-form">
                        <input type="email" placeholder="Enter your email" class="email-input">
                        <button class="btn-primary btn-small">Join Waitlist</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = `
            .download-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-content {
                background: white;
                border-radius: 24px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease-out;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }
            
            .modal-header h3 {
                font-size: 24px;
                font-weight: 700;
                color: #1E2875;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: #6B7280;
                cursor: pointer;
                padding: 0;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .modal-close:hover {
                background-color: #F3F4F6;
            }
            
            .modal-body p {
                font-size: 16px;
                color: #6B7280;
                margin-bottom: 24px;
            }
            
            .download-options {
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-bottom: 32px;
            }
            
            .download-option {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px;
                border: 2px solid #E5E8F0;
                border-radius: 16px;
                text-decoration: none;
                color: #1E2875;
                transition: all 0.3s ease;
            }
            
            .download-option:hover {
                border-color: #4169E1;
                background-color: #F8F9FB;
            }
            
            .download-option svg {
                width: 32px;
                height: 32px;
                color: #4169E1;
            }
            
            .download-option strong {
                display: block;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .download-option span {
                font-size: 14px;
                color: #6B7280;
            }
            
            .trial-info {
                background: #F8F9FB;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
                text-align: center;
            }
            
            .trial-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #1E2875;
                color: #FFFFFF;
                font-size: 13px;
                font-weight: 600;
                padding: 6px 16px;
                border-radius: 100px;
                margin-bottom: 12px;
            }
            
            .trial-dot {
                width: 8px;
                height: 8px;
                background: #10B981;
                border-radius: 50%;
            }
            
            .trial-description {
                font-size: 14px;
                color: #6B7280;
                margin: 0;
            }
            
            .waitlist-section {
                border-top: 1px solid #E5E8F0;
                padding-top: 24px;
            }
            
            .waitlist-note {
                font-size: 14px;
                color: #9CA3AF;
                text-align: center;
                margin-bottom: 16px;
            }
            
            .waitlist-form {
                display: flex;
                gap: 12px;
                align-items: center;
            }
            
            .email-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #E5E8F0;
                border-radius: 12px;
                font-size: 16px;
                outline: none;
                transition: border-color 0.3s ease;
            }
            
            .email-input:focus {
                border-color: #4169E1;
            }
            
            .btn-small {
                padding: 12px 24px;
                font-size: 14px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @media (max-width: 480px) {
                .modal-content {
                    padding: 24px;
                }
                
                .waitlist-form {
                    flex-direction: column;
                }
                
                .email-input {
                    width: 100%;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add modal to body
    document.body.appendChild(modal);
    
    // Handle modal close
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Handle download option clicks
    modal.querySelectorAll('.download-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = option.dataset.platform;
            trackEvent('app_store_click', { platform: platform });
            showNotification(`Redirecting to ${platform} app store...`, 'info');
            // In a real app, redirect to actual app store URLs
            // window.open(platform === 'ios' ? 'https://apps.apple.com/app/improvu' : 'https://play.google.com/store/apps/details?id=com.improvu.app', '_blank');
        });
    });
    
    // Handle waitlist form
    const waitlistForm = modal.querySelector('.waitlist-form');
    const emailInput = modal.querySelector('.email-input');
    const submitBtn = modal.querySelector('.btn-small');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Please enter your email address', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Submit to waitlist
        trackEvent('waitlist_signup', { email: email });
        submitBtn.textContent = 'Added!';
        submitBtn.style.background = '#10B981';
        showNotification('Welcome to the improvU waitlist!', 'success');
        
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
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
            
            .notification-error {
                border-left: 4px solid #EF4444;
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

// Mobile menu functionality
function initMobileMenu() {
    // Handle mobile navigation visibility
    const handleResize = () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) {
            // Mobile view - nav links hidden by CSS
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

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Analytics tracking (placeholder for real implementation)
function trackEvent(eventName, properties = {}) {
    // In real implementation, send to Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', eventName, properties);
    
    // Example integrations:
    // gtag('event', eventName, properties);
    // mixpanel.track(eventName, properties);
    // amplitude.logEvent(eventName, properties);
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

// Portfolio item interactions
function initPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            showNotification('Opening app screenshot...', 'info');
            // Could expand to show larger image or app demo
        });
    });
}

// Initialize additional interactions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPortfolioInteractions();
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for potential external use
window.improvU = {
    scrollToFeatures,
    showNotification,
    trackEvent,
    scrollToTop,
    showDownloadModal
};