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

document.addEventListener('DOMContentLoaded', () => {
  const linkButtons = document.querySelectorAll('.cssbuttons-io-button, .Btn');

  linkButtons.forEach(btn => {
    const href = btn.getAttribute('href') || btn.dataset.href || btn.getAttribute('data-href');
    if (!href) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (/^https?:\/\//i.test(href)) {
        window.open(href, '_blank', 'noopener');
      } else {
        window.location.href = href;
      }
    });

    btn.setAttribute('role', btn.getAttribute('role') || 'button');
    if (btn.tabIndex < 0) btn.tabIndex = 0;
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});