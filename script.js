// Efekt wpisywania tekstu w sekcji hero
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Animacje przy przewijaniu strony
function animateOnScroll() {
    const elements = document.querySelectorAll('.tile, .services h2');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Efekt paralaksy dla sekcji hero
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        // Parallax OFF – nie podnoś hero
        hero.style.transform = 'translateY(0)';
    }
}

// Smooth scrolling dla linków nawigacji
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efekt sticky navbar z przezroczystością
function stickyNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.backgroundColor = 'rgba(44, 44, 44, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#2c2c2c';
        navbar.style.backdropFilter = 'none';
    }
}

// Dodanie klas CSS dla animacji przy przewijaniu
const style = document.createElement('style');
style.textContent = `
    .tile {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .tile.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .services h2 {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .services h2.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
    smoothScroll();
    animateOnScroll();
});

// Event listenery dla efektów przewijania
window.addEventListener('scroll', function() {
    animateOnScroll();
    parallaxEffect();
    stickyNavbar();
});

// Dodatkowe efekty interaktywne dla kafelków
document.addEventListener('DOMContentLoaded', function() {
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg) scale(1.02)';
        });
        
        tile.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });
});


// Navigation functionality for subpages
document.addEventListener('DOMContentLoaded', function() {
    const tileButtons = document.querySelectorAll('.tile-button');
    
    // Service to filename mapping
    const servicePages = {
        'Strony Internetowe': 'sites.html',
        'Sklepy Internetowe': 'shops.html',
        'Aplikacje WEB': 'aplikacje-web.html',
        'Social Media': 'social-media.html',
        'Reklama': 'reklama.html',
        'SEO': 'seo.html',
        'Strategia': 'strategia.html',
        'ePR': 'epr.html',
        'Grafika i Wideo': 'grafika-wideo.html'
    };
    
    tileButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tile = this.closest('.tile');
            const serviceName = tile.getAttribute('data-service');
            const pageUrl = servicePages[serviceName];
            
            if (pageUrl) {
                // Smooth transition effect
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    window.location.href = pageUrl;
                }, 200);
            }
        });
    });
});

// Create subpage files if they don't exist
function createSubpageIfNeeded(serviceName, filename) {
    // This function will be called by the tile buttons
    // The actual file creation will be handled by the main script
}

function sizeTiles() {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  if (!tiles.length) return;

  // wyczyść poprzednie inline-height, żeby poprawnie zmierzyć treść
  tiles.forEach(t => (t.style.height = ''));

  // policz wymaganą wysokość dla każdego kafelka
  const neededHeights = tiles.map(tile => {
    const content = tile.querySelector('.tile-content');
    const overlay = tile.querySelector('.tile-overlay');
    const baseH = content ? content.scrollHeight : 0;
    const overH = overlay ? overlay.scrollHeight : 0;
    return Math.max(250, baseH, overH); // 250 = Twoja bazowa wysokość z CSS
  });

  // ustaw wszystkim jednakową (największą) wysokość
  const maxH = Math.max(...neededHeights);
  tiles.forEach(t => (t.style.height = maxH + 'px'));
}

document.addEventListener('DOMContentLoaded', sizeTiles);
window.addEventListener('load', sizeTiles);
let _rt;
window.addEventListener('resize', () => {
  clearTimeout(_rt);
  _rt = setTimeout(sizeTiles, 100); // debounce
});
(() => {
  const canvas = document.getElementById('cursor-bubbles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;

  const mqMobile = matchMedia('(max-width: 768px)');
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');

  let W=0, H=0, dpr=1, particles=[];
  let visible = true;   // pauza gdy hero poza ekranem

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, mqMobile.matches ? 1.25 : 2);
    const rect = parent.getBoundingClientRect();
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    W = canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
    H = canvas.height = Math.max(1, Math.floor(rect.height * dpr));

    // LICZBA KULEK = zależna od powierzchni i breakpointu
    const area = (rect.width * rect.height);
    const density = mqMobile.matches ? 1/22000 : 1/16000; // im większa liczba po slashu, tym mniej kulek
    const targetCount = Math.max(mqMobile.matches ? 20 : 40,
                                 Math.min(mqMobile.matches ? 50 : 100, Math.round(area * density)));

    // dobuduj/obcinasz tablicę, bez resetu animacji
    while (particles.length < targetCount) particles.push(makeParticle());
    particles.length = targetCount;
  }

  function makeParticle() {
    const depth = Math.random()*0.8 + 0.2;
    const baseR = (mqMobile.matches ? 5 : 7) * depth;   // mniejsze kółka na mobile
    return {
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5) * 0.14 * dpr,
      vy: (Math.random()-0.5) * 0.14 * dpr,
      r: baseR * dpr * 1.6,
      depth
    };
  }

  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(parent);
  window.addEventListener('resize', resize);
  resize();

  // zatrzymaj rysowanie, gdy sekcja poza viewportem lub użytkownik nie chce animacji
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => visible = e.isIntersecting, {threshold: 0.05}).observe(parent);
  }

  if (mqReduce.matches) return; // użytkownik woli mniej animacji – wyłącz

  const mouse = {x: W/2, y: H/2, tx: W/2, ty: H/2};
  parent.addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) * dpr;
    mouse.ty = (e.clientY - r.top)  * dpr;
  }, {passive: true});

  document.addEventListener('visibilitychange', () => { visible = !document.hidden; });

  function easeMouse(){ mouse.x += (mouse.tx-mouse.x)*0.07; mouse.y += (mouse.ty-mouse.y)*0.07; }

  function draw(){
    requestAnimationFrame(draw);
    if (!visible) return;

    ctx.clearRect(0,0,W,H);
    easeMouse();

    for (const p of particles) {
      const parallax = (mqMobile.matches ? 0.04 : 0.06) * p.depth; // słabszy parallax na mobile
      const ox = (mouse.x - W/2) * parallax;
      const oy = (mouse.y - H/2) * parallax;

      p.x += p.vx; p.y += p.vy;
      if (p.x < -40 || p.x > W+40) p.vx *= -1;
      if (p.y < -40 || p.y > H+40) p.vy *= -1;

      const x = p.x + ox, y = p.y + oy;
      const g = ctx.createRadialGradient(x,y,0, x,y, p.r);
      g.addColorStop(0, 'rgba(255,255,255,0.22)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x,y,p.r,0,Math.PI*2); ctx.fill();
    }
  }
  requestAnimationFrame(draw);
})();

(() => {
  function equalizeTiles() {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    if (!tiles.length) return;

    // wyłącz transitiony na czas pomiaru
    const restore = [];
    const disableTransition = el => {
      if (!el) return;
      restore.push([el, el.style.transition]);
      el.style.transition = 'none';
    };

    tiles.forEach(t => { disableTransition(t); t.style.height = ''; }); // wyczyść height
    tiles.forEach(t => {
      disableTransition(t.querySelector('.tile-content'));
      disableTransition(t.querySelector('.tile-overlay'));
    });

    // policz maksymalną potrzebną wysokość (min. 250)
    let maxH = 250;
    tiles.forEach(tile => {
      const c = tile.querySelector('.tile-content');
      const o = tile.querySelector('.tile-overlay');
      const h = Math.max(c ? c.scrollHeight : 0, o ? o.scrollHeight : 0, 250);
      if (h > maxH) maxH = h;
    });

    // ustaw wszystkim taką samą
    tiles.forEach(t => t.style.height = maxH + 'px');

    // wymuś reflow i przywróć transitiony
    void document.body.offsetHeight;
    restore.forEach(([el, val]) => { if (el) el.style.transition = val || ''; });
  }

  // debounce na resize
  const debounced = (() => {
    let id;
    return () => { clearTimeout(id); id = setTimeout(equalizeTiles, 100); };
  })();

  document.addEventListener('DOMContentLoaded', equalizeTiles);
  window.addEventListener('load', equalizeTiles);
  window.addEventListener('resize', debounced);
})();

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('#primary-nav');

  if (!navbar || !toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // zamknij po kliknięciu w link
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      navbar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // zamknij przy zmianie rozmiaru > 768px
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      navbar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* Smooth scroll after cross-page navigation with hash (from sites.html to index.html) */
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      // Prevent default instantaneous jump to the element
      window.scrollTo(0, 0);
      setTimeout(() => {
        const NAV_OFFSET = 100; // adjust to your sticky navbar height
        const rect = target.getBoundingClientRect();
        const y = rect.top + window.pageYOffset - NAV_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 50);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero, .subpage-hero");
  
  if (navbar && hero) {
    const navHeight = navbar.offsetHeight;
    hero.style.marginTop = navHeight + "px";
  }
});