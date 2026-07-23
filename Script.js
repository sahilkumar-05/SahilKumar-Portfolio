document.addEventListener('DOMContentLoaded', function(){
  // Splash screen
  // Serve separate desktop/mobile images for project screenshots (no <picture> tag needed)
  var mobileMQ = window.matchMedia('(max-width:820px)');
  var projImgs = document.querySelectorAll('.proj-front-media img[data-desktop]');

  function applyResponsiveSrc(){
    var useMobile = mobileMQ.matches;
    projImgs.forEach(function(img){
      var desired = useMobile ? img.dataset.mobile : img.dataset.desktop;
      if(!desired || img.getAttribute('src') === desired) return;
      // If a mobile image doesn't exist, fall back to desktop on error
      img.onerror = function(){
        if(img.getAttribute('src') !== img.dataset.desktop){
          img.src = img.dataset.desktop;
        } else {
          img.classList.add('img-missing');
        }
      };
      img.src = desired;
    });
  }

  applyResponsiveSrc();
  if(mobileMQ.addEventListener){ mobileMQ.addEventListener('change', applyResponsiveSrc); }
  else if(mobileMQ.addListener){ mobileMQ.addListener(applyResponsiveSrc); } // older Safari

  // Add blurred backdrop for project images (fixes mobile cropping)
document.querySelectorAll('.proj-front-media').forEach(function(media){
  var img = media.querySelector('img');
  if(!img) return;
  var bg = document.createElement('div');
  bg.className = 'media-bg';
  function setBg(){ bg.style.backgroundImage = 'url("' + img.src + '")'; }
  if(img.complete) setBg(); else img.addEventListener('load', setBg);
  media.insertBefore(bg, img);
  img.addEventListener('load', setBg); // keep backdrop in sync when src swaps (mobile/desktop)
});
  var splash = document.getElementById('splash');
  setTimeout(function(){
    splash.classList.add('hide');
    document.body.classList.remove('locked');
  }, 1700);
  splash.addEventListener('click', function(){
    splash.classList.add('hide');
    document.body.classList.remove('locked');
  });

  // Theme toggle (dark / light)
  var htmlEl = document.documentElement;
  var themeBtns = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')].filter(Boolean);
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(prefersDark){ htmlEl.setAttribute('data-theme', 'dark'); }
  function toggleTheme(){
    var isDark = htmlEl.getAttribute('data-theme') === 'dark';
    htmlEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
  }
  themeBtns.forEach(function(b){ b.addEventListener('click', toggleTheme); });

  // Hamburger menu
  var btn = document.getElementById('hamburgerBtn');
  var menu = document.getElementById('mobileMenu');
  var mobileLinks = document.querySelectorAll('.mobile-link, .mobile-menu .btn');

  btn.addEventListener('click', function(){
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(function(link){
    link.addEventListener('click', function(){
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Contact form -> FormSubmit (sends email directly, no mail client popup)
  var submitBtn = document.getElementById('submitContact');
  if(submitBtn){
    var originalBtnText = submitBtn.textContent;
    submitBtn.addEventListener('click', function(){
      var nameField = document.getElementById('c-name');
      var emailField = document.getElementById('c-email');
      var subjectField = document.getElementById('c-subject');
      var messageField = document.getElementById('c-message');

      var name = (nameField.value || '').trim();
      var email = (emailField.value || '').trim();
      var subjectVal = (subjectField.value || '').trim();
      var message = (messageField.value || '').trim();

      if(!name || !email || !message){
        alert('Please fill in your name, email, and message before sending.');
        return;
      }

      var subject = subjectVal || 'Portfolio Contact — ' + name;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch('https://formsubmit.co/ajax/heresahil294@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _template: 'table'
        })
      })
      .then(function(res){ return res.json(); })
      .then(function(){
        submitBtn.textContent = 'Message Sent ✓';
        nameField.value = '';
        emailField.value = '';
        subjectField.value = '';
        messageField.value = '';
        setTimeout(function(){
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }, 3500);
      })
      .catch(function(){
        alert('Something went wrong sending your message. Please try again or email heresahil294@gmail.com directly.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
    });
  }

  // Scroll-to-top button
  var scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 500){ scrollBtn.classList.add('show'); }
    else{ scrollBtn.classList.remove('show'); }
  });
  scrollBtn.addEventListener('click', function(){
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', function(){
    var current = '';
    sections.forEach(function(sec){
      var rect = sec.getBoundingClientRect();
      if(rect.top <= 120 && rect.bottom >= 120){ current = sec.id; }
    });
    navLinks.forEach(function(link){
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // Typing animation in hero code card
  var codeEl = document.getElementById('typedCode');
  var lines = [
    {t:'const <span class="prop">developer</span> = {'},
    {t:'&nbsp;&nbsp;name: <span class="str">"Sahil Kumar"</span>,'},
    {t:'&nbsp;&nbsp;role: <span class="str">"WEB | APP Developer"</span>,'},
    {t:'&nbsp;&nbsp;based_in: <span class="str">"Karachi, PK"</span>,'},
    {t:'&nbsp;&nbsp;stack: [<span class="str">"React"</span>, <span class="str">"Node.js"</span>,'},
    {t:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"ASP.NET"</span>, <span class="str">"PostgreSQL"</span>],'},
    {t:'&nbsp;&nbsp;<span class="fn">status</span>: <span class="str">"open to internships"</span>'},
    {t:'};'}
  ];
  var idx = 0;
  function typeNextLine(){
    if(idx >= lines.length){
      codeEl.innerHTML += '<div><span class="cur"></span></div>';
      return;
    }
    var lineNum = idx + 1;
    var div = document.createElement('div');
    div.innerHTML = '<span class="ln">' + lineNum + '</span><span class="txt"></span>';
    codeEl.appendChild(div);
    var txtSpan = div.querySelector('.txt');
    var full = lines[idx].t;
    var plain = full.replace(/<[^>]*>/g, '');
    var visibleLen = 0;
    var speed = Math.max(8, Math.min(20, 700 / plain.length));
    var timer = setInterval(function(){
      visibleLen++;
      if(visibleLen >= plain.length){
        clearInterval(timer);
        txtSpan.innerHTML = full;
        idx++;
        setTimeout(typeNextLine, 120);
      } else {
        txtSpan.textContent = plain.substring(0, visibleLen);
      }
    }, speed);
  }
  setTimeout(typeNextLine, 1900);

  // Project flip cards (event delegation so clicks always register, even after layout changes)
  document.addEventListener('click', function(e){
    var detailsBtn = e.target.closest('.proj-details-btn');
    if(detailsBtn){
      e.preventDefault();
      e.stopPropagation();
      var card = detailsBtn.closest('.proj-card');
      if(card) card.classList.add('flipped');
      return;
    }
    var backBtn = e.target.closest('.proj-back-btn');
    if(backBtn){
      e.preventDefault();
      e.stopPropagation();
      var card2 = backBtn.closest('.proj-card');
      if(card2) card2.classList.remove('flipped');
      return;
    }
  });

  // Experience slider controls
  var expSlider = document.getElementById('expSlider');
  var expPrev = document.getElementById('expPrev');
  var expNext = document.getElementById('expNext');
  if(expSlider && expPrev && expNext){
    function cardStep(){
      var card = expSlider.querySelector('.exp-card');
      var gap = 22;
      return card ? card.offsetWidth + gap : 330;
    }
    expPrev.addEventListener('click', function(){
      expSlider.scrollBy({ left: -cardStep(), behavior: 'smooth' });
    });
    expNext.addEventListener('click', function(){
      expSlider.scrollBy({ left: cardStep(), behavior: 'smooth' });
    });
  }

  // About photo slideshow (auto-changing)
  var slideshow = document.getElementById('aboutSlideshow');
  if(slideshow){
    var slides = slideshow.querySelectorAll('.slide');
    var dots = slideshow.querySelectorAll('.slide-dots span');
    var current = 0;
    if(slides.length > 1){
      setInterval(function(){
        slides[current].classList.remove('active');
        if(dots[current]) dots[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
        if(dots[current]) dots[current].classList.add('active');
      }, 3500);
    }
  }
});

// Projects: progressive "View More" reveal
(function(){
  var outer = document.getElementById('projGridOuter');
  var grid = document.getElementById('projGrid');
  var fade = document.getElementById('projFade');
  var moreWrap = document.getElementById('projMoreWrap');
  var btn = document.getElementById('projViewMoreBtn');
  if(!outer || !grid || !btn) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.proj-card'));
  var visibleCount = 2;   // full cards shown at start

  function updateHeight(){
    if(visibleCount >= cards.length){
      outer.style.maxHeight = grid.scrollHeight + 'px';
      if(fade) fade.style.opacity = '0';
      moreWrap.style.display = 'none';
      return;
    }
    var gridRect = grid.getBoundingClientRect();
    var lastVisible = cards[visibleCount - 1];
    var nextCard = cards[visibleCount];
    var rect = lastVisible.getBoundingClientRect();
    var nextRect = nextCard.getBoundingClientRect();
    var peek = nextRect.height * 0.5; // show roughly half of the next card as a peek
    var height = (rect.bottom - gridRect.top) + peek;
    outer.style.maxHeight = height + 'px';
    if(fade){
      fade.style.height = Math.max(peek, 60) + 'px';
      fade.style.opacity = '1';
    }
    moreWrap.style.display = 'flex';
  }

  btn.addEventListener('click', function(){
    visibleCount++;
    updateHeight();
    if(visibleCount >= cards.length){
      btn.textContent = 'All Projects Shown';
      setTimeout(function(){ moreWrap.style.display = 'none'; }, 500);
    }
  });

  window.addEventListener('resize', updateHeight);
  window.addEventListener('load', updateHeight);
  setTimeout(updateHeight, 60);
})();

// Scroll-reveal
(function(){
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function(el){ el.classList.add('in-view'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ obs.observe(el); });
})();
