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

  // Scroll Animations
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });
});

// Add visible/hidden classes for animations
const style = document.createElement('style');
style.textContent = `
  .hidden { opacity: 0; transform: translateY(50px); transition: all 0.5s; }
  .visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Form Submission (Placeholder)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted! (This is a placeholder - integrate with a backend for full functionality.)');
});