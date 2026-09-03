// ========================================
// CONFIGURAÇÃO DA API
// ========================================

const API_URL =
    "https://www.alura.com.br/api/cursos";


// ========================================
// ELEMENTOS
// ========================================

const container =
    document.querySelector("#coursesContainer");

const loading =
    document.querySelector("#loading");

const empty =
    document.querySelector("#empty");

const searchInput =
    document.querySelector("#searchInput");

const courseCount =
    document.querySelector("#courseCount");

const filters =
    document.querySelectorAll(".filter");


// Guarda os cursos recebidos da API

let cursos = [];

let filtroAtual = "todos";


// ========================================
// BUSCAR CURSOS
// ========================================

async function buscarCursos() {

    try {

        loading.style.display = "flex";

        container.innerHTML = "";

        empty.style.display = "none";


        const resposta =
            await fetch(API_URL);


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível acessar a API."
            );

        }


        const dados =
            await resposta.json();


        // A API pode retornar os cursos
        // diretamente ou dentro de "cursos"

        cursos =
            dados.cursos ||
            dados;


        // Filtra áreas relacionadas
        // ao projeto

        cursos =
            cursos.filter(function(curso) {

                const texto = (
                    (curso.nome || "") +
                    " " +
                    (curso.titulo || "") +
                    " " +
                    (curso.descricao || "") +
                    " " +
                    (curso.categoria || "") +
                    " " +
                    (curso.subcategoria || "")
                ).toLowerCase();


                return (

                    texto.includes("cabelo") ||

                    texto.includes("beleza") ||

                    texto.includes("empreendedor") ||

                    texto.includes("marketing") ||

                    texto.includes("negócio") ||

                    texto.includes("negocios") ||

                    texto.includes("moda")

                );

            });


        renderizarCursos(cursos);


    } catch (erro) {

        console.error(
            "Erro ao buscar cursos:",
            erro
        );


        mostrarErro();


    } finally {

        loading.style.display = "none";

    }

}


// ========================================
// RENDERIZAR CURSOS
// ========================================

function renderizarCursos(lista) {

    container.innerHTML = "";


    if (!lista.length) {

        empty.style.display = "block";

        courseCount.textContent = "0";

        return;

    }


    empty.style.display = "none";


    courseCount.textContent =
        lista.length;


    lista.forEach(function(curso) {

        const card =
            criarCard(curso);


        container.appendChild(card);

    });

}


// ========================================
// CRIAR CARD
// ========================================

function criarCard(curso) {

    const card =
        document.createElement("article");


    card.className =
        "course-card";


    // Nome

    const nome =
        curso.nome ||
        curso.titulo ||
        "Curso";


    // Descrição

    const descricao =
        curso.descricao ||
        curso.subtitulo ||
        "Curso online para desenvolver novas habilidades.";


    // Categoria

    const categoria =
        curso.categoria ||
        "Cursos";


    // Imagem

    const imagem =
        curso.imagem ||
        curso.logo ||
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80";


    // Link

    const link =
        curso.url ||
        curso.link ||
        "#";


    card.innerHTML = `

        <div class="course-image">

            <img
                src="${imagem}"
                alt="${nome}"
                onerror="this.src='https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80'"
            >

            <span class="course-category">
                ${categoria}
            </span>

        </div>


        <div class="course-body">

            <h2>
                ${nome}
            </h2>


            <p>
                ${descricao}
            </p>


            <div class="progress-area">

                <div class="progress-text">

                    <span>
                        Progresso
                    </span>

                    <span>
                        0%
                    </span>

                </div>


                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width: 0%"
                    ></div>

                </div>

            </div>


            <button
                class="course-button"
                data-link="${link}"
            >

                ACESSAR CURSO

                <i class="bi bi-arrow-right"></i>

            </button>

        </div>

    `;


    // Botão

    const button =
        card.querySelector(".course-button");


    button.addEventListener(
        "click",
        function() {

            const url =
                button.dataset.link;


            if (url && url !== "#") {

                window.open(
                    url,
                    "_blank"
                );

            } else {

                alert(
                    "O link deste curso não está disponível."
                );

            }

        }
    );


    return card;

}


// ========================================
// PESQUISA
// ========================================

searchInput.addEventListener(
    "input",
    function() {

        aplicarFiltros();

    }
);


// ========================================
// FILTROS
// ========================================

filters.forEach(function(filtro) {

    filtro.addEventListener(
        "click",
        function() {


            filters.forEach(function(item) {

                item.classList.remove(
                    "active"
                );

            });


            filtro.classList.add(
                "active"
            );


            filtroAtual =
                filtro.dataset.filter;


            aplicarFiltros();

        }
    );

});


// ========================================
// APLICAR FILTROS
// ========================================

function aplicarFiltros() {

    const busca =
        searchInput.value
            .toLowerCase()
            .trim();


    let resultado =
        cursos.filter(function(curso) {


            const texto = (

                (curso.nome || "") +
                " " +
                (curso.titulo || "") +
                " " +
                (curso.descricao || "") +
                " " +
                (curso.categoria || "") +
                " " +
                (curso.subcategoria || "")

            ).toLowerCase();


            // Pesquisa

            const correspondeBusca =
                texto.includes(busca);


            // Categoria

            let correspondeFiltro = true;


            if (filtroAtual === "cabelo") {

                correspondeFiltro =
                    texto.includes("cabelo") ||
                    texto.includes("hair");

            }


            if (filtroAtual === "beleza") {

                correspondeFiltro =
                    texto.includes("beleza") ||
                    texto.includes("beauty") ||
                    texto.includes("maquiagem");

            }


            if (
                filtroAtual ===
                "empreendedorismo"
            ) {

                correspondeFiltro =
                    texto.includes("empreendedor") ||
                    texto.includes("negócio") ||
                    texto.includes("negocios");

            }


            return (
                correspondeBusca &&
                correspondeFiltro
            );

        });


    renderizarCursos(resultado);

}


// ========================================
// ERRO
// ========================================

function mostrarErro() {

    container.innerHTML = `

        <div class="empty"
             style="display:block">

            <i class="bi bi-exclamation-circle"></i>

            <h2>
                Não foi possível carregar os cursos
            </h2>

            <p>
                Verifique sua conexão e tente novamente.
            </p>

        </div>

    `;

}


// ========================================
// MENU MOBILE
// ========================================

const menuButton =
    document.querySelector("#menuButton");

const sidebar =
    document.querySelector("#sidebar");

const overlay =
    document.querySelector("#overlay");


menuButton.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle("open");

        overlay.classList.toggle(
            "active"
        );

    }
);


overlay.addEventListener(
    "click",
    function() {

        sidebar.classList.remove(
            "open"
        );

        overlay.classList.remove(
            "active"
        );

    }
);


// ========================================
// INICIAR
// ========================================

buscarCursos();