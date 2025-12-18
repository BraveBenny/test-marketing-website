// ========================================
// NOVAMARK AGENCY - JAVASCRIPT
// ========================================

// ========================================
// NAVIGATION BAR INJECTION
// ========================================

function loadNavigation() {
  const navHTML = `
    <div class="container nav-container">
      <div class="logo">NovaMark</div>
      <nav id="nav">
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="service.html" class="nav-link">Services</a></li>
          <li><a href="about.html" class="nav-link">About</a></li>
          <button class="contactbutton">
            <li><a href="contact.html">Contact</a></li>
          </button>
        </ul>
      </nav>
      <button class="menu-toggle" id="menuToggle">☰</button>
    </div>
  `;
  
  const navContainer = document.getElementById('navigationbar');
  if (navContainer) {
    navContainer.innerHTML = navHTML;
    initializeNavigation();
  }
}

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Toggle hamburger icon
      if (nav.classList.contains('active')) {
        this.innerHTML = '✕';
      } else {
        this.innerHTML = '☰';
      }
    });
  }
  
  // Set active navigation link
  setActiveNavLink();
}

// ========================================
// SET ACTIVE NAVIGATION LINK
// ========================================

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const nav = document.getElementById('nav');
          const menuToggle = document.getElementById('menuToggle');
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '☰';
          }
        }
      }
    });
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    observer.observe(card);
  });
  
  // Observe testimonials
  const testimonials = document.querySelectorAll('.testimonial');
  testimonials.forEach(testimonial => {
    observer.observe(testimonial);
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initializeNavbarScroll() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.nav-container');
    
    if (navbar) {
      // Add shadow on scroll
      if (currentScroll > 50) {
        navbar.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
      } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// PORTFOLIO IMAGE LIGHTBOX (Simple)
// ========================================

function initializePortfolioLightbox() {
  const portfolioImages = document.querySelectorAll('.portfolio-grid img');
  
  portfolioImages.forEach(img => {
    img.addEventListener('click', function() {
      // Simple alert - you can replace with a proper lightbox library
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
      `;
      
      const imgClone = img.cloneNode();
      imgClone.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
      `;
      
      lightbox.appendChild(imgClone);
      document.body.appendChild(lightbox);
      
      lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
      });
    });
  });
}

// ========================================
// FORM VALIDATION (for contact page)
// ========================================

function initializeFormValidation() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      // Clear previous errors
      clearErrors();
      
      // Validate name
      if (name && name.value.trim() === '') {
        showError(name, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (email && email.value.trim() === '') {
        showError(email, 'Please enter your email');
        isValid = false;
      } else if (email && !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      }
      
      // Validate message
      if (message && message.value.trim() === '') {
        showError(message, 'Please enter a message');
        isValid = false;
      }
      
      // If form is valid
      if (isValid) {
        showSuccessMessage();
        contactForm.reset();
      }
    });
  }
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const error = document.createElement('span');
  error.className = 'error-message';
  error.textContent = message;
  formGroup.appendChild(error);
  input.style.borderColor = '#ef4444';
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => error.remove());
  
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.style.borderColor = '#e2e8f0';
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: #10b981;
    color: white;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    text-align: center;
  `;
  successDiv.textContent = 'Thank you! Your message has been sent successfully.';
  
  const form = document.getElementById('contactForm');
  form.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ========================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  loadNavigation();
  initializeSmoothScroll();
  initializeScrollAnimations();
  initializeNavbarScroll();
  initializePortfolioLightbox();
  initializeFormValidation();
});

// ========================================
// SCROLL TO TOP ON PAGE LOAD
// ========================================

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});
/* End of hero.js */
/* service page javascript can go here */
// ========================================
// NOVAMARK SERVICES - MODERN JAVASCRIPT
// Navy & Green Design with Scroll Effects
// ========================================

// ========================================
// NAVIGATION BAR INJECTION
// ========================================

function loadNavigation() {
  const navHTML = `
    <div class="container nav-container">
      <div class="logo">NovaMark</div>
      <nav id="nav">
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="service.html" class="nav-link">Services</a></li>
          <li><a href="about.html" class="nav-link">About</a></li>
          <button class="contactbutton">
            <li><a href="contact.html">Contact</a></li>
          </button>
        </ul>
      </nav>
      <button class="menu-toggle" id="menuToggle">☰</button>
    </div>
  `;
  
  const navContainer = document.getElementById('navigationbar');
  if (navContainer) {
    navContainer.innerHTML = navHTML;
    initializeNavigation();
  }
}

// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================

function initializeNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Animate hamburger icon
      if (nav.classList.contains('active')) {
        this.innerHTML = '✕';
        this.style.transform = 'rotate(90deg)';
      } else {
        this.innerHTML = '☰';
        this.style.transform = 'rotate(0deg)';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.style.transform = 'rotate(0deg)';
      }
    });
  }
  
  // Set active navigation link
  setActiveNavLink();
}

// ========================================
// SET ACTIVE NAVIGATION LINK
// ========================================

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const nav = document.getElementById('nav');
          const menuToggle = document.getElementById('menuToggle');
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) {
              menuToggle.innerHTML = '☰';
              menuToggle.style.transform = 'rotate(0deg)';
            }
          }
        }
      }
    });
  });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initializeScrollReveal() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on index
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe service detail sections
  const serviceDetails = document.querySelectorAll('.service-detail');
  serviceDetails.forEach(detail => {
    observer.observe(detail);
  });
}

// ========================================
// PARALLAX SCROLL EFFECT FOR IMAGES
// ========================================

function initializeParallax() {
  const serviceImages = document.querySelectorAll('.service-detail img');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    serviceImages.forEach((img, index) => {
      const speed = 0.1;
      const imgTop = img.getBoundingClientRect().top + scrolled;
      const windowHeight = window.innerHeight;
      
      if (scrolled > imgTop - windowHeight && scrolled < imgTop + img.offsetHeight) {
        const yPos = -(scrolled - imgTop) * speed;
        img.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

function initializeNavbarScroll() {
  let lastScroll = 0;
  const navbar = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navbar) {
      // Add/remove shadow and backdrop blur on scroll
      if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
      }
      
      // Hide/show navbar on scroll (optional)
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// ANIMATED COUNTER FOR STATS (if needed)
// ========================================

function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// ========================================
// HOVER EFFECT FOR SERVICE CARDS
// ========================================

function initializeCardHoverEffects() {
  const serviceDetails = document.querySelectorAll('.service-detail');
  
  serviceDetails.forEach(detail => {
    const img = detail.querySelector('img');
    const content = detail.querySelector('div');
    
    detail.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05) translateY(-10px)';
    });
    
    detail.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1) translateY(0)';
    });
  });
}

// ========================================
// LIST ITEM ANIMATION ON SCROLL
// ========================================

function initializeListItemAnimations() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const listItems = entry.target.querySelectorAll('li');
        listItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, index * 100);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const lists = document.querySelectorAll('.service-detail ul');
  lists.forEach(list => {
    const items = list.querySelectorAll('li');
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'all 0.5s ease';
    });
    observer.observe(list);
  });
}

// ========================================
// CURSOR TRAIL EFFECT (Optional Premium Feature)
// ========================================

function initializeCursorTrail() {
  let cursorTrail = [];
  const maxTrailLength = 10;
  
  document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
      cursorTrail.shift();
    }
    
    // Clean up old trail elements
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 500);
  });
}

// ========================================
// BACKGROUND GRADIENT ANIMATION
// ========================================

function initializeBackgroundAnimation() {
  const servicesPage = document.querySelector('.services-page');
  
  if (servicesPage) {
    let hue = 0;
    setInterval(() => {
      hue = (hue + 1) % 360;
      // Subtle color shift effect
      servicesPage.style.filter = `hue-rotate(${hue * 0.1}deg)`;
    }, 100);
  }
}

// ========================================
// LAZY LOAD IMAGES
// ========================================

function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// PAGE LOAD PROGRESS BAR
// ========================================

function initializeProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #14b8a6);
    z-index: 9999;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ========================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Core functionality
  loadNavigation();
  initializeSmoothScroll();
  initializeScrollReveal();
  initializeNavbarScroll();
  
  // Enhanced features
  initializeCardHoverEffects();
  initializeListItemAnimations();
  initializeLazyLoading();
  initializeProgressBar();
  
  // Optional premium features (comment out if not needed)
  // initializeParallax();
  // initializeCursorTrail();
  // initializeBackgroundAnimation();
});

// ========================================
// SCROLL TO TOP ON PAGE LOAD
// ========================================

window.addEventListener('load', function() {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
  // Add any scroll-intensive functions here
}, 10);