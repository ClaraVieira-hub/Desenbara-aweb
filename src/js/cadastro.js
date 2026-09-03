// ==============================
// SELECIONAR ELEMENTOS
// ==============================

const formulario = document.querySelector("#cadastroForm");

const nome = document.querySelector("#nome");

const email = document.querySelector("#email");

const senha = document.querySelector("#senha");

const confirmarSenha = document.querySelector("#confirmarSenha");


// ==============================
// ENVIO DO FORMULÁRIO
// ==============================

formulario.addEventListener("submit", function(event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();


    // Pega os valores
    const nomeValor = nome.value.trim();

    const emailValor = email.value.trim();

    const senhaValor = senha.value;

    const confirmarSenhaValor = confirmarSenha.value;


    // ==============================
    // VALIDAÇÕES
    // ==============================

    if (nomeValor === "") {

        alert("Digite seu nome.");

        nome.focus();

        return;
    }


    if (emailValor === "") {

        alert("Digite seu email ou telefone.");

        email.focus();

        return;
    }


    if (senhaValor === "") {

        alert("Digite uma senha.");

        senha.focus();

        return;
    }


    // Senha mínima
    if (senhaValor.length < 6) {

        alert("A senha deve ter pelo menos 6 caracteres.");

        senha.focus();

        return;
    }


    if (confirmarSenhaValor === "") {

        alert("Confirme sua senha.");

        confirmarSenha.focus();

        return;
    }


    // Verifica se as senhas são iguais
    if (senhaValor !== confirmarSenhaValor) {

        alert("As senhas não são iguais.");

        confirmarSenha.focus();

        return;
    }


    // ==============================
    // CADASTRO APROVADO
    // ==============================

    alert("Cadastro realizado com sucesso!");


    // Limpa o formulário
    formulario.reset();


    // Futuramente:
    // window.location.href = "index.html";

});