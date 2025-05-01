// Data do próximo aniversário
const nextBirthday = new Date('2026-05-01T00:00:00');

// Função para atualizar o temporizador
function updateCountdown() {
    const now = new Date();
    const difference = nextBirthday - now;

    // Se já passou do aniversário, mostra mensagem especial
    if (difference < 0) {
        document.querySelector('.countdown-container h2').textContent = 'Feliz Aniversário! 🎉';
        document.querySelectorAll('.countdown-item span:first-child').forEach(span => span.textContent = '00');
        createConfetti();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Atualiza o temporizador a cada segundo
setInterval(updateCountdown, 1000);
updateCountdown(); // Chama imediatamente para evitar delay inicial

// Função para criar confetes
function createConfetti() {
    const colors = ['#64b5f6', '#90caf9', '#42a5f5', '#1e88e5', '#fff'];
    const confettiCount = 150;
    const confettiContainer = document.querySelector('.confetti');

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            
            confetti.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                position: absolute;
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random()};
                transform: rotate(${Math.random() * 360}deg);
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            `;

            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Adiciona keyframes para a animação de queda dos confetes se ainda não existir
if (!document.querySelector('#confetti-animation')) {
    const style = document.createElement('style');
    style.id = 'confetti-animation';
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(960deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicia os confetes quando a página carrega e a cada 10 segundos
window.addEventListener('load', () => {
    createConfetti();
    setInterval(createConfetti, 10000);
});

// Efeito de hover nos balões
const balloons = document.querySelectorAll('.balloon');
balloons.forEach(balloon => {
    balloon.addEventListener('mouseover', () => {
        balloon.style.transform = 'scale(1.1) translateY(-10px)';
        balloon.style.transition = 'transform 0.3s ease';
    });
    
    balloon.addEventListener('mouseout', () => {
        balloon.style.transform = 'scale(1) translateY(0)';
    });
});