document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registrationForm");
    const cadastroButton = document.querySelector("#cadastroButton");
    const content = document.querySelector(".box");
    const loaderContainer = document.querySelector(".loader-container");

    loaderContainer.style.display = "none";

    cadastroButton.addEventListener("click", function () {
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.replace(/\D/g, '');
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("Confirmarsenha").value;

        const errorMessages = [];

        const errorContainer = document.createElement("div");
        errorContainer.classList.add("error-message");
        errorContainer.innerHTML = "<ul></ul>";

        const errorList = errorContainer.querySelector("ul");

        if (nome === "") {
            errorMessages.push("O campo Nome Completo é obrigatório.");
        }

        if (email === "") {
            errorMessages.push("O campo E-mail é obrigatório.");
        } else if (!email.includes("@")) {
            errorMessages.push("O campo E-mail deve ser um endereço de e-mail válido.");
        }

        if (telefone.length !== 11) {
            errorMessages.push("O campo Telefone deve conter 11 números.");
        }

        if (senha.length < 6) {
            errorMessages.push("A senha deve ter no mínimo 6 caracteres.");
        } else if (!/[A-Z]/.test(senha)) {
            errorMessages.push("A senha deve conter pelo menos uma letra maiúscula.");
        } else if (!/[a-z]/.test(senha)) {
            errorMessages.push("A senha deve conter pelo menos uma letra minúscula.");
        } else if (!/\d/.test(senha)) {
            errorMessages.push("A senha deve conter pelo menos um número.");
        }

        if (senha !== confirmarSenha) {
            errorMessages.push("As senhas não coincidem.");
        }

        errorList.innerHTML = errorMessages.map(message => `<li>${message}</li>`).join("");

        const existingErrorContainer = form.querySelector(".error-message");
        if (existingErrorContainer) {
            form.removeChild(existingErrorContainer);
        }

        if (errorMessages.length > 0) {
            form.appendChild(errorContainer);

            setTimeout(function () {
                form.removeChild(errorContainer);
            }, 5000);
        } else {
            content.style.display = "none"; // Ocultar todo o conteúdo
            loaderContainer.style.display = "block"; // Exibir tela de carregamento

            setTimeout(function () {
                window.location.href = "/pratos";
            }, 2000);
        }
    });
});
