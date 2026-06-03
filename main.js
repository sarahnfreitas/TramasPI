// 1. Resolve o FOUC, revelando a caixa do mapa suavemente
gsap.set("#main-svg", { autoAlpha: 1, xPercent: 0, z: 0.1 });
// Força o cálculo geométrico prévio (xPercent: 0) 
// e empurra o mapa para uma camada 3D de hardware dedicada (z: 0.1)

gsap.set("#texto-lateral", { x: 50 }); // Posiciona o texto lateral fora da tela para a direita

gsap.set("#modal-parabens-container", { autoAlpha: 0 }); // NÃO TIRA ESTE CARALHO AQUI


const tl = gsap.timeline({ delay: 2 });




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

const pecasDoMapa = document.querySelectorAll('#main-svg svg path'); 

pecasDoMapa.forEach(peca => {
  peca.addEventListener('click', () => {
    
    // Trava os cliques na tela para o usuário não quebrar a animação
    document.body.style.pointerEvents = "none";

    const tlClick = gsap.timeline();

    // 1. Faz a imagem de textura desvanecer (sumir) suavemente
    tlClick.to("#fundo-png", { 
      autoAlpha: 0, 
      duration: 1 
    }, "start") // A tag "start" sincroniza tudo!

    // 2. Muda a cor de fundo do contêiner principal para bordô
    .to("#main-content", { 
      backgroundColor: "#72171B", 
      duration: 1 
    }, "start")

    // 3A. Mapa voa para a direita e some
    .to("#main-svg", {
      x: "20vw",       
      scale: 0,        
      autoAlpha: 0,    
      duration: 1,
      ease: "power3.inOut"
    }, "start")

    // 3B. Texto voa para a esquerda e some
    .to("#texto-lateral", {
      x: "-20vw",      
      scale: 0,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.inOut"
    }, "start")

    // 4. Torna o novo contêiner de parabéns visível
    .set("#modal-parabens-container", { autoAlpha: 1 })

    // 5. Primeira expansão da bolinha (Altura)
    .to("#tela-expansiva", {
      height: 454,
      borderRadius: 50,
      duration: 0.6,
      ease: "power2.inOut"
    })

    // 6. Segunda expansão (Largura)
    .to("#tela-expansiva", {
      width: 925,
      duration: 0.8,
      ease: "power2.inOut"
    })

    // 7. Revelar o título, texto e botão
    .to("#conteudo-parabens", {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => {
        // Libera a tela novamente
        document.body.style.pointerEvents = "auto";
      }
    });

  });
});
