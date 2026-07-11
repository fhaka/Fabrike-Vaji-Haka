// Fabrika e Vajit Haka — interactions
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  // Header background on scroll
  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  function closeNav() {
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  // Reveal-on-scroll
  var revealTargets = document.querySelectorAll(
    '.about-grid, .product-card, .process-steps li, .step-card, .g-item, .contact-card, .section-head, .trust-grid div, .section-cta'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  /* =====================================================================
     PROCESI — hapat e prodhimit (seksioni "Procesi").
     Riorganizo/shto/hiq hapat vetëm duke ndryshuar listën. Numri i hapit
     (01, 02...) caktohet automatikisht sipas renditjes.
  ===================================================================== */
  var processSteps = [
    { src: 'assets/video/1stTransportStep.mp4', title: 'Transporti', desc: 'Ullinjtë e mbledhur transportohen menjëherë në fabrikë për përpunim brenda ditës.' },
    { src: 'assets/video/1stStep.mp4',          title: 'Depozitimi i Ullinjve', desc: 'Ullinjte depozitohen ne makinerine e posaçme' },
    { src: 'assets/video/2ndStep.mp4',          title: 'Pranimi & Larja', desc: 'Ullinjtë shkarkohen, pastrohen nga gjethet dhe lahen me kujdes para përpunimit.' },
    { src: 'assets/video/4thStep.mp4',          title: 'Pastrimi & Bluarja', desc: 'Ullinjtë bluhen dhe vaji ndahet me shtrydhje të ftohtë, pa nxehtësi e pa kimikate.' },
    { src: 'assets/video/5thStep.mp4',          title: 'Ndarja & Perpunimi', desc: 'Vaji perpunohet ne makinerite e posaçme, e ndarë në mënyrë që çdo klient të jetë i respektuar në radhën që i takon' },
    { src: 'assets/video/productOil.mp4',       title: 'Perfundimi', desc: 'Vaj ulliri ekstra i virgjër, gati për tavolinën tuaj.' },
    { src: 'assets/video/fillingStep.mp4',      title: 'Mbushja', desc: 'Vaji i freskët filtrohet natyrshëm dhe mbushet në shishe e bidona.' },
    { src: 'assets/img/vaji-shishe.jpeg',       title: 'Produkti final', desc: 'Vaji i ullirit ekstra i virgjër në një pamje ideale'}
  ];
    
  // Cakto tipin automatikisht sipas prapashtesës (foto ose video)
  processSteps.forEach(function (s) {
    s.type = /\.(jpe?g|png|webp|gif)$/i.test(s.src) ? 'image' : 'video';
  });

  /* =====================================================================
     GALERIA — foto & video nga fabrika (renditje e lirë).
     type: 'image' ose 'video'. big: true = tesserë e madhe (theksim).
  ===================================================================== */
  var galleryMedia = [
    { type: 'image', src: 'assets/img/fabrikaDron.jpeg',    alt: 'Fabrika e filmuar me dron' },
    { type: 'image', src: 'assets/img/fabrikaInside.jpeg',    alt: 'Pamje e brendshme e fabrikes' },
    { type: 'image', src: 'assets/img/fabrikaInside3.jpeg',    alt: 'Pamje e brendshme e fabrikes 2' },
    { type: 'video', src: 'assets/video/fabrikaInsideSector1.mp4',    alt: 'Pamje nga sektori 2 ' },
    { type: 'video', src: 'assets/video/fabrikaInsideSector2.mp4',    alt: 'Pamje te depozitave' },
    { type: 'video', src: 'assets/video/fabrikaOutside.mp4',    alt: 'Transporti i ullinjve' },
  ];

  var videoBadge = '<span class="play-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';

  /* ---- Lightbox (i përbashkët për të dyja seksionet) ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbStage = document.getElementById('lbStage');
    var lbItems = [];
    var current = 0;

    function renderStage() {
      var item = lbItems[current];
      lbStage.innerHTML = '';
      var el;
      if (item.type === 'video') {
        el = document.createElement('video');
        el.src = item.src;
        el.controls = true;
        el.autoplay = true;
        el.playsInline = true;
        el.setAttribute('controlslist', 'nodownload');
      } else {
        el = document.createElement('img');
        el.src = item.src;
        el.alt = item.title || item.alt || '';
      }
      lbStage.appendChild(el);
    }
    function openLightbox(items, i) {
      lbItems = items;
      current = i;
      renderStage();
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
    }
    function closeLightbox() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
      lbStage.innerHTML = ''; // ndalon videon
    }
    function step(dir) {
      current = (current + dir + lbItems.length) % lbItems.length;
      renderStage();
    }

    document.getElementById('lbClose').addEventListener('click', closeLightbox);
    document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
    document.getElementById('lbNext').addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    // ---- Ndërto kartat e Procesit (të gjitha njësoj, të numëruara) ----
    var processGrid = document.getElementById('processGrid');
    if (processGrid) {
      processSteps.forEach(function (item, i) {
        var num = ('0' + (i + 1)).slice(-2);
        var card = document.createElement('article');
        card.className = 'step-card';
        var media = item.type === 'image'
          ? '<img src="' + item.src + '" alt="' + item.title + '" loading="lazy">'
          : '<video muted playsinline preload="metadata" src="' + item.src + '#t=0.5"></video>' + videoBadge;
        card.innerHTML =
          '<button class="step-media" type="button" aria-label="Hap: Hapi ' + num + ' — ' + item.title + '">' +
            media +
            '<span class="step-index">' + num + '</span>' +
          '</button>' +
          '<div class="step-info"><h3>' + item.title + '</h3><p>' + item.desc + '</p></div>';
        card.querySelector('.step-media').addEventListener('click', function () { openLightbox(processSteps, i); });
        processGrid.appendChild(card);
      });
    }

    // ---- Ndërto tesserat e Galerisë (foto & video) ----
    var galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
      galleryMedia.forEach(function (item, i) {
        var fig = document.createElement('figure');
        fig.className = 'g-item' + (item.big ? ' g-big' : '') + (item.type === 'video' ? ' g-video' : '');
        fig.setAttribute('tabindex', '0');
        fig.setAttribute('role', 'button');
        fig.setAttribute('aria-label', (item.alt || 'Media') + ' — hap');
        if (item.type === 'video') {
          fig.innerHTML = '<video muted playsinline preload="metadata" src="' + item.src + '#t=0.5"></video>' + videoBadge;
        } else {
          fig.innerHTML = '<img src="' + item.src + '" alt="' + (item.alt || '') + '" loading="lazy">';
        }
        fig.addEventListener('click', function () { openLightbox(galleryMedia, i); });
        fig.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(galleryMedia, i); }
        });
        galleryGrid.appendChild(fig);
      });
    }
  }

  // Current year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
