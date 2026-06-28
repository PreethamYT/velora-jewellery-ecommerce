/* ============================================================
   Velora — Interactions, Animations & FOMO Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── ANNOUNCEMENT BAR ROTATION ───
  const announcementSlides = document.querySelectorAll('.announcement-slide');
  let currentSlide = 0;

  function rotateAnnouncement() {
    announcementSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % announcementSlides.length;
    announcementSlides[currentSlide].classList.add('active');
  }

  if (announcementSlides.length > 1) {
    setInterval(rotateAnnouncement, 4000);
  }

  // ─── HEADER SCROLL BEHAVIOR ───
  const header = document.getElementById('main-header');
  const announcementBar = document.getElementById('announcement-bar');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class (hides announcement, shrinks header)
    if (scrollY > 100) {
      header.classList.add('scrolled');
      announcementBar.style.transform = 'translateY(-100%)';
      announcementBar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
      header.classList.remove('scrolled');
      announcementBar.style.transform = 'translateY(0)';
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ─── BACK TO TOP ───
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── SCROLL ANIMATIONS (IntersectionObserver) ───
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  // Trust bar items animation
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.trust-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 100);
        });
        trustObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const trustBar = document.getElementById('trust-bar');
  if (trustBar) trustObserver.observe(trustBar);

  // ─── HERO PARALLAX (SUBTLE) ───
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrollY < heroHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ─── SMOOTH SCROLL FOR NAV LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 116; // header + announcement
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ─── FOMO TOAST NOTIFICATIONS ───
  const fomoData = [
    { name: 'Priya', city: 'Mumbai', product: 'Kundan Bridal Choker Set', time: '12 min ago' },
    { name: 'Anjali', city: 'Bangalore', product: 'Lumière Silver Necklace', time: '8 min ago' },
    { name: 'Sneha', city: 'Delhi', product: 'Rajwadi Kundan Jhumka', time: '23 min ago' },
    { name: 'Kezia', city: 'Chennai', product: '92.5 Silver Chain Bracelet', time: '5 min ago' },
    { name: 'Ritu', city: 'Pune', product: 'Maharani Filigree Bangles', time: '18 min ago' },
    { name: 'Divya', city: 'Hyderabad', product: 'Temple Necklace Set', time: '31 min ago' },
    { name: 'Neha', city: 'Jaipur', product: 'Celestial Solitaire Ring', time: '2 min ago' },
    { name: 'Meera', city: 'Kolkata', product: 'Zircon Stud Earrings', time: '15 min ago' },
  ];

  const toastEl = document.getElementById('fomo-toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDetail = document.getElementById('toast-detail');
  const toastClose = document.getElementById('toast-close');
  let toastIndex = 0;
  let toastTimeout;

  function showToast() {
    const data = fomoData[toastIndex];
    toastTitle.textContent = `${data.name} from ${data.city} just purchased`;
    toastDetail.textContent = `${data.product} • ${data.time}`;

    toastEl.classList.add('visible');

    // Hide after 4 seconds
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('visible');
      toastIndex = (toastIndex + 1) % fomoData.length;
    }, 4000);
  }

  toastClose.addEventListener('click', () => {
    toastEl.classList.remove('visible');
    clearTimeout(toastTimeout);
  });

  // Start FOMO toasts after 8 seconds, repeat every 25-35s
  function scheduleNextToast() {
    const delay = 25000 + Math.random() * 10000; // 25-35 seconds
    setTimeout(() => {
      showToast();
      scheduleNextToast();
    }, delay);
  }

  setTimeout(() => {
    showToast();
    scheduleNextToast();
  }, 8000);

  // ─── PRODUCT CARD HOVER SOUNDS (optional visual feedback) ───
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = 'none';
    });
  });

  // ─── QUICK ADD BUTTON INTERACTION ───
  document.querySelectorAll('.product-quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const originalText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = 'rgba(45, 122, 58, 0.9)';

      // Update cart count
      const cartCount = document.querySelector('.cart-count');
      cartCount.textContent = parseInt(cartCount.textContent) + 1;
      cartCount.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
      }, 200);

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 1500);
    });
  });

  // ─── COLLECTION CARD CLICK ───
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
      // Visual feedback
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });

  // ─── REVIEWS CAROUSEL (Simple auto-scroll for desktop) ───
  const reviewsCarousel = document.getElementById('reviews-carousel');
  if (reviewsCarousel && window.innerWidth > 768) {
    // No auto-scroll needed — all 3 cards visible on desktop
    // On mobile, native scroll handles it via CSS scroll-snap
  }

  // ─── NEWSLETTER FORM ───
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      const email = input.value;

      if (email) {
        button.textContent = '✓ You\'re In!';
        button.style.background = '#2D7A3A';
        input.value = '';
        input.placeholder = 'Welcome to the inner circle!';
        input.disabled = true;

        setTimeout(() => {
          button.textContent = 'Join Now';
          button.style.background = '';
          input.disabled = false;
          input.placeholder = 'Enter your email address';
        }, 3000);
      }
    });
  }

  // ─── MOBILE MENU TOGGLE ───
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';

      if (isOpen) {
        navLinks.style.display = 'none';
        mobileToggle.children[0].style.transform = '';
        mobileToggle.children[1].style.opacity = '1';
        mobileToggle.children[2].style.transform = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'fixed';
        navLinks.style.top = '0';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.bottom = '0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.alignItems = 'center';
        navLinks.style.justifyContent = 'center';
        navLinks.style.gap = '28px';
        navLinks.style.zIndex = '9999';

        // Animate hamburger to X
        mobileToggle.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        mobileToggle.children[1].style.opacity = '0';
        mobileToggle.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';

        // Style the nav links for mobile
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.fontSize = '18px';
          link.style.letterSpacing = '3px';
        });

        // Close when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            navLinks.style.display = 'none';
            mobileToggle.children[0].style.transform = '';
            mobileToggle.children[1].style.opacity = '1';
            mobileToggle.children[2].style.transform = '';
          }, { once: true });
        });
      }
    });
  }

  // ─── WHATSAPP TOOLTIP ───
  const whatsappFloat = document.getElementById('whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('mouseenter', () => {
      whatsappFloat.style.transform = 'scale(1.1)';
    });
    whatsappFloat.addEventListener('mouseleave', () => {
      whatsappFloat.style.transform = 'scale(1)';
    });
  }

  // ─── HERO ENTRANCE ANIMATION ───
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';

    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // ─── COUNTER ANIMATION (Trust Bar Numbers) ───
  function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      if (target >= 1000000) {
        element.textContent = (current / 1000000).toFixed(0) + ' Million+' + suffix;
      } else if (target >= 1000) {
        element.textContent = current.toLocaleString() + '+' + suffix;
      } else {
        element.textContent = current + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  console.log('✦ Velora — Premium Experience Loaded');
  console.log('✦ Sample MVP Template · High-Conversion Jewellery Store');
});
