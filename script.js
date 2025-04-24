document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Modal Functionality for Highlights
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-img');
  const modalText = document.querySelector('.modal-content p');
  const closeModal = document.querySelector('.close');

  document.querySelectorAll('.highlight-item').forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.querySelector('img').src;
      modalText.textContent = item.querySelector('img').dataset.caption;
      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Lazy Load Images
  const images = document.querySelectorAll('.highlight-item img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src || entry.target.src;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => observer.observe(img));

  // Dynamically Move Social Links for Mobile
  const socialLinks = document.querySelector('.social-links');
  const socialLinksMobile = document.querySelector('.social-links-mobile');
  if (window.innerWidth <= 768) {
    socialLinksMobile.append(...socialLinks.children);
  }
});