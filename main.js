// 1. Resolve o FOUC, revelando a caixa do mapa suavemente
gsap.set("#main-svg", { autoAlpha: 1, xPercent: 0, z: 0.1 });
// Força o cálculo geométrico prévio (xPercent: 0) 
// e empurra o mapa para uma camada 3D de hardware dedicada (z: 0.1)

gsap.set("#texto-lateral", { x: 50 }); // Posiciona o texto lateral fora da tela para a direita

gsap.set("#modal-parabens-container", { autoAlpha: 0 }); // NÃO TIRA ESTE CARALHO AQUI


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


document.addEventListener("DOMContentLoaded", () => {

  document.body.style.overflow = "hidden";

  gsap.set("#main-svg", {
    autoAlpha: 1,
    xPercent: 0,
    z: 0.1,
    force3D: true
  });

  gsap.set("#texto-lateral", {
    autoAlpha: 0,
    x: 50
  });

  const tl = gsap.timeline();

  tl.to("#logo", {
    scale: 150,
    duration: 1.5,
    ease: "power3.in",
    opacity: 0
  })

  .to("#intro-container", {
    autoAlpha: 0,
    duration: 0.5,
    ease: "power1.inOut"
  })

  .to("#main-svg", {
    xPercent: -75,
    duration: 2.5,
    ease: "power2.out"
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

});

const modal = document.querySelector("#modal-peca");

const titulo = document.querySelector("#modal-titulo");
const texto = document.querySelector("#modal-texto");

const conteudoPecas = {
  peca1: {
    titulo: "Peça 1",
    texto: "Informações da peça 1"
  },

  peca2: {
    titulo: "Peça 2",
    texto: "Informações da peça 2"
  },

  peca3: {
    titulo: "Peça 3",
    texto: "Informações da peça 3"
  },

  peca4: {
    titulo: "Peça 4",
    texto: "Informações da peça 4"
  }
};

document.querySelectorAll(".peca-mapa").forEach((peca)=>{

    peca.addEventListener("click", ()=>{

        titulo.textContent =
        conteudoPecas[peca.id].titulo;

        texto.textContent =
        conteudoPecas[peca.id].texto;

        gsap.to(modal,{
            autoAlpha:1,
            duration:.3
        });

    });

});

document
.querySelector("#fechar-modal")
.addEventListener("click",()=>{

    gsap.to(modal,{
        autoAlpha:0,
        duration:.3
    });

});
