document.addEventListener('DOMContentLoaded', () => {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const toggleBtn = document.querySelector('.toggle-btn');
  let toggleBtnClickCount = 0;

  // Close dropdown when a nav link is clicked
  const navLinks = document.querySelectorAll('.dropdown-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDropdown();
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInside = dropdownMenu.contains(e.target) || toggleBtn.contains(e.target);
    if (!isClickInside && !dropdownMenu.classList.contains('hidden')) {
      closeDropdown();
    }
  });

  // Reuse your show/hide logic in a function
  function closeDropdown() {
    toggleBtn.classList.remove('opened');
    dropdownMenu.classList.replace('opacity-100', 'opacity-0');
    dropdownMenu.addEventListener('transitionend', () => {
      dropdownMenu.classList.add('hidden');
    }, { once: true });
  }

  function enableWobbler() {
    const userInput = prompt("Enter class name:");
    if (userInput == "wigglywobble") {
      document.body.classList.add('wigglywobble');
    }
  }

  function toggleDropdown() {
    toggleBtn.classList.toggle('opened');
    if (dropdownMenu.classList.contains('hidden')) {
      dropdownMenu.classList.remove('hidden');
      requestAnimationFrame(() => {
        dropdownMenu.classList.replace('opacity-0', 'opacity-100');
      });
    } else {
      dropdownMenu.classList.replace('opacity-100', 'opacity-0');
      dropdownMenu.addEventListener('transitionend', () => {
        dropdownMenu.classList.add('hidden');
      }, { once: true });
    }
    toggleBtnClickCount++;
    if (toggleBtnClickCount == 50) enableWobbler();
  }

  toggleBtn.addEventListener('click', toggleDropdown);

  function setActiveLink(id) {
    if (!id) return;
    // remove active from all li.nav-links
    document.querySelectorAll('.nav-links').forEach(li => li.classList.remove('active'));

    const anchors = document.querySelectorAll(`a[href="#${id}"]`);

    anchors.forEach(a => {
      const li = a.closest('.nav-links');
      if (li) li.classList.add('active');
    });
  }

  function getObserverOptions() {
  if (window.innerWidth <= 768) {
    // Mobile & tablets
    return { threshold: 0.2 };
  } else {
    // Desktop
    return { threshold: 0.6 };
  }
}

let observerOptions = getObserverOptions();

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        window.history.replaceState(null, null, `#${id}`);
        setActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Handle special case when at the very top (home)
  function handleHomeLink() {
    if (window.scrollY === 0) {
      window.history.replaceState(null, null, '#home');
      setActiveLink('home');
    }
  }

  // initial activation (on load)
  const initialHash = location.hash ? location.hash.replace('#', '') : 'home';
  setActiveLink(initialHash);
  handleHomeLink();

  // header scrolled class (you already had this)
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    handleHomeLink();

    // close dropdown on scroll
    if (!dropdownMenu.classList.contains('hidden')) {
      closeDropdown();
    }
  });

  // wobbler on pc
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      enableWobbler();
    }
  });

  console.log("Ctrl + Shift + K -> wigglywobble");
  console.log("do it :)");

  const wobblemobile = document.querySelector('.wobblemobile');
  const wobbleRng = Math.floor(Math.random() * (67 + 1)); // SIX SEVENNNNNNNNNNN
  if (wobbleRng === 67) {
    wobblemobile.classList.remove("hidden");
    wobblemobile.classList.add("flex");
  }

  const cards = document.querySelectorAll('.card');
  const overlay = document.getElementById('overlay');

  cards.forEach(card => {
    const cover = card.querySelector('.cover');

    card.addEventListener('click', () => {
      const isFullscreen = card.classList.contains('fullscreen');

      // Reset all cards
      cards.forEach(c => {
        c.classList.remove('fullscreen');
        c.querySelector('.cover').classList.remove('card-flipped');
      });
      overlay.classList.add('opacity-0', 'pointer-events-none');

      if (!isFullscreen) {
        // Open this card
        card.classList.add('fullscreen');
        cover.classList.add('card-flipped');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
      }
    });
  });

  // Close when clicking overlay
  overlay.addEventListener('click', () => {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    cards.forEach(c => {
      c.classList.remove('fullscreen');
      c.querySelector('.cover').classList.remove('card-flipped');
    });
  });
});