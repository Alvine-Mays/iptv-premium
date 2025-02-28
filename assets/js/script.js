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
        console.error("❌ ERREUR : Le modal, planName ou planPrice est introuvable !");
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

    // Fonction pour envoyer la commande via WhatsApp
    window.sendToWhatsApp = function () {
        if (!planNameElement || !planPriceElement) {
            console.error("❌ ERREUR : Élément introuvable !");
            return;
        }

        let selectedPlan = planNameElement.textContent.trim();
        let planPrice = planPriceElement.textContent.trim();
        let phoneNumber = "242068457521"; // Remplace avec ton numéro WhatsApp
        let message = encodeURIComponent(`Salut ! Je souhaite commander le plan : ${selectedPlan} (${planPrice}). Pouvez-vous me donner plus d'infos ?`);

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
        let body = encodeURIComponent(`Bonjour,\n\nJe souhaite commander le plan : ${selectedPlan} (${planPrice}).\nMerci de me donner plus d'informations.\n\nCordialement.`);

        let mailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
        console.log("📩 URL Email:", mailUrl);
        window.open(mailUrl);

        closeOrderModal();
    };
    
});


document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let userName = document.getElementById("userName").value.trim();
    let userMessage = document.getElementById("userMessage").value.trim();

    if (userName === "" || userMessage === "") {
        alert("❌ Veuillez remplir tous les champs !");
        return;
    }

    let phoneNumber = "242068457521"; // Ton numéro WhatsApp
    let message = encodeURIComponent(`Nom : ${userName}\nMessage :\n${userMessage}`);

    let url = `https://wa.me/${phoneNumber}?text=${message}`;
    console.log("🔗 URL WhatsApp:", url);
    window.open(url, "_blank");

    this.reset(); // Réinitialiser le formulaire après l'envoi
});
