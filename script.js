const setActiveButton = (button) => {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  button.classList.add('active');
};

// La încărcarea paginii
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  const targetLink = hash 
    ? document.querySelector(`a[href="${hash}"]`) 
    : document.querySelector('a[href="shop.html"]');
  
  if (targetLink) setActiveButton(targetLink);
});

// La click pe butoane
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    setActiveButton(this);
  });
});

// La scroll, detectează secțiunea
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + section.offsetHeight) {
        current = section.id;
      }
    });
    
    const activeLink = current 
      ? document.querySelector(`a[href="#${current}"]`)
      : window.pageYOffset < 100 ? document.querySelector('a[href="shop.html"]') : null;
    
    if (activeLink) setActiveButton(activeLink);
  }, 100);
});