// Seleciona o formulário
const formulario = document.querySelector("form");

// Seleciona os campos
const email = document.querySelector("#email");
const senha = document.querySelector("#senha");

// Quando o usuário enviar o formulário
formulario.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();

    // Remove espaços desnecessários
    const emailValor = email.value.trim();
    const senhaValor = senha.value.trim();

    // Verifica se o email/telefone foi preenchido
    if (emailValor === "") {
        alert("Digite seu email ou telefone.");
        email.focus();
        return;
    }

    // Verifica se a senha foi preenchida
    if (senhaValor === "") {
        alert("Digite sua senha.");
        senha.focus();
        return;
    }

    // Verifica o tamanho mínimo da senha
    if (senhaValor.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        senha.focus();
        return;
    }

    // Se tudo estiver preenchido
    alert("Login realizado com sucesso!");


});