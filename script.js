document.addEventListener("DOMContentLoaded", () => {
    // Generate background stars/particles
    const starsContainer = document.querySelector('.stars');
    const particleCount = 50;
    
    for(let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(particle);
    }

    // Audio setup
    const bgAudio = document.getElementById('bg-music');
    const tapHint = document.querySelector('.tap-hint');
    let hasPlayed = false;

    // Start audio on first interaction anywhere on the screen
    document.body.addEventListener('click', () => {
        if (!hasPlayed && bgAudio) {
            bgAudio.play().then(() => {
                hasPlayed = true;
                // Fade out the hint after audio starts
                if(tapHint) {
                    tapHint.style.transition = 'opacity 1s ease';
                    tapHint.style.opacity = '0';
                    setTimeout(() => tapHint.remove(), 1000);
                }
            }).catch(err => console.log("Audio play failed:", err));
        }
    });

    // Generate Peony Petals for the bouquet
    const peonies = document.querySelectorAll('.peony');
    
    // Layers of the peony (from outer to inner)
    // format: { count: number of petals, size: relative size, angleX: bend outward }
    const layers = [
        { count: 12, size: 1.2, angleX: 75, colorOffset: 0 },
        { count: 10, size: 1.1, angleX: 60, colorOffset: 5 },
        { count: 9, size: 0.9, angleX: 45, colorOffset: 10 },
        { count: 8, size: 0.8, angleX: 30, colorOffset: 15 },
        { count: 7, size: 0.6, angleX: 20, colorOffset: 20 },
        { count: 5, size: 0.5, angleX: 10, colorOffset: 25 },
        { count: 4, size: 0.3, angleX: 5,  colorOffset: 30 }
    ];

    let totalDelay = 3.5; // Start blooming after container grows

    peonies.forEach((peony, peonyIndex) => {
        // Add a slight delay offset per flower so they don't bloom at the exact same millisecond
        const flowerDelay = totalDelay + (peonyIndex * 0.2);

        layers.forEach((layer, layerIndex) => {
            const angleStep = 360 / layer.count;
            
            for (let i = 0; i < layer.count; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                
                // Base rotation around the Y axis to form the circle
                // Add slight randomness to make it look natural
                const randomY = (Math.random() - 0.5) * 15;
                const rotateY = (i * angleStep) + randomY + (layerIndex * 15);
                
                // Randomize X angle slightly for natural overlap
                const randomX = (Math.random() - 0.5) * 10;
                const finalAngleX = layer.angleX + randomX;
                
                // Set initial closed state (all petals upright or slightly inward)
                const initialTransform = `rotateY(${rotateY}deg) rotateX(0deg) scale(0.1)`;
                
                // Set final bloomed state
                const targetTransform = `rotateY(${rotateY}deg) rotateX(${finalAngleX}deg) scale(${layer.size})`;
                
                petal.style.transform = initialTransform;
                
                // Adjust colors slightly per layer for depth
                // Darker inside, lighter outside
                const r1 = 255 - layer.colorOffset;
                const g1 = 182 - layer.colorOffset;
                const b1 = 193 - layer.colorOffset;
                
                const r2 = 255 - layer.colorOffset * 1.5;
                const g2 = 105 - layer.colorOffset * 0.8;
                const b2 = 180 - layer.colorOffset;

                petal.style.background = `linear-gradient(to top, rgba(${r2}, ${g2}, ${b2}, 0.95) 0%, rgba(${r1}, ${g1}, ${b1}, 0.85) 100%)`;
                
                // Append petal
                peony.appendChild(petal);
                
                // Trigger animation
                // Outer layers bloom first, inner layers follow
                const petalDelay = flowerDelay + (layerIndex * 0.3) + (Math.random() * 0.2);
                
                setTimeout(() => {
                    petal.style.opacity = '1';
                    petal.style.transform = targetTransform;
                }, petalDelay * 1000);
            }
        });
    });
});
