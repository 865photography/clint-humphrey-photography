/* Clint Humphrey Photography — shared app logic (redesign). */

(function () {
  'use strict';

  /* ---------- data helpers (never render an empty collection) ---------- */

  function productsIn(slug) {
    return CHP.order
      .map(function (id) { return [id, CHP.products[id]]; })
      .filter(function (pair) { return pair[1].collection === slug; });
  }

  function countIn(slug) {
    return productsIn(slug).length;
  }

  function populatedCollections() {
    return Object.keys(CHP.collections).filter(function (slug) {
      return countIn(slug) > 0;
    });
  }

  function populatedGroups() {
    return CHP.groups.filter(function (g) {
      return g.collections.some(function (slug) { return countIn(slug) > 0; });
    });
  }

  function fromPrice(p) {
    return Math.min.apply(null, p.options.map(function (o) { return o.price; }));
  }

  function money(n) {
    return '$' + n.toLocaleString('en-US');
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- gallery grid ---------- */

  function cardHTML(id, p) {
    return (
      '<a class="card" href="photo.html?id=' + encodeURIComponent(id) + '">' +
      '<img loading="lazy" src="' + esc(p.image) + '" alt="' + esc(p.title) + '">' +
      '<div class="meta"><strong>' + esc(p.title) + '</strong>' +
      '<span>from ' + money(fromPrice(p)) + ' &middot; ' + p.options.length + ' sizes</span></div>' +
      '</a>'
    );
  }

  function renderGrid(el, pairs) {
    el.innerHTML = pairs.map(function (pair) { return cardHTML(pair[0], pair[1]); }).join('');
  }

  /* ---------- lightbox ---------- */

  var lb = null; // {pairs, index}

  function ensureLightbox() {
    var el = document.getElementById('lightbox');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'lightbox';
    el.className = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Photo viewer');
    el.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close viewer">&times;</button>' +
      '<button class="lb-btn lb-full" aria-label="Toggle fullscreen">' +
      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
      '<path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4"/></svg></button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo">&#x2039;</button>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">&#x203A;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<div class="lb-count" aria-hidden="true"></div>';
    document.body.appendChild(el);

    el.querySelector('.lb-close').addEventListener('click', closeLightbox);
    el.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); stepLightbox(-1); });
    el.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); stepLightbox(1); });
    el.querySelector('.lb-full').addEventListener('click', function (e) { e.stopPropagation(); toggleFullscreen(el); });
    el.addEventListener('click', function (e) { if (e.target === el) closeLightbox(); });

    var startX = null;
    el.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 48) stepLightbox(dx < 0 ? 1 : -1);
      startX = null;
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
      if (!el.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
    });
    return el;
  }

  function paintLightbox() {
    var el = ensureLightbox();
    var pair = lb.pairs[lb.index];
    var img = el.querySelector('img');
    img.src = pair[1].image;
    img.alt = pair[1].title;
    el.querySelector('figcaption').textContent = pair[1].title;
    el.querySelector('.lb-count').textContent = (lb.index + 1) + ' / ' + lb.pairs.length;
  }

  function openLightbox(pairs, index) {
    if (!pairs.length) return;
    lb = { pairs: pairs, index: Math.max(0, Math.min(index, pairs.length - 1)) };
    var el = ensureLightbox();
    paintLightbox();
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    el.querySelector('.lb-close').focus();
  }

  function closeLightbox() {
    var el = document.getElementById('lightbox');
    if (el) el.classList.remove('open');
    document.body.style.overflow = '';
    lb = null;
  }

  function stepLightbox(dir) {
    if (!lb) return;
    lb.index = (lb.index + dir + lb.pairs.length) % lb.pairs.length;
    paintLightbox();
  }

  function toggleFullscreen(el) {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(function () {});
    }
  }

  function groupSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function groupBySlug(slug) {
    return CHP.groups.find(function (g) { return groupSlug(g.name) === slug; });
  }

  /* ---------- nav active state ---------- */

  function markNav() {
    var page = (location.pathname.split('/').pop() || 'index.html').split('?')[0];
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* ---------- exports ---------- */

  window.CHPApp = {
    productsIn: productsIn,
    countIn: countIn,
    populatedCollections: populatedCollections,
    populatedGroups: populatedGroups,
    fromPrice: fromPrice,
    money: money,
    esc: esc,
    cardHTML: cardHTML,
    renderGrid: renderGrid,
    openLightbox: openLightbox,
    closeLightbox: closeLightbox,
    groupSlug: groupSlug,
    groupBySlug: groupBySlug,
    markNav: markNav
  };

  document.addEventListener('DOMContentLoaded', markNav);
})();
