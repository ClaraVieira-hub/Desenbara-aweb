document.addEventListener("DOMContentLoaded", () => {


    // ==========================================
    // ELEMENTOS
    // ==========================================

    const searchInput =
        document.getElementById("searchInput");

    const cards =
        Array.from(
            document.querySelectorAll(".certificate-card")
        );

    const count =
        document.getElementById("certificateCount");

    const emptyState =
        document.getElementById("emptyState");

    const filterButtons =
        document.querySelectorAll("[data-filter]");


    // ==========================================
    // CONTADOR
    // ==========================================

    function updateCount(number) {

        count.textContent = number;

    }


    // ==========================================
    // FILTROS + PESQUISA
    // ==========================================

    function filterCertificates() {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();


        const activeFilter =
            document
                .querySelector(
                    ".filter-btn.active"
                )
                ?.dataset.filter || "todos";


        let visibleCards = 0;


        cards.forEach(card => {

            const text =
                card.textContent
                    .toLowerCase();


            const category =
                card.dataset.category
                    .toLowerCase();


            const matchesSearch =
                text.includes(searchTerm);


            const matchesFilter =
                activeFilter === "todos" ||
                category.includes(activeFilter);


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display =
                    "block";

                visibleCards++;

            } else {

                card.style.display =
                    "none";

            }

        });


        updateCount(visibleCards);


        if (visibleCards === 0) {

            emptyState.style.display =
                "block";

        } else {

            emptyState.style.display =
                "none";

        }

    }


    // ==========================================
    // PESQUISA
    // ==========================================

    searchInput.addEventListener(
        "input",
        filterCertificates
    );


    // ==========================================
    // BOTÕES DOS FILTROS
    // ==========================================

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                filterCertificates();

            }
        );

    });


    // ==========================================
    // VISUALIZAR CERTIFICADO
    // ==========================================

    const viewButtons =
        document.querySelectorAll(
            ".view-certificate"
        );


    const modalCourseName =
        document.getElementById(
            "modalCourseName"
        );


    let selectedCertificate = "";


    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedCertificate =
                    button.dataset.certificate;


                modalCourseName.textContent =
                    selectedCertificate;


                const modalElement =
                    document.getElementById(
                        "certificateModal"
                    );


                const modal =
                    bootstrap.Modal
                        .getOrCreateInstance(
                            modalElement
                        );


                modal.show();

            }
        );

    });


    // ==========================================
    // BAIXAR CERTIFICADO
    // ==========================================

    const downloadButtons =
        document.querySelectorAll(
            ".download-certificate"
        );


    downloadButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const course =
                    button.dataset.certificate;


                alert(
                    `O certificado de "${course}" será disponibilizado para download quando estiver conectado ao sistema de geração de certificados.`
                );

            }
        );

    });


    // ==========================================
    // BAIXAR PELO MODAL
    // ==========================================

    const modalDownload =
        document.getElementById(
            "modalDownload"
        );


    modalDownload.addEventListener(
        "click",
        () => {

            alert(
                `O certificado de "${selectedCertificate}" será disponibilizado para download quando o sistema estiver conectado ao gerador de certificados.`
            );

        }
    );


    // ==========================================
    // VALIDAR CERTIFICADO
    // ==========================================

    const verifyButton =
        document.getElementById(
            "verifyButton"
        );


    const validationInput =
        document.getElementById(
            "validationCode"
        );


    const validateCode =
        document.getElementById(
            "validateCode"
        );


    const validationResult =
        document.getElementById(
            "validationResult"
        );


    verifyButton.addEventListener(
        "click",
        () => {

            validationInput.value = "";

            validationResult.innerHTML = "";


            const modalElement =
                document.getElementById(
                    "validationModal"
                );


            const modal =
                bootstrap.Modal
                    .getOrCreateInstance(
                        modalElement
                    );


            modal.show();

        }
    );


    validateCode.addEventListener(
        "click",
        () => {

            const code =
                validationInput.value
                    .trim()
                    .toUpperCase();


            if (!code) {

                validationResult.innerHTML = `
                    <span style="color:#b65c6d;">
                        Digite um código de validação.
                    </span>
                `;

                return;

            }


            const validCodes = [

                "CB-TRANC-2026-001",
                "CB-MAQ-2026-002",
                "CB-EMP-2026-003",
                "CB-PEN-2026-004"

            ];


            if (
                validCodes.includes(code)
            ) {

                validationResult.innerHTML = `

                    <div
                        style="
                            padding:12px;
                            border-radius:10px;
                            background:#edf8f0;
                            color:#4c8d63;
                        "
                    >

                        <i class="bi bi-check-circle-fill"></i>

                        Certificado válido!

                    </div>

                `;

            } else {

                validationResult.innerHTML = `

                    <div
                        style="
                            padding:12px;
                            border-radius:10px;
                            background:#fff0f2;
                            color:#b65c6d;
                        "
                    >

                        <i class="bi bi-x-circle-fill"></i>

                        Certificado não encontrado.

                    </div>

                `;

            }

        }
    );


    // ==========================================
    // MENU MOBILE
    // ==========================================

    const menuButton =
        document.getElementById(
            "menuButton"
        );

    const sidebar =
        document.querySelector(
            ".sidebar"
        );

    const overlay =
        document.querySelector(
            ".sidebar-overlay"
        );


    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "show"
            );

            overlay.classList.toggle(
                "show"
            );

        }
    );


    overlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove(
                "show"
            );

            overlay.classList.remove(
                "show"
            );

        }
    );


    // ==========================================
    // ANIMAÇÃO DOS CARDS
    // ==========================================

    cards.forEach(
        (card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(20px)";


            setTimeout(() => {

                card.style.transition =
                    "opacity .5s ease, transform .5s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            }, index * 100);

        }
    );



    updateCount(cards.length);

});