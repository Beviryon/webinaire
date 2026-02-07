/**
 * Navigation clavier + indicateur de slide pour les présentations Trevixia
 */
(function() {
  const slides = [
    'slide1.html', 'slide2.html', 'slide3.html', 'slide4.html', 'slide5.html',
    'slide6.html', 'slide7.html', 'slide8.html', 'slide9.html'
  ];

  function getCurrentSlideIndex() {
    const path = window.location.pathname;
    const match = path.match(/slide(\d+)\.html/);
    return match ? parseInt(match[1], 10) - 1 : -1;
  }

  function getPrevSlide() {
    const idx = getCurrentSlideIndex();
    if (idx <= 0) return null;
    return slides[idx - 1];
  }

  function getNextSlide() {
    const idx = getCurrentSlideIndex();
    if (idx < 0 || idx >= slides.length - 1) return null;
    return slides[idx + 1];
  }

  function navigate(handler) {
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key;
      if (key === 'ArrowLeft') {
        const prev = getPrevSlide();
        if (prev) { e.preventDefault(); window.location.href = prev; }
      } else if (key === 'ArrowRight') {
        const next = getNextSlide();
        if (next) { e.preventDefault(); window.location.href = next; }
      } else if (key === ' ') {
        e.preventDefault();
        const next = getNextSlide() || getPrevSlide();
        if (next) window.location.href = next;
      }
    });
  }

  function addSlideIndicator() {
    const idx = getCurrentSlideIndex();
    if (idx < 0) return;

    const indicator = document.createElement('div');
    indicator.className = 'slide-indicator';
    indicator.innerHTML = '<span class="slide-indicator-text">' + (idx + 1) + ' / ' + slides.length + '</span>';
    indicator.style.cssText = 'position:fixed;bottom:1rem;right:1rem;background:rgba(30,41,59,0.9);color:white;padding:0.5rem 1rem;border-radius:9999px;font-size:0.85rem;font-weight:600;z-index:9998;font-family:Montserrat,sans-serif;';
    document.body.appendChild(indicator);
  }

  if (getCurrentSlideIndex() >= 0) {
    navigate();
    addSlideIndicator();
  }
})();
