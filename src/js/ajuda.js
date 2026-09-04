document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SIDEBAR MOBILE
    ========================== */

    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarOverlay = document.getElementById("sidebarOverlay");


    function openSidebar() {

        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");

    }


    menuToggle.addEventListener("click", function () {

        if (sidebar.classList.contains("open")) {

            closeSidebar();

        } else {

            openSidebar();

        }

    });


    sidebarOverlay.addEventListener("click", closeSidebar);



    /* =========================
       BUSCA DA CENTRAL DE AJUDA
    ========================== */

    const helpSearch = document.getElementById("helpSearch");
    const searchHelpBtn = document.getElementById("searchHelpBtn");

    const faqItems = document.querySelectorAll(".faq-item");
    const categoryCards = document.querySelectorAll(".category-card");


    function searchHelp() {

        const search = helpSearch.value
            .toLowerCase()
            .trim();


        if (search === "") {

            faqItems.forEach(item => {

                item.style.display = "";

            });

            categoryCards.forEach(card => {

                card.style.display = "";

            });

            return;

        }


        let found = false;


        /* FAQ */

        faqItems.forEach(item => {

            const text = item.innerText.toLowerCase();

            if (text.includes(search)) {

                item.style.display = "";

                found = true;

            } else {

                item.style.display = "none";

            }

        });


        /* CATEGORIAS */

        categoryCards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(search)) {

                card.style.display = "";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        if (!found) {

            alert(
                "Não encontramos uma resposta para essa busca. " +
                "Tente utilizar outras palavras ou fale com nosso atendimento."
            );

        }

    }


    searchHelpBtn.addEventListener("click", searchHelp);


    helpSearch.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            searchHelp();

        }

    });



    /* =========================
       CATEGORIAS
    ========================== */

    categoryCards.forEach(card => {

        card.addEventListener("click", function () {

            const category = this.dataset.category;


            const categoryMap = {

                cursos:
                    "Para dúvidas sobre cursos, acesse a área Meus cursos ou Explorar cursos.",

                certificados:
                    "Para dúvidas sobre certificados, acesse a área Certificados.",

                conta:
                    "Para problemas com sua conta, perfil ou acesso, verifique as opções de recuperação ou procure o atendimento.",

                atendimento:
                    "Para falar com nossa equipe, acesse a página Conversas."

            };


            if (categoryMap[category]) {

                alert(categoryMap[category]);

            }

        });

    });



    /* =========================
       MODAL DE DENÚNCIA
    ========================== */

    const reportButton =
        document.getElementById("openReportBtn");


    const reportModalElement =
        document.getElementById("reportModal");


    const reportModal =
        new bootstrap.Modal(reportModalElement);


    reportButton.addEventListener("click", function () {

        reportModal.show();

    });



    /* =========================
       OPÇÕES DE DENÚNCIA
    ========================== */

    const reportOptions =
        document.querySelectorAll(".report-option");


    reportOptions.forEach((option, index) => {

        option.addEventListener("click", function () {


            /* Violência */

            if (index === 0) {

                reportModal.hide();

                setTimeout(() => {

                    const confirmEmergency = confirm(
                        "Se houver perigo imediato, procure um local seguro " +
                        "e ligue para 190.\n\n" +
                        "Você também pode ligar para 180 para receber " +
                        "orientações e atendimento relacionados à violência contra a mulher."
                    );


                    if (confirmEmergency) {

                        window.location.href = "tel:190";

                    }

                }, 300);

            }


            /* Assédio / discriminação */

            if (index === 1) {

                reportModal.hide();

                setTimeout(() => {

                    alert(
                        "Para situações de assédio ou discriminação, " +
                        "guarde as informações relevantes e procure os " +
                        "canais oficiais responsáveis. " +
                        "Você também pode entrar em contato com o atendimento " +
                        "da Desembaraça Web."
                    );

                }, 300);

            }


            /* Problema na plataforma */

            if (index === 2) {

                reportModal.hide();

                setTimeout(() => {

                    window.location.href =
                        "../html/conversas.html";

                }, 300);

            }

        });

    });



    /* =========================
       ATALHO SAC
    ========================== */

    const contactButton =
        document.querySelector(".contact-button");


    if (contactButton) {

        contactButton.addEventListener("click", function () {

            closeSidebar();

        });

    }



    /* =========================
       PESQUISA GLOBAL
    ========================== */

    const globalSearch =
        document.getElementById("globalSearch");


    if (globalSearch) {

        globalSearch.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                const query =
                    this.value.trim();


                if (query !== "") {

                    helpSearch.value = query;

                    searchHelp();

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }

            }

        });

    }




    const notificationBtn =
        document.querySelector(".notification-btn");


    notificationBtn.addEventListener("click", function () {

        alert(
            "Você não possui novas notificações."
        );

    });

});