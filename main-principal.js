window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener("DOMContentLoaded", () => {

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);


    
   
    gsap.registerPlugin(ScrollTrigger);

   
    const tlCentral = gsap.timeline({ delay: 0.2 });

   
    tlCentral.set("#logo-tramas, #container-mapa-sul", { autoAlpha: 1 })
    
 
    .from("#logo-tramas", { 
        y: -40, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.out" 
    })
    
 
    .from("#container-mapa-sul", { 
        scale: 0.3, 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.out" 
    }, "-=0.4")
    
  
    .from("#textos-tramas .titulo-tramas, #textos-tramas .paragrafo-tramas", { 
        x: -50, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out" 
    }, "-=0.8") 
    
 
    .from(".titulo-equipe, .lista-equipe li", { 
        x: -30, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power1.out" 
    }, "-=0.4");


    
    gsap.set("#textos-tramas, #container-scroll-tramaticos", { autoAlpha: 1 });

      gsap.fromTo("#textos-tramas .titulo-tramas, #textos-tramas .paragrafo-tramas, #textos-tramas .titulo-equipe, .card-tramatico", 
        {
            y: 60, 
            autoAlpha: 0 
        },
        {
            scrollTrigger: {
                trigger: "#tela-secundaria",
                start: "top center", 
                toggleActions: "play none none none" 
            },
            y: 0, 
            autoAlpha: 1, 
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        }
    );

    
    const containerCards = document.querySelector("#container-scroll-tramaticos");
    
if (containerCards) { 
        
        
        let ultimoScrollLeft = -1;
        let ultimaDirecao = 0;

        containerCards.addEventListener("wheel", (evento) => {
            const maxScrollLeft = containerCards.scrollWidth - containerCards.clientWidth;
            if (maxScrollLeft <= 0) return;

            const rolandoParaBaixo = evento.deltaY > 0;
            const rolandoParaCima = evento.deltaY < 0;
            const direcaoAtual = rolandoParaBaixo ? 1 : -1;
            
            const podeRolarDireita = containerCards.scrollLeft < maxScrollLeft - 5;
            const podeRolarEsquerda = containerCards.scrollLeft > 5;
            
            if (direcaoAtual !== ultimaDirecao) {
                ultimoScrollLeft = -1;
                ultimaDirecao = direcaoAtual;
            }

            if ((rolandoParaBaixo && podeRolarDireita) || (rolandoParaCima && podeRolarEsquerda)) {
                const scrollAtual = containerCards.scrollLeft;
                
                if (ultimoScrollLeft !== -1 && Math.abs(scrollAtual - ultimoScrollLeft) <= 2) {
                    return; 
                }
                
                ultimoScrollLeft = scrollAtual;
                evento.preventDefault(); 
                containerCards.scrollLeft += evento.deltaY; 
            } else {
                ultimoScrollLeft = -1; 
            }
        }, { passive: false }); 


        
        let isDown = false;
        let startX;
        let scrollLeft;

        containerCards.addEventListener('mousedown', (e) => {
            isDown = true;
            containerCards.style.scrollSnapType = 'none'; 
            startX = e.pageX - containerCards.offsetLeft;
            scrollLeft = containerCards.scrollLeft;
        });

        containerCards.addEventListener('mouseleave', () => {
            isDown = false;
            containerCards.style.scrollSnapType = ''; 
        });

        containerCards.addEventListener('mouseup', () => {
            isDown = false;
            containerCards.style.scrollSnapType = ''; 
        });

        containerCards.addEventListener('mousemove', (e) => {
            if (!isDown) return; 
            e.preventDefault(); 
            
            const x = e.pageX - containerCards.offsetLeft;
            const walk = (x - startX) * 1.5; 
            containerCards.scrollLeft = scrollLeft - walk;
        });

    } 

});