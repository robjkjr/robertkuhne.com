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

  // Animate the scroll arrow
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    console.log('Scroll arrow found, starting animation'); // Debug log

    // Fallback: Add a class to trigger CSS animation
    scrollArrow.classList.add('animate');

    // JavaScript animation as primary method
    let startTime = null;
    const duration = 1500; // Animation duration in milliseconds (1.5s)
    const peak = -10; // Peak of the bounce (-10px)
    const midpoint = -5; // Midpoint of the bounce (-5px)

    const animateArrow = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration; // Progress from 0 to 1

      // Simulate the keyframes: 0%, 20%, 50%, 80%, 100% at 0px; 40% at -10px; 60% at -5px
      let translateY;
      if (progress <= 0.2 || progress >= 0.8) {
        translateY = 0; // Start, end, and 20%, 80%, 100% positions
      } else if (progress <= 0.4) {
        translateY = (progress - 0.2) / 0.2 * peak;
      } else if (progress <= 0.6) {
        translateY = peak - ((progress - 0.4) / 0.2 * (peak - midpoint));
      } else {
        translateY = midpoint - ((progress - 0.6) / 0.2 * midpoint);
      }

      // Apply the transform
      scrollArrow.style.transform = `translateX(-50%) translateY(${translateY}px)`;
      console.log(`Animating arrow: translateY(${translateY}px)`); // Debug log

      // Continue the animation loop
      requestAnimationFrame(animateArrow);
    };

    // Start the animation immediately
    requestAnimationFrame(animateArrow);
  } else {
    console.log('Scroll arrow not found'); // Debug log
  }
});