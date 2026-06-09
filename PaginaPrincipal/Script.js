/* ============================================================
   Script.js — TRAMAS
   Responsabilidades:
     1. Aguardar o SVG carregar via <object>
     2. Aplicar hover (mudança de cor) em cada país
     3. Ao clicar, redirecionar para a página do país
     4. Mostrar tooltip com nome e capital
   ============================================================ */

/* ----------------------------------------------------------
   MAPEAMENTO DOS PAÍSES
   
   ↓↓ AQUI VOCÊ INTERLIGA CADA PAÍS À SUA PÁGINA ↓↓
   
   A chave deve ser igual ao id do path no SVG.
   O valor é o caminho para o arquivo HTML da página do país.
   
   Exemplo: se o arquivo da Bolívia se chama "PaginaBolivia.html"
   e está na mesma pasta, use: "PaginaBolivia.html"
   Se estiver numa subpasta "pages/", use: "pages/PaginaBolivia.html"
   ---------------------------------------------------------- */
const PAGINAS_PAISES = {
    brasil:           "Brasil/PaginaBrasil.html",       // ← coloque o nome do seu arquivo aqui
    argentina:        "Argentina/PaginaArgentina.html",
    bolivia:          "Bolívia/PaginaBolivia.html",
    chile:            "Chile/PaginaChile.html",
    peru:             "Peru/PaginaPeru.html",
    paraguai:         "Paraguai/PaginaParaguai.html",
    uruguai:          "Uruguai/PaginaUruguai.html",
    colombia:         "Colômbia/PaginaColombia.html",
    venezuela:        "Venezuela/PaginaVenezuela.html",
    equador:          "Equador/PaginaEquador.html",
    guiana:           "Guiana/PaginaGuiana.html",
    suriname:         "Suriname/PaginaSuriname.html",
};
/* ----------------------------------------------------------
   REFERÊNCIAS DOM (elementos do HTML principal)
   ---------------------------------------------------------- */
const mapaObject  = document.getElementById("southAmericaMap");
const tooltip     = document.getElementById("tooltip");
const tooltipNome = document.getElementById("tooltipNome");
const tooltipCap  = document.getElementById("tooltipCapital");

/* ----------------------------------------------------------
   AGUARDA O <object> CARREGAR O SVG
   O evento "load" dispara quando o SVG interno está pronto.
   ---------------------------------------------------------- */
mapaObject.addEventListener("load", () => {

    // Acessa o documento SVG interno do <object>
    const svgDoc = mapaObject.contentDocument;

    if (!svgDoc) {
        console.warn("Não foi possível acessar o SVG. Verifique se está rodando em servidor local.");
        return;
    }

    // Seleciona todos os paths com classe "pais" dentro do SVG
    const paisElements = svgDoc.querySelectorAll(".pais");

    paisElements.forEach(path => {
        const id = path.id;

        // Ignora paths sem id mapeado
        if (!PAGINAS_PAISES[id]) return;

        // ---------- HOVER ----------
        path.addEventListener("mouseenter", (e) => {
            // A cor de hover já está definida no CSS interno do SVG (.pais:hover)
            // Aqui mostramos o tooltip
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

        // ---------- CLIQUE → navega para a página do país ----------
        path.addEventListener("click", () => {
            window.location.href = PAGINAS_PAISES[id];
        });

        // Cursor pointer (reforço além do CSS)
        path.style.cursor = "pointer";
    });
});

/* ----------------------------------------------------------
   Move o tooltip junto com o cursor do mouse
   ---------------------------------------------------------- */
function moverTooltip(e) {
    const offset = 18;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    // Evita que o tooltip saia pelos limites da tela
    const w = tooltip.offsetWidth;
    const h = tooltip.offsetHeight;
    if (x + w > window.innerWidth  - 8) x = e.clientX - w - offset;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - offset;

    tooltip.style.left = x + "px";
    tooltip.style.top  = y + "px";
}