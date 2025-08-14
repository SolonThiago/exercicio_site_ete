// Aguarda até que todo o conteúdo da página seja carregado
document.addEventListener("DOMContentLoaded", function () {

    // Obtém a referência do formulário de contato pelo ID
    const formContato = document.getElementById("formContato");

    // Obtém a referência do elemento onde será exibida a mensagem de confirmação
    const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");

    // Verifica se o formulário existe na página antes de adicionar eventos
    if (formContato) {
        // Adiciona um evento para quando o formulário for enviado
        formContato.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão (evita recarregar a página)

            // Captura os valores preenchidos nos campos
            const nome = document.getElementById("nomeContato").value.trim();
            const email = document.getElementById("emailContato").value.trim();
            const telefone = document.getElementById("telefoneContato").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            // Simula envio (poderia ser substituído por uma requisição AJAX ou Fetch)
            console.log("Dados do formulário:");
            console.log("Nome:", nome);
            console.log("Email:", email);
            console.log("Telefone:", telefone);
            console.log("Mensagem:", mensagem);

            // Exibe a mensagem de confirmação ao usuário
            mensagemConfirmacao.textContent = `${nome}, sua mensagem foi enviada com sucesso!`;
            mensagemConfirmacao.classList.add("show");

            // Limpa os campos do formulário
            formContato.reset();

            // Remove a mensagem de confirmação após 3 segundos
            setTimeout(() => {
                mensagemConfirmacao.classList.remove("show");
                mensagemConfirmacao.textContent = "";
            }, 5000);
        });
    }

    // Animação de rolagem suave para links internos
    const links = document.querySelectorAll('a[href^="#"]'); // Seleciona todos os links que começam com "#"
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita o comportamento padrão
            const targetId = this.getAttribute("href"); // Obtém o destino do link
            const targetElement = document.querySelector(targetId); // Encontra o elemento de destino
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth", // Rolagem suave
                    block: "start" // Alinha no topo da tela
                });
            }
        });
    });

});
