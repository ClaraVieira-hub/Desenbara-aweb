document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const editButton =
        document.getElementById("editButton");

    const cancelButton =
        document.getElementById("cancelButton");

    const profileForm =
        document.getElementById("profileForm");

    const formButtons =
        document.getElementById("formButtons");

    const photoInput =
        document.getElementById("photoInput");

    const profilePhoto =
        document.getElementById("profilePhoto");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const passwordButton =
        document.getElementById("passwordButton");

    const passwordForm =
        document.getElementById("passwordForm");

    const interestButton =
        document.getElementById("interestButton");

    const menuButton =
        document.getElementById("menuButton");

    const sidebar =
        document.querySelector(".sidebar");

    const overlay =
        document.querySelector(".sidebar-overlay");

    const searchInput =
        document.getElementById("searchInput");


    // ==========================================
    // CAMPOS DO PERFIL
    // ==========================================

    const fields = [

        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("city"),
        document.getElementById("interest")

    ];


    // ==========================================
    // GUARDAR DADOS ORIGINAIS
    // ==========================================

    let originalData = {};

    function salvarDadosOriginais() {

        fields.forEach(field => {

            originalData[field.id] =
                field.value;

        });

    }


    salvarDadosOriginais();


    // ==========================================
    // EDITAR PERFIL
    // ==========================================

    editButton.addEventListener("click", () => {

        fields.forEach(field => {

            field.disabled = false;

        });

        formButtons.classList.add("show");

        editButton.style.display = "none";

    });


    // ==========================================
    // CANCELAR
    // ==========================================

    cancelButton.addEventListener("click", () => {

        fields.forEach(field => {

            field.value =
                originalData[field.id];

            field.disabled = true;

        });

        formButtons.classList.remove("show");

        editButton.style.display = "block";

    });


    // ==========================================
    // SALVAR ALTERAÇÕES
    // ==========================================

    profileForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const nome =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();


        if (!nome || !email) {

            alert(
                "Preencha seu nome e e-mail."
            );

            return;

        }


        // Atualiza os dados exibidos

        profileName.textContent =
            nome;

        profileEmail.textContent =
            email;


        // Atualiza os dados originais

        salvarDadosOriginais();


        // Desabilita novamente

        fields.forEach(field => {

            field.disabled = true;

        });


        formButtons.classList.remove("show");

        editButton.style.display = "block";


        alert(
            "Perfil atualizado com sucesso! 💜"
        );

    });


    // ==========================================
    // FOTO DO PERFIL
    // ==========================================

    photoInput.addEventListener("change", (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        // Verifica se é imagem

        if (!file.type.startsWith("image/")) {

            alert(
                "Selecione uma imagem válida."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = (e) => {

            profilePhoto.innerHTML = `

                <img
                    src="${e.target.result}"
                    alt="Foto de perfil">

            `;

        };


        reader.readAsDataURL(file);

    });


    // ==========================================
    // MODAL DE SENHA
    // ==========================================

    passwordButton.addEventListener("click", () => {

        const modalElement =
            document.getElementById(
                "passwordModal"
            );


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();

    });


    // ==========================================
    // ALTERAR SENHA
    // ==========================================

    passwordForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const currentPassword =
                document.getElementById(
                    "currentPassword"
                ).value;

            const newPassword =
                document.getElementById(
                    "newPassword"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                !currentPassword ||
                !newPassword ||
                !confirmPassword
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;

            }


            if (newPassword.length < 6) {

                alert(
                    "A nova senha deve ter pelo menos 6 caracteres."
                );

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "As senhas não são iguais."
                );

                return;

            }


            alert(
                "Senha alterada com sucesso! 🔐"
            );


            passwordForm.reset();


            const modalElement =
                document.getElementById(
                    "passwordModal"
                );


            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );


            modal.hide();

        }

    );


    // ==========================================
    // INTERESSES
    // ==========================================

    interestButton.addEventListener(
        "click",
        () => {

            const interesses = [

                "Cabelo",
                "Maquiagem",
                "Tranças",
                "Estética",
                "Empreendedorismo",
                "Marketing",
                "Moda",
                "Gestão"

            ];


            const escolha =
                prompt(
                    "Digite uma nova área de interesse:\n\n" +
                    interesses.join(" • ")
                );


            if (!escolha) {
                return;
            }


            const tags =
                document.querySelector(
                    ".interest-tags"
                );


            const novaTag =
                document.createElement("span");


            novaTag.innerHTML = `

                <i class="bi bi-stars"></i>

                ${escolha}

            `;


            tags.appendChild(novaTag);

        }

    );


    // ==========================================
    // MENU MOBILE
    // ==========================================

    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("show");

            overlay.classList.toggle("show");

        }
    );


    overlay.addEventListener(
        "click",
        () => {

            sidebar.classList.remove("show");

            overlay.classList.remove("show");

        }
    );


    // ==========================================
    // LINKS DO MENU
    // ==========================================

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar a"
        );


    sidebarLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 768
                ) {

                    sidebar.classList.remove(
                        "show"
                    );

                    overlay.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


    // ==========================================
    // PESQUISA
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    const termo =
                        searchInput.value
                        .trim();


                    if (!termo) {
                        return;
                    }


                    alert(
                        `Pesquisando por: ${termo}`
                    );

                }

            }
        );

    }


    // ==========================================
    // ANIMAÇÃO DOS CARDS
    // ==========================================

    const cards =
        document.querySelectorAll(
            ".profile-card, .stat-card"
        );


    cards.forEach(
        (card, index) => {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(15px)";


            setTimeout(() => {

                card.style.transition =
                    "opacity .5s ease, transform .5s ease";

                card.style.opacity = "1";

                card.style.transform =
                    "translateY(0)";

            }, index * 80);

        }
    );

});