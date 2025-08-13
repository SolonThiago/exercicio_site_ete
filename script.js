// Função para enviar o formulário de contato
function enviarContato(event) {
    event.preventDefault(); // Evita que o formulário seja enviado de verdade

    const nome = document.getElementById('nomeContato').value;
    const email = document.getElementById('emailContato').value;
    const telefone = document.getElementById('telefoneContato').value;
    const mensagem = document.getElementById('mensagem').value;
    const msgConfirmacao = document.getElementById('mensagem-confirmacao');

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !telefone || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Exibe a mensagem de confirmação
    msgConfirmacao.textContent = `✅ ${nome}, sua mensagem foi enviada com sucesso!`;
    msgConfirmacao.style.color = "green";
    msgConfirmacao.classList.add('show');

    // Limpa os campos do formulário
    document.getElementById('formContato').reset();

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        msgConfirmacao.textContent = "";
        msgConfirmacao.classList.remove('show');
    }, 5000);
}

// Função para adicionar animações aos elementos quando entram na viewport
function observeElements() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Função para smooth scroll nos links de navegação
function setupSmoothScroll() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar efeito de digitação no título principal
function typewriterEffect() {
    const title = document.querySelector('.title-animation');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// Função para adicionar efeito de paralaxe suave
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.hero');
        
        parallax.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Função para destacar o link ativo na navegação
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.backgroundColor = '#98A1BC';
            link.style.transform = 'translateY(-2px)';
        }
    });
}

// Função para adicionar efeito de loading
function addLoadingEffect() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Inicia as animações após o carregamento
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('.title-animation, .subtitle-animation, .description-animation');
            animatedElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.animationPlayState = 'running';
                }, index * 200);
            });
        }, 300);
    });
}

// Função para validar campos em tempo real
function setupRealTimeValidation() {
    const emailInput = document.getElementById('emailContato');
    const phoneInput = document.getElementById('telefoneContato');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = 'red';
                this.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.3)';
            } else {
                this.style.borderColor = '#98A1BC';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove caracteres não numéricos
            let value = this.value.replace(/\D/g, '');
            
            // Aplica máscara brasileira
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                value = value.replace(/(\d{2})(\d{1})/, '($1) $2');
            }
            
            this.value = value;
        });
    }
}

// Função principal que inicializa todas as funcionalidades
function init() {
    // Conecta a função ao evento de submit do formulário
    const form = document.getElementById('formContato');
    if (form) {
        form.addEventListener('submit', enviarContato);
    }
    
    // Inicializa outras funcionalidades
    observeElements();
    setupSmoothScroll();
    setupParallax();
    highlightActiveLink();
    addLoadingEffect();
    setupRealTimeValidation();
}

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', init);

// Adiciona compatibilidade com browsers mais antigos
if (!window.IntersectionObserver) {
    // Fallback para browsers sem suporte ao IntersectionObserver
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}