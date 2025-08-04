document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body; // Référence au body
    const animatedElementsOnScroll = document.querySelectorAll('.section');
    const scrollAnimatedElements = document.querySelectorAll('.service-item, .temoignage-card, .stat-item, .avantage-item, .valeur-cardl');
    const titleAnimatedElements = document.querySelectorAll('.section-title, .valeur-cardr');

    // Fonction pour gérer la fermeture du menu avec animation inverse
    const closeNav = () => {
        if (nav.classList.contains('nav-active')) { // S'assurer que le menu est ouvert
            body.classList.add('nav-closing'); // Ajoute une classe pour déclencher l'animation de fermeture des liens
            
            navLinks.forEach((link, index) => {
                // Applique l'animation de fermeture aux liens avec un délai inversé
                // (navLinks.length - 1 - index) fait que le dernier lien commence son animation en premier
                link.style.animation = `navLinkFadeOut 0.5s ease forwards ${(navLinks.length - 1 - index) / 7 + 0.0}s`;
                // J'ai réduit le délai initial à 0.0s pour une fermeture plus rapide
            });

            // Attendre la fin des animations avant de retirer les classes
            // Le délai doit être au moins égal à la durée de l'animation la plus longue (0.5s)
            // plus le délai maximum des liens.
            const longestAnimationTime = 100 + ((navLinks.length - 1) / 7 * 100); // en ms
            setTimeout(() => {
                nav.classList.remove('nav-active'); // Ferme le menu principal
                burger.classList.remove('toggle'); // Réinitialise l'icône du burger
                body.classList.remove('nav-closing'); // Retire la classe de fermeture du body
                navLinks.forEach((item) => {
                    item.style.animation = ''; // Réinitialise l'animation pour la prochaine ouverture
                });
            }, Math.max(800, longestAnimationTime)); // Utilise 800ms ou le temps calculé si plus long
        }
    };

    // Fonction pour basculer (ouvrir/fermer) la navigation mobile
    const toggleNav = () => {
        if (nav.classList.contains('nav-active')) {
            // Si le menu est ouvert, appelle la fonction de fermeture
            closeNav();
        } else {
            // Si le menu est fermé, l'ouvrir
            nav.classList.add('nav-active');
            burger.classList.add('toggle');
            body.classList.remove('nav-closing'); // S'assurer que cette classe n'est pas présente à l'ouverture

            // Animer les liens de navigation pour l'ouverture
            navLinks.forEach((link, index) => {
                link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.0}s`;
            });
        }
    };

    

    // Écouteur d'événement pour le clic sur le burger
    burger.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche le clic de se propager au document
        toggleNav();
    });

    // Fermer la navigation mobile quand un lien est cliqué
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // L'événement ne doit PAS être stoppé ici, car le clic sur un lien est aussi un clic en dehors du menu
            // pour le document, ce qui aide à la fermeture automatique.
            if (window.innerWidth <= 768) { // Seulement sur les petits écrans
                closeNav(); // Appelle la fonction de fermeture unifiée
            }
        });
    });

    // Fermer la navigation mobile lorsque l'on clique en dehors du menu ou du burger
    document.addEventListener('click', (event) => {
        // Vérifie si le menu est ouvert ET que le clic n'est PAS sur le menu ET qu'il n'est PAS sur le burger
        if (nav.classList.contains('nav-active') && !nav.contains(event.target) && !burger.contains(event.target)) {
            closeNav(); // Appelle la fonction de fermeture unifiée
        }
    });

    // Animations au scroll (inchangées, mais vérifie leur CSS)
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const scrollOptions = { 
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const titleOptions = { 
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément entre ou est dans le viewport
                entry.target.classList.add('visible');
            } else {
                // L'élément sort du viewport (par le haut ou par le bas)
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément entre ou est dans le viewport
                entry.target.classList.add('scroll-visible');
            } else {
                // L'élément sort du viewport (par le haut ou par le bas)
                entry.target.classList.remove('scroll-visible');
            }
        });
    }, scrollOptions);

    const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // L'élément entre ou est dans le viewport
                entry.target.classList.add('title-visible');
            } else {
                // L'élément sort du viewport (par le haut ou par le bas)
                entry.target.classList.remove('title-visible');
            }
        });
    }, titleOptions);

    animatedElementsOnScroll.forEach(element => {
        element.classList.add('hidden'); // S'assurer que tous les éléments sont cachés au chargement initial
        observer.observe(element);
    });

    scrollAnimatedElements.forEach(element1 => {
        element1.classList.add('scroll-hidden'); 
        scrollObserver.observe(element1); 
    });
    
    titleAnimatedElements.forEach(element2 => {
        element2.classList.add('title-hidden'); 
        titleObserver.observe(element2); 
    });
    
});