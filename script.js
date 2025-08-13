/**
 * Arquivo JavaScript para interações do site SolonDev
 * Contém funções para animações e manipulação de formulários
 */

// Função executada quando o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa as animações de entrada
    initializeAnimations();
    
    // Adiciona suavidade na navegação
    initializeSmoothScroll();

    // Vincula o envio do formulário à função enviarFormulario
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', enviarFormulario);
    }

    // Adiciona interatividade aos links das redes sociais
    initializeSocialLinks();
});

/**
 * Inicializa as animações de entrada dos elementos
 * Aplica a classe fade-in com delay escalonado
 */
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Adiciona comportamento suave ao scroll para links internos
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Adiciona interatividade aos links das redes sociais
 */
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.15)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        link.addEventListener('click', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.15)';
            }, 100);
        });
    });
}

/**
 * Função principal para processar o envio do formulário de contato
 */
function enviarFormulario(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nomeContato").value.trim();
    const email = document.getElementById("emailContato").value.trim();
    const telefone = document.getElementById("telefoneContato").value.trim();
    const mensagemTexto = document.getElementById("mensagem").value.trim();
    
    // Validar formulário primeiro
    if (!validarFormulario(nome, email, telefone, mensagemTexto)) {
        return;
    }
    
    // Mostrar loading no botão
    mostrarLoadingButton();
    
    // Simular envio (você pode substituir por uma requisição real)
    setTimeout(() => {
        processarEnvio(nome);
        limparFormulario();
        restaurarButton();
    }, 1500);
}

/**
 * Valida os campos do formulário
 */
function validarFormulario(nome, email, telefone, mensagem) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nome) {
        mostrarErro("Por favor, preencha o nome completo.");
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        mostrarErro("Por favor, insira um email válido.");
        return false;
    }
    if (!telefone) {
        mostrarErro("Por favor, preencha o telefone.");
        return false;
    }
    if (!mensagem) {
        mostrarErro("Por favor, escreva uma mensagem.");
        return false;
    }
    return true;
}

/**
 * Processa o envio do formulário e mostra mensagem de sucesso
 */
function processarEnvio(nome) {
    const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");
    
    if (!mensagemConfirmacao) {
        console.error("Elemento de confirmação não encontrado!");
        return;
    }

    const mensagem = `
        <div class="alert-message">
            <h3>✅ Mensagem Enviada!</h3>
            <p>${nome}, sua mensagem foi enviada com sucesso!</p>
        </div>
    `;
    
    mensagemConfirmacao.innerHTML = mensagem;
    mensagemConfirmacao.style.display = 'block';
    mensagemConfirmacao.style.opacity = '1';
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        mensagemConfirmacao.style.opacity = '0';
        setTimeout(() => {
            mensagemConfirmacao.style.display = 'none';
            mensagemConfirmacao.innerHTML = '';
        }, 500);
    }, 5000);
}

/**
 * Mostra mensagem de erro
 */
function mostrarErro(mensagem) {
    const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");
    
    if (!mensagemConfirmacao) {
        console.error("Elemento de confirmação não encontrado!");
        return;
    }

    const erroHtml = `
        <div class="error-message">
            <strong>❌ Erro:</strong> ${mensagem}
        </div>
    `;
    
    mensagemConfirmacao.innerHTML = erroHtml;
    mensagemConfirmacao.style.display = 'block';
    mensagemConfirmacao.style.opacity = '1';
    
    setTimeout(() => {
        mensagemConfirmacao.style.opacity = '0';
        setTimeout(() => {
            mensagemConfirmacao.style.display = 'none';
            mensagemConfirmacao.innerHTML = '';
        }, 500);
    }, 3000);
}

/**
 * Limpa todos os campos do formulário
 */
function limparFormulario() {
    document.getElementById("nomeContato").value = '';
    document.getElementById("emailContato").value = '';
    document.getElementById("telefoneContato").value = '';
    document.getElementById("mensagem").value = '';
}

/**
 * Mostra loading no botão
 */
function mostrarLoadingButton() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
    }
}

/**
 * Restaura o botão ao estado original
 */
function restaurarButton() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton && submitButton.dataset.originalText) {
        submitButton.textContent = submitButton.dataset.originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

/**
 * Efeito parallax suave
 */
if (document.querySelector('.hero')) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

/**
 * Adiciona estilos CSS dinamicamente
 */
const style = document.createElement('style');
style.textContent = `
    /* Estilos para mensagens de confirmação */
    #mensagem-confirmacao {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 300px;
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        display: none;
    }
    
    .alert-message {
        background: linear-gradient(135deg, #98A1BC, #DED3C4);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(85, 88, 121, 0.3);
        color: #555879;
        animation: slideIn 0.3s ease-out;
    }
    
    .error-message {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        animation: shake 0.5s ease-in-out;
    }
    
    /* Animações */
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    /* Loading spinner */
    .loading-spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);