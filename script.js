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

  // Modal Functionality
  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal-img');
  const modalTitle = document.querySelector('.modal-content h3');
  const modalText = document.querySelector('.modal-content p');
  const closeModal = document.querySelector('.close');

  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.portfolio-item');
      modalImg.src = item.querySelector('img').src;
      modalTitle.textContent = item.querySelector('h3').textContent;
      modalText.textContent = item.querySelector('p').textContent;
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
  const images = document.querySelectorAll('.portfolio-item img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src || entry.target.src;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => observer.observe(img));
});

// Form Submission (Placeholder)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! (Placeholder - add backend integration for full functionality.)');
});