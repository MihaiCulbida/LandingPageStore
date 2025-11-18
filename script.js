const setActiveButton = (button) => {
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  button.classList.add('active');
};

window.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'shop.html';
  const hash = window.location.hash;
  
  let targetLink;
  
  if ((currentPage === 'shop.html' || currentPage === '' || currentPage === 'index.html') && hash) {
    targetLink = document.querySelector(`a[href="${hash}"]`);
  } else {
    targetLink = document.querySelector(`a[href="${currentPage}"]`);
  }

  if (!targetLink && (currentPage === 'shop.html' || currentPage === '' || currentPage === 'index.html')) {
    targetLink = document.querySelector('a[href="shop.html"]') || document.querySelector('a[href="#home"]');
  }
  
  if (targetLink) setActiveButton(targetLink);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    setActiveButton(this);
  });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'shop.html';
  
  if (currentPage !== 'shop.html' && currentPage !== '' && currentPage !== 'index.html') {
    return;
  }
  
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
      : window.pageYOffset < 100 ? document.querySelector('a[href="shop.html"]') || document.querySelector('a[href="#home"]') : null;
    
    if (activeLink) setActiveButton(activeLink);
  }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
  const categoryCards = document.querySelectorAll('.category-card');
  const productCards = document.querySelectorAll('.product-card');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedCategory = card.getAttribute('data-category');

      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      productCards.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (productCategory === selectedCategory) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  const firstCategory = categoryCards[0];
  if (firstCategory) {
    firstCategory.click();
  }
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