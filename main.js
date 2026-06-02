// 1. Resolve o FOUC, revelando a caixa do mapa suavemente
gsap.set("#main-svg", { autoAlpha: 1 });

// 2. AQUECIMENTO DA GPU MÁXIMO: 
// Força o cálculo geométrico prévio (xPercent: 0) 
// e empurra o mapa para uma camada 3D de hardware dedicada (z: 0.1)
gsap.set("#main-svg", { 
  xPercent: 0, 
  z: 0.1 
});

const tl = gsap.timeline();

tl.to("#logo", {
    scale: 150,
    duration: 1.5,
    ease: "power3.in",
    opacity: 0            
})

.to("#intro-container", {
  autoAlpha: 0,        // É melhor que opacity pois aplica visibility: hidden no final
  duration: 0.5,
  ease: "power1.inOut",
  onComplete: () => {
    // volta a rolagem da página quando a intro sumir
    document.body.style.overflow = "auto";
  }
})

.to("#main-svg", {
  xPercent: -75, // Mantendo a medida responsiva
  duration: 2.5, 
  ease: "power2.out", 
  onComplete: () => {
    document.body.style.overflow = "auto";
  }
}, "+=0.5");

