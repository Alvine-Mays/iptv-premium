document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM chargé !");

  // Récupération de l'année pour le footer
  let yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Fonction pour défiler vers une section
  window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Gestion du modal de commande
  const orderModal = document.getElementById("orderModal");
  const planNameElement = document.getElementById("planName");
  const planPriceElement = document.getElementById("planPrice");

  if (orderModal && planNameElement && planPriceElement) {
    window.openOrderModal = function (planName, planPrice) {
      planNameElement.textContent = planName;
      planPriceElement.textContent = planPrice;
      orderModal.style.display = "flex";
    };

    window.closeOrderModal = function () {
      orderModal.style.display = "none";
    };

    // Fermer le modal si on clique en dehors
    orderModal.addEventListener("click", (event) => {
      if (event.target === orderModal) {
        closeOrderModal();
      }
    });
  } else {
    console.error(
      "❌ ERREUR : Le modal, planName ou planPrice est introuvable !"
    );
  }

  // Modal vidéo
  const orderMovie = document.getElementById("orderMovie");
  const demoVideo = document.getElementById("demoVideo");

  if (orderMovie && demoVideo) {
    window.openMovie = function () {
      orderMovie.style.display = "flex";
      demoVideo.play(); // Démarrer la vidéo quand on ouvre le modal
    };

    window.closeOrderMovie = function () {
      orderMovie.style.display = "none";
      demoVideo.pause(); // Mettre la vidéo en pause
      demoVideo.currentTime = 0; // Remettre à zéro
    };

    // Fermer le modal si on clique en dehors
    orderMovie.addEventListener("click", (event) => {
      if (event.target === orderMovie) {
        closeOrderMovie();
      }
    });
  } else {
    console.error("❌ ERREUR : La vidéo ou le modal est introuvable !");
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("📩 Message envoyé avec succès !");
      this.reset();
    });
  }

  // Gestion du formulaire de commande
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("✅ Commande validée !");
      closeOrderModal();
      this.reset();
    });
  }

  // Ajout aux favoris
  const favButtons = document.querySelectorAll(".fav-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
      this.textContent = this.classList.contains("active") ? "❤️" : "♥";
    });
  });

  // FAQ
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", function () {
      const parent = this.parentElement;
      const answer = this.nextElementSibling;
      const arrow = this.querySelector(".arrow");

      // Fermer toutes les autres questions ouvertes
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== parent) {
          item.classList.remove("active");
          item.querySelector(".faq-answer").style.display = "none";
        }
      });

      // Alterner l'affichage et rotation de la flèche
      if (parent.classList.contains("active")) {
        parent.classList.remove("active");
        answer.style.display = "none";
      } else {
        parent.classList.add("active");
        answer.style.display = "block";
      }
    });
  });

  // Fonction pour envoyer la commande via WhatsApp
  window.sendToWhatsApp = function () {
    if (!planNameElement || !planPriceElement) {
      console.error("❌ ERREUR : Élément introuvable !");
      return;
    }

    let selectedPlan = planNameElement.textContent.trim();
    let planPrice = planPriceElement.textContent.trim();
    let phoneNumber = "242067177729"; // Remplace avec ton numéro WhatsApp
    let message = encodeURIComponent(
      `Bonjour Mr,\n\nJe souhaite commander le plan : *${selectedPlan} (${planPrice}).*\nMerci de me donner plus d'informations.\n\nCordialement.`
    );

    let url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log("🔗 URL WhatsApp:", url);
    window.open(url, "_blank");

    closeOrderModal();
  };

  // Fonction pour envoyer la commande en Message Privé (Mail)
  window.sendToMessage = function () {
    if (!planNameElement || !planPriceElement) {
      console.error("❌ ERREUR : Élément introuvable !");
      return;
    }

    let selectedPlan = planNameElement.textContent.trim();
    let planPrice = planPriceElement.textContent.trim();
    let email = "contact@tonsite.com"; // Remplace par ton email
    let subject = encodeURIComponent("Commande de plan");
    let body = encodeURIComponent(
      `Bonjour Mr,\n\nJe souhaite commander le plan : ${selectedPlan} (${planPrice}).\nMerci de me donner plus d'informations.\n\nCordialement.`
    );

    let mailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    console.log("📩 URL Email:", mailUrl);
    window.open(mailUrl);

    closeOrderModal();
  };
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("userName").value.trim();
    let userMessage = document.getElementById("userMessage").value.trim();

    if (userName === "" || userMessage === "") {
      alert("❌ Veuillez remplir tous les champs !");
      return;
    }

    let phoneNumber = "242067177729"; // Ton numéro WhatsApp
    let message = encodeURIComponent(
      `Nom : ${userName}\nMessage :\n${userMessage}`
    );

    let url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log("🔗 URL WhatsApp:", url);
    window.open(url, "_blank");

    this.reset(); // Réinitialiser le formulaire après l'envoi
  });
 
