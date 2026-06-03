// 1. Resolve o FOUC, revelando a caixa do mapa suavemente
gsap.set("#main-svg", { autoAlpha: 1, xPercent: 0, z: 0.1 });
// Força o cálculo geométrico prévio (xPercent: 0) 
// e empurra o mapa para uma camada 3D de hardware dedicada (z: 0.1)

gsap.set("#texto-lateral", { x: 50 }); // Posiciona o texto lateral fora da tela para a direita

const tl = gsap.timeline();

const pecasDoMapa = document.querySelectorAll('#main-svg svg path');

pecasDoMapa.forEach(peca => {
  peca.addEventListener('click', () => {

    window.location.href = "pagina/das/passivas.html"; 
    
  });
});


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
}, "+=0.5")

.to("#texto-lateral", {
  autoAlpha: 1,  
  x: 0,          
  duration: 1.5,
  ease: "power2.out",
  onComplete: () => {
    document.body.style.overflow = "auto";
  }
});