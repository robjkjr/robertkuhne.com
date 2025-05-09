// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth' // Enable smooth scrolling
      });
    });
  });

  // Lazy load images in the highlights section
  const images = document.querySelectorAll('.highlight-item img'); // Select all highlight images
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src || entry.target.src; // Load the image
        observer.unobserve(entry.target); // Stop observing once loaded
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the image is visible

  // Observe each image for lazy loading
  images.forEach(img => observer.observe(img));

  // Trigger the scroll arrow animation
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    console.log('Scroll arrow found, applying animation class'); // Debug log
    // Add the animate class to trigger the CSS animation
    scrollArrow.classList.add('animate');
  } else {
    console.log('Scroll arrow not found'); // Debug log
  }
});