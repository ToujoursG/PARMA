// Script principal do Grupo Parma

document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('back-to-top');

    // Verificar preferência de tema salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }

    // Alternar entre modo claro e escuro
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Menu mobile
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            const spans = this.querySelectorAll('span');
            if (spans.length >= 3) {
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');

                const spans = mobileMenuBtn.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Botão "Voltar ao topo"
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animação de fade-in para elementos ao rolar a página
    const fadeElements = document.querySelectorAll('.news-card, .research-card, .event-card, .article-content p, .article-content h2, .article-content h3, .article-content ul, .article-content blockquote');

    if (fadeElements.length > 0) {
        const fadeInOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };

        const fadeInObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            });
        }, fadeInOptions);

        fadeElements.forEach((element, index) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            element.style.transitionDelay = `${index * 0.1}s`;
            fadeInObserver.observe(element);
        });
    }

    // Adicionar efeitos hover em links e botões
    const hoverElements = document.querySelectorAll('.btn, .read-more, .social-icons a');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Animação para o logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});
