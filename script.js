document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.story-section');
  const navDots = document.querySelectorAll('.nav-dot');
  
  // 1. Deteksi Posisi Scroll untuk Mengaktifkan Titik Navigasi Samping
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Aktif ketika bagian berada di tengah layar
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Perbarui titik navigasi yang sedang aktif
        navDots.forEach((dot) => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
  
  // 2. Efek Muncul Halus (Fade In saat di-scroll)
  const revealOptions = {
    threshold: 0.15
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  document.querySelectorAll('.desktop-card').forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease, border-color 0.4s ease';
    revealObserver.observe(card);
  });
});