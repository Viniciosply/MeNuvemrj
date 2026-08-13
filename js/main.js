/* ==========================================================================
   Menuvem.RJ - Main JavaScript (UI, Navigation, Scroll, Modals, FAQ)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Smooth Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 3. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const drawerOverlay = document.createElement('div');
  drawerOverlay.className = 'drawer-overlay';
  document.body.appendChild(drawerOverlay);

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      drawerOverlay.classList.toggle('active');
    });

    drawerOverlay.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
    });

    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
      });
    });
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Registration Modal Multi-Step Logic
  const signupModal = document.getElementById('signup-modal');
  const openModalBtns = document.querySelectorAll('.btn-signup-open');
  const closeModalBtn = document.querySelector('.modal-close');
  const signupForm = document.getElementById('signup-form');

  if (signupModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.add('active');
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        signupModal.classList.remove('active');
      });
    }

    signupModal.addEventListener('click', (e) => {
      if (e.target === signupModal) {
        signupModal.classList.remove('active');
      }
    });

    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const storeName = document.getElementById('input-store-name').value;
        const city = document.getElementById('input-city').value;
        const whatsapp = document.getElementById('input-whatsapp').value;

        if (!storeName || !whatsapp) {
          alert('Por favor, preencha o nome do estabelecimento e seu WhatsApp.');
          return;
        }

        // Formatted WhatsApp message redirection for RJ support
        const text = encodeURIComponent(
          `Olá! Acabei de me cadastrar no Menuvem.RJ!\n\n` +
          `*Nome da Loja:* ${storeName}\n` +
          `*Cidade/Bairro:* ${city || 'Rio de Janeiro'}\n` +
          `*WhatsApp:* ${whatsapp}\n\n` +
          `Gostaria de ativar meus *30 Dias Grátis* e solicitar a montagem do meu cardápio!`
        );

        window.open(`https://wa.me/5521999998888?text=${text}`, '_blank');
        signupModal.classList.remove('active');
      });
    }
  }
});
