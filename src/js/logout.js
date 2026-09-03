

const btnSair = document.querySelector("#btnSair");

const btnCancelar = document.querySelector("#btnCancelar");



btnSair.addEventListener("click", function() {

    // Mensagem de confirmação
    alert("Você saiu da sua conta.");

    // Volta para a tela de login
    window.location.href = "index.html";

});




btnCancelar.addEventListener("click", function() {

    // Volta para a página inicial
    window.history.back();

});