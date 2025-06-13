document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const btnEntrar = document.getElementById('btn-entrar');
    const menuButtons = document.querySelectorAll('.main-menu button');
    const backToMenuButtons = document.querySelectorAll('.btn-voltar-menu');

    // Funções para controle de telas
    function showScreen(id) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');
    }

    // Navegação entre telas
    if (btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            showScreen('tela-menu');
        });
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            showScreen(targetId);
            // Se for a tela do carrossel, inicializa
            if (targetId === 'tela-opcao1') {
                initializeCarousel();
            }
        });
    });

    backToMenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            showScreen('tela-menu');
        });
    });


    // Lógica do Carrossel (Tela Opção 1)
    let currentSlide = 0;
    let carouselTrack;
    let carouselImages;

    function initializeCarousel() {
        carouselTrack = document.querySelector('.carousel-track');
        carouselImages = document.querySelectorAll('.carousel-track img');
        if (carouselImages.length > 0) {
            currentSlide = 0; // Reseta o slide ao entrar na tela
            updateCarousel();
        }
    }

    function updateCarousel() {
        if (!carouselTrack || !carouselImages.length) return;
        const imageWidth = carouselImages[0].clientWidth;
        carouselTrack.style.transform = `translateX(${-imageWidth * currentSlide}px)`;
    }

    // Adiciona event listeners para os botões do carrossel
    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        if (!carouselImages.length) return;
        currentSlide = (currentSlide + 1) % carouselImages.length;
        updateCarousel();
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        if (!carouselImages.length) return;
        currentSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
        updateCarousel();
    });

    // Atualiza o carrossel se a tela for redimensionada
    window.addEventListener('resize', () => {
        // Apenas se o carrossel estiver ativo ou tiver sido inicializado
        if (document.getElementById('tela-opcao1').classList.contains('active')) {
            updateCarousel();
        }
    });

    // Animação de entrada da primeira tela (opcional)
    setTimeout(() => {
        document.getElementById('tela-inicial').classList.add('active');
    }, 100);
});
