/**
 * Présentation avec navbar latérale - scroll et mise en surbrillance
 */
(function() {
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var content = document.querySelector('.presentation-content');
  var links = document.querySelectorAll('.sidebar-link');
  var sections = document.querySelectorAll('.presentation-section');

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (sidebar) sidebar.classList.remove('open');
  }

  function updateActiveLink() {
    var found = 1;
    var viewportTop = 150;
    sections.forEach(function(sec, i) {
      var rect = sec.getBoundingClientRect();
      if (rect.top <= viewportTop) found = i + 1;
    });
    links.forEach(function(a) {
      var num = parseInt(a.getAttribute('data-section'), 10);
      a.classList.toggle('active', num === found);
    });
  }

  function init() {
    links.forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        var href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          scrollToSection(href.slice(1));
          history.replaceState(null, '', href);
        }
      });
    });

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    var hash = window.location.hash;
    if (hash && hash.startsWith('#section-')) {
      setTimeout(function() {
        var el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }

    setTimeout(updateActiveLink, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
