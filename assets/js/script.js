document.addEventListener('DOMContentLoaded', function() {
  // Initialisation
  initHeader();
  initModals();
  initFAQ();
  initContactForm();
  initTabs();
  updateYear();
  startCountdown();
  
  // Animation au scroll
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
});

// Gestion du header
function initHeader() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  let lastScroll = 0;
  
  // Menu mobile
  mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
  });
  
  mobileMenuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
  });
  
  mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  });
  
  // Fermer le menu quand un lien est cliqué
  document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
      });
  });
  
  // Sticky header au scroll
  window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
          header.classList.remove('scroll-up');
          return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
          header.classList.remove('scroll-up');
          header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
          header.classList.remove('scroll-down');
          header.classList.add('scroll-up');
      }
      
      lastScroll = currentScroll;
  });
}

// Gestion des modals
function initModals() {
  // Variables globales
  const demoVideo = document.querySelector('#demoModal video');
  
  // Fonctions globales
  window.openModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
  };
  
  window.closeModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
      }
  };
  
  // Fermer les modals en cliquant à l'extérieur
  document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
          if (e.target === modal) {
              closeModal(modal.id);
              // Arrêter la vidéo si c'est le modal de démo
              if (modal.id === 'demoModal' && demoVideo) {
                  demoVideo.pause();
                  demoVideo.currentTime = 0;
              }
          }
      });
  });
  
  // Modal de commande
  const orderButtons = document.querySelectorAll('[onclick^="openOrderModal"]');
  orderButtons.forEach(button => {
      button.addEventListener('click', function() {
          const planName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
          const planPrice = this.getAttribute('onclick').match(/'([^']+)'/)[3];
          
          document.getElementById('planName').textContent = planName;
          document.getElementById('planPrice').textContent = planPrice;
          
          openModal('orderModal');
      });
  });
  
  // Modal d'offre spéciale
  const specialOfferBtn = document.querySelector('[onclick="openSpecialOfferModal()"]');
  if (specialOfferBtn) {
      specialOfferBtn.addEventListener('click', function() {
          openModal('specialOfferModal');
      });
  }
  
  // Modal de démo
  const demoBtn = document.querySelector('[href="#demo"]');
  if (demoBtn) {
      demoBtn.addEventListener('click', function(e) {
          e.preventDefault();
          openModal('demoModal');
          if (demoVideo) {
              demoVideo.play();
          }
      });
  }
  
  // Méthodes de paiement
  const paymentOptions = document.querySelectorAll('.payment-option');
  paymentOptions.forEach(option => {
      option.addEventListener('click', function() {
          paymentOptions.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
      });
  });
  
  // Fermeture du modal de démo
  const demoModalClose = document.querySelector('#demoModal .modal-close');
  if (demoModalClose && demoVideo) {
      demoModalClose.addEventListener('click', function() {
          demoVideo.pause();
          demoVideo.currentTime = 0;
      });
  }
}

// Gestion de la FAQ
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
          // Fermer les autres items
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  otherItem.classList.remove('active');
              }
          });
          
          // Basculer l'item courant
          item.classList.toggle('active');
      });
  });
}

// Gestion du formulaire de contact
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const name = document.getElementById('name').value.trim();
          const email = document.getElementById('email').value.trim();
          const message = document.getElementById('message').value.trim();
          
          if (!name || !email || !message) {
              alert('Veuillez remplir tous les champs du formulaire.');
              return;
          }
          
          // Envoyer le message via WhatsApp
          const phoneNumber = "242067177729";
          const whatsappMessage = `Nouveau message de ${name} (${email}):\n\n${message}`;
          const encodedMessage = encodeURIComponent(whatsappMessage);
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
          
          window.open(whatsappUrl, '_blank');
          this.reset();
          
          // Feedback utilisateur
          alert('Merci pour votre message ! Vous allez être redirigé vers WhatsApp.');
      });
  }
}

// Gestion des onglets
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          
          // Mettre à jour les boutons
          tabButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Mettre à jour les panels
          tabPanels.forEach(panel => panel.classList.remove('active'));
          document.getElementById(category).classList.add('active');
      });
  });
}

// Mettre à jour l'année dans le footer
function updateYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

// Compte à rebours pour l'offre spéciale
function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;
  
  let hours = 24;
  let minutes = 59;
  let seconds = 59;
  
  const timer = setInterval(() => {
      if (seconds === 0) {
          if (minutes === 0) {
              if (hours === 0) {
                  clearInterval(timer);
                  countdownElement.textContent = "00:00:00";
                  return;
              }
              hours--;
              minutes = 59;
          } else {
              minutes--;
          }
          seconds = 59;
      } else {
          seconds--;
      }
      
      countdownElement.textContent = 
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Animation des éléments au scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  
  elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
          element.classList.add('animated');
      }
  });
}

// Fonctions de commande
window.sendToWhatsApp = function() {
  const planName = document.getElementById('planName').textContent;
  const planPrice = document.getElementById('planPrice').textContent;
  const selectedPayment = document.querySelector('.payment-option.selected')?.dataset?.method || 'non spécifiée';
  
  const phoneNumber = "242067177729";
  const message = `Bonjour,\n\nJe souhaite commander : *${planName} (${planPrice})*\n` +
                 `Méthode de paiement préférée : ${selectedPayment}\n\n` +
                 `Merci de me fournir les instructions de paiement.\n\nCordialement.`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
  closeModal('orderModal');
  closeModal('specialOfferModal'); // Fermer aussi l'offre spéciale si ouverte
};

window.sendToEmail = function() {
  const planName = document.getElementById('planName').textContent;
  const planPrice = document.getElementById('planPrice').textContent;
  const selectedPayment = document.querySelector('.payment-option.selected')?.dataset?.method || 'non spécifiée';
  
  const email = "contact@iptvpremium.com";
  const subject = encodeURIComponent(`Commande IPTV : ${planName}`);
  const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite commander : ${planName} (${planPrice})\n` +
      `Méthode de paiement préférée : ${selectedPayment}\n\n` +
      `Merci de me fournir les instructions de paiement.\n\nCordialement.`
  );
  const mailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
  
  window.location.href = mailUrl;
  closeModal('orderModal');
  closeModal('specialOfferModal'); // Fermer aussi l'offre spéciale si ouverte
};

// Gestion spéciale pour l'offre promotionnelle
window.openSpecialOfferModal = function() {
  closeModal('orderModal'); // Fermer le modal de commande si ouvert
  openModal('specialOfferModal');
};

// Sélection d'une offre spéciale
window.selectSpecialOffer = function(planName, planPrice) {
  document.getElementById('planName').textContent = planName;
  document.getElementById('planPrice').textContent = planPrice;
  closeModal('specialOfferModal');
  openModal('orderModal');
};

// Selection d'une offre
window.selectOffer = function(planName, planPrice) {
  document.getElementById('planName').textContent = planName;
  document.getElementById('planPrice').textContent = planPrice; 
  openModal('orderModal');
};
