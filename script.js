// Smooth scrolling and interactive functionality for ConfidenceFlow landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initSmoothScrolling();
    initDownloadTracking();
    initMobileMenu();
    
    console.log('ConfidenceFlow website loaded successfully!');
});

// Scroll animations for fade-in effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.feature-content, .feature-image, .cta-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links and CTA buttons
function initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Download button functionality with tracking
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.btn-primary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track download attempt (in a real app, this would send to analytics)
            trackDownloadClick(this);
            
            // Show download modal or redirect to app store
            showDownloadOptions();
        });
    });
}

// Scroll to download function for hero CTA
function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
        const offsetTop = downloadSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Track download clicks (placeholder for analytics)
function trackDownloadClick(button) {
    const buttonText = button.textContent.trim();
    const section = button.closest('section').className;
    
    // In a real implementation, you'd send this to Google Analytics, Mixpanel, etc.
    console.log('Download clicked:', {
        button: buttonText,
        section: section,
        timestamp: new Date().toISOString()
    });
    
    // You could also send to your backend
    // fetch('/api/track-download', { method: 'POST', body: JSON.stringify(data) });
}

// Show download options modal
function showDownloadOptions() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Download ConfidenceFlow</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Choose your platform to download ConfidenceFlow:</p>
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
                <p class="modal-note">Coming soon to all platforms! Join our waitlist to be notified when ConfidenceFlow launches.</p>
                <div class="waitlist-form">
                    <input type="email" placeholder="Enter your email" class="email-input">
                    <button class="btn-primary btn-small">Join Waitlist</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
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
        
        .modal-note {
            font-size: 14px;
            color: #9CA3AF;
            text-align: center;
            margin-bottom: 24px;
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
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
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
            document.body.removeChild(modal);
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
            console.log(`Redirecting to ${platform} store...`);
            // In a real app, redirect to actual app store URLs
            alert(`Redirecting to ${platform} app store...`);
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
            alert('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Submit to waitlist (placeholder)
        console.log('Adding to waitlist:', email);
        submitBtn.textContent = 'Added!';
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
            closeModal();
        }, 1500);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu functionality (for future expansion)
function initMobileMenu() {
    // Placeholder for mobile hamburger menu if needed
    // Currently using simple responsive design without hamburger menu
}

// Parallax effect for hero section (subtle)
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add CSS for fadeOut animation
const additionalStyles = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Make scrollToDownload globally available
window.scrollToDownload = scrollToDownload;
