const mapa = document.getElementById("MapaAmericaDoSul");

mapa.addEventListener("load", () => {

    const svgDoc = mapa.contentDocument;

    /*
        IMPORTANTE

        Cada país dentro do SVG precisa possuir um ID.

        Exemplo:

        id="brasil"
        id="bolivia"
        id="argentina"
        id="chile"

        etc...
    */

    const paises = {

        Brasil: "PaginaBrasil.html",
        Bolivia: "PaginaBolivia.html",
        Argentina: "PaginaArgentina.html",
        Chile: "PaginaChile.html",
        Peru: "PaginaPeru.html",
        Paraguai: "PaginaParaguai.html",
        Uruguai: "PaginaUruguai.html",
        Colombia: "PaginaColombia.html",
        Venezuela: "PaginaVenezuela.html",
        Equador: "PaginaEquador.html",
        Guiana: "PaginaGuiana.html",
        Suriname: "PaginaSuriname.html"

    };

    Object.keys(paises).forEach(nomePais => {

        const pais = svgDoc.getElementById(nomePais);

        if(!pais) return;

        // Cor padrão

        pais.style.fill = "#F3E1A0";

        pais.style.cursor = "pointer";

        pais.style.transition =
            "fill 0.3s ease";

        // Hover

        pais.addEventListener("mouseenter", () => {

            pais.style.fill = "#A54A2A";

        });

        pais.addEventListener("mouseleave", () => {

            pais.style.fill = "#F3E1A0";

        });

        // Clique

        pais.addEventListener("click", () => {

            window.location.href =
                paises[nomePais];

        });

    });

});