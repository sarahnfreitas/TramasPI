/* ============================================================
   main.js — TRAMAS
   Ordem de execução:
     1. Mapa interativo (evento "load" do <object>)
     2. Scroll ao topo ao sair da página
     3. DOMContentLoaded: animações GSAP + scroll dos cards
   ============================================================ */


/* ============================================================
   PARTE 1 — MAPA INTERATIVO
   Roda assim que o <object> termina de carregar o SVG.
   ============================================================ */

const PAGINAS_PAISES = {
    brasil:    "Brasil/PaginaBrasil.html",
    argentina: "Argentina/PaginaArgentina.html",
    bolivia:   "Bolívia/PaginaBolivia.html",
    chile:     "Chile/PaginaChile.html",
    peru:      "Peru/PaginaPeru.html",
    paraguai:  "Paraguai/PaginaParaguai.html",
    uruguai:   "Uruguai/PaginaUruguai.html",
    colombia:  "Colômbia/PaginaColombia.html",
    venezuela: "Venezuela/PaginaVenezuela.html",
    equador:   "Equador/PaginaEquador.html",
    guiana:    "Guiana/PaginaGuiana.html",
    suriname:  "Suriname/PaginaSuriname.html",
};

const INFO_PAISES = {
    brasil:    { nome: "Brasil",     capital: "Brasília"     },
    argentina: { nome: "Argentina",  capital: "Buenos Aires" },
    bolivia:   { nome: "Bolívia",    capital: "Sucre"        },
    chile:     { nome: "Chile",      capital: "Santiago"     },
    peru:      { nome: "Peru",       capital: "Lima"         },
    paraguai:  { nome: "Paraguai",   capital: "Assunção"     },
    uruguai:   { nome: "Uruguai",    capital: "Montevidéu"   },
    colombia:  { nome: "Colômbia",   capital: "Bogotá"       },
    venezuela: { nome: "Venezuela",  capital: "Caracas"      },
    equador:   { nome: "Equador",    capital: "Quito"        },
    guiana:    { nome: "Guiana",     capital: "Georgetown"   },
    suriname:  { nome: "Suriname",   capital: "Paramaribo"   },
};

const mapaObject  = document.getElementById("southAmericaMap");
const tooltip     = document.getElementById("tooltip");
const tooltipNome = document.getElementById("tooltipNome");
const tooltipCap  = document.getElementById("tooltipCapital");

mapaObject.addEventListener("load", () => {

    const svgDoc = mapaObject.contentDocument;

    if (!svgDoc) {
        console.warn("SVG inacessível. Abra via servidor local (Live Server ou python http.server).");
        return;
    }

    svgDoc.querySelectorAll(".pais").forEach(path => {
        const id = path.id;
        if (!PAGINAS_PAISES[id]) return;

        path.addEventListener("mouseenter", (e) => {
            const info = INFO_PAISES[id];
            if (info) {
                tooltipNome.textContent = info.nome;
                tooltipCap.textContent  = info.capital;
            }
            tooltip.classList.add("visivel");
            moverTooltip(e);
        });

        path.addEventListener("mousemove", moverTooltip);

        path.addEventListener("mouseleave", () => {
            tooltip.classList.remove("visivel");
        });

        path.addEventListener("click", () => {
            window.location.href = PAGINAS_PAISES[id];
        });

        path.style.cursor = "pointer";
    });
});

function moverTooltip(e) {
    const offset = 18;
    let x = e.clientX + offset;
    let y = e.clientY + offset;
    const w = tooltip.offsetWidth;
    const h = tooltip.offsetHeight;
    if (x + w > window.innerWidth  - 8) x = e.clientX - w - offset;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - offset;
    tooltip.style.left = x + "px";
    tooltip.style.top  = y + "px";
}


/* ============================================================
   PARTE 2 — SCROLL AO TOPO AO SAIR DA PÁGINA
   ============================================================ */

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};


/* ============================================================
   PARTE 3 — ANIMAÇÕES GSAP + SCROLL DOS CARDS
   Tudo dentro de um único DOMContentLoaded.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* Restaura scroll ao topo */
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    setTimeout(() => window.scrollTo(0, 0), 50);

    /* Registra plugins necessários */
    gsap.registerPlugin(ScrollTrigger);

    /* ----------------------------------------------------------
       Animação de entrada: logo + mapa
       ---------------------------------------------------------- */
    const tlCentral = gsap.timeline({ delay: 0.2 });

    tlCentral
        .set("#logo-tramas, #container-mapa-sul", { autoAlpha: 1 })

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

    /* ----------------------------------------------------------
       Animação com scroll: tela 2 (textos + cards da equipe)
       ---------------------------------------------------------- */
    gsap.set("#textos-tramas, #container-scroll-tramaticos", { autoAlpha: 1 });

    gsap.fromTo(
        "#textos-tramas .titulo-tramas, #textos-tramas .paragrafo-tramas, #textos-tramas .titulo-equipe, .card-tramatico",
        { y: 60, autoAlpha: 0 },
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

    /* ----------------------------------------------------------
       Scroll horizontal dos cards da equipe
       (roda do mouse + arrastar com clique)
       ---------------------------------------------------------- */
    const containerCards = document.querySelector("#container-scroll-tramaticos");

    if (containerCards) {

        let ultimoScrollLeft = -1;
        let ultimaDirecao = 0;

        containerCards.addEventListener("wheel", (evento) => {
            const maxScrollLeft = containerCards.scrollWidth - containerCards.clientWidth;
            if (maxScrollLeft <= 0) return;

            const rolandoParaBaixo = evento.deltaY > 0;
            const rolandoParaCima  = evento.deltaY < 0;
            const direcaoAtual     = rolandoParaBaixo ? 1 : -1;

            const podeRolarDireita  = containerCards.scrollLeft < maxScrollLeft - 5;
            const podeRolarEsquerda = containerCards.scrollLeft > 5;

            if (direcaoAtual !== ultimaDirecao) {
                ultimoScrollLeft = -1;
                ultimaDirecao = direcaoAtual;
            }

            if ((rolandoParaBaixo && podeRolarDireita) || (rolandoParaCima && podeRolarEsquerda)) {
                const scrollAtual = containerCards.scrollLeft;
                if (ultimoScrollLeft !== -1 && Math.abs(scrollAtual - ultimoScrollLeft) <= 2) return;
                ultimoScrollLeft = scrollAtual;
                evento.preventDefault();
                containerCards.scrollLeft += evento.deltaY;
            } else {
                ultimoScrollLeft = -1;
            }
        }, { passive: false });

        let isDown = false;
        let startX, scrollLeft;

        containerCards.addEventListener("mousedown", (e) => {
            isDown = true;
            containerCards.style.scrollSnapType = "none";
            startX     = e.pageX - containerCards.offsetLeft;
            scrollLeft = containerCards.scrollLeft;
        });

        containerCards.addEventListener("mouseleave", () => {
            isDown = false;
            containerCards.style.scrollSnapType = "";
        });

        containerCards.addEventListener("mouseup", () => {
            isDown = false;
            containerCards.style.scrollSnapType = "";
        });

        containerCards.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x    = e.pageX - containerCards.offsetLeft;
            const walk = (x - startX) * 1.5;
            containerCards.scrollLeft = scrollLeft - walk;
        });

    }

}); /* /DOMContentLoaded */