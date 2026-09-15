document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const numberDisplay = document.querySelector('.number-display');

    // Add a simple 3D tilt effect on mousemove
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset tilt on mouseleave
    document.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        card.style.transition = 'transform 0.5s ease';
    });
    
    document.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    // Click effect for the number
    numberDisplay.addEventListener('click', () => {
        numberDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            numberDisplay.style.transform = 'scale(1)';
        }, 200);
        
        // Create a ripple/burst effect
        createBurst(numberDisplay);
    });

    function createBurst(element) {
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.background = 'rgba(255, 255, 255, 0.8)';
        burst.style.borderRadius = '50%';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.boxShadow = '0 0 20px 10px rgba(96, 165, 250, 0.5)';
        burst.style.pointerEvents = 'none';
        
        element.appendChild(burst);
        
        const animation = burst.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(20)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        animation.onfinish = () => burst.remove();
    }
});
