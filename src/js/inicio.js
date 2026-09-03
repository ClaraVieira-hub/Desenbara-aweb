// ========================================
// MENU MOBILE
// ========================================

const menuButton = document.querySelector("#menuButton");
const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector("#overlay");


menuButton.addEventListener("click", function () {

    sidebar.classList.toggle("open");

    overlay.classList.toggle("active");

});


overlay.addEventListener("click", function () {

    sidebar.classList.remove("open");

    overlay.classList.remove("active");

});


// ========================================
// BUSCA DE CURSOS
// ========================================

const searchInput = document.querySelector("#searchInput");

const courses = document.querySelectorAll(
    ".small-course, .featured-card"
);


searchInput.addEventListener("input", function () {

    const search = searchInput.value
        .toLowerCase()
        .trim();


    courses.forEach(function (course) {

        const text = course.textContent
            .toLowerCase();


        if (text.includes(search)) {

            course.style.display = "";

        } else {

            course.style.display = "none";

        }

    });

});


// ========================================
// BOTÕES "MAIS INFORMAÇÕES"
// ========================================

const informationButtons = document.querySelectorAll(
    ".secondary-button"
);


informationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert(
            "Em breve você poderá visualizar todas as informações deste curso."
        );

    });

});


// ========================================
// BOTÕES DE INSCRIÇÃO
// ========================================

const subscribeButtons = document.querySelectorAll(
    ".primary-button:not(.status-button)"
);


subscribeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const courseCard = button.closest(
            ".featured-card"
        );


        if (courseCard) {

            const courseName =
                courseCard.querySelector("h2").textContent;


            const confirmation = confirm(
                `Deseja se inscrever no ${courseName}?`
            );


            if (confirmation) {

                button.innerHTML =
                    '<i class="bi bi-check-circle"></i> INSCRITO';

                button.style.background =
                    "linear-gradient(135deg, #7bc47f, #4e9e59)";

            }

        }

    });

});


// ========================================
// STATUS DOS CURSOS
// ========================================

const statusButtons = document.querySelectorAll(
    ".status-button"
);


statusButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert(
            "Aqui você poderá acompanhar seu progresso, aulas concluídas e certificado."
        );

    });

});


// ========================================
// ANIMAÇÃO SUAVE AO CARREGAR
// ========================================

const animatedElements = document.querySelectorAll(
    ".featured-card, .small-course, .benefit"
);


animatedElements.forEach(function (element, index) {

    element.style.opacity = "0";

    element.style.transform = "translateY(10px)";


    setTimeout(function () {

        element.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";

        element.style.opacity = "1";

        element.style.transform = "translateY(0)";

    }, index * 100);

});