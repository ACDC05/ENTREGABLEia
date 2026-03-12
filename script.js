
/* ========================================
   JAVASCRIPT DEL PROYECTO DE GRADO
   Tecnología Actual y Su Evolución
   ======================================== */

// ============ NAVEGACIÓN SUAVE ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ CHATBOT ============
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('active');
}

function navigateTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        addMessage('bot', `¡Perfecto! Te llevo a la sección de ${getSectionName(sectionId)}.`);
    }
    toggleChatbot();
}

function getSectionName(sectionId) {
    const names = {
        'introduccion': 'Introducción',
        'objetivos': 'Objetivos',
        'marco-teorico': 'Marco Teórico',
        'metodologia': 'Metodología',
        'resultados': 'Resultados',
        'conclusiones': 'Conclusiones'
    };
    return names[sectionId] || sectionId;
}

function showAbout() {
    addMessage('bot', `Este proyecto titulado "Tecnología Actual y Su Evolución" fue desarrollado por Anibal Camilo Dulcey Cardenas de la Universidad Libre, Barranquilla, Colombia. ¿Te gustaría explorar alguna sección específica?`);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage('user', message);
        input.value = '';
        
        // Respuestas del chatbot
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addMessage('bot', response);
        }, 500);
    }
}

function addMessage(type, text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        'introduccion': 'La sección de Introducción presenta la contextualización del tema sobre tecnología y su evolución. <a href="#" onclick="navigateTo(\'introduccion\')">Ver Introducción</a>',
        'objetivos': 'Aquí encontrarás el objetivo general y los objetivos específicos de esta investigación. <a href="#" onclick="navigateTo(\'objetivos\')">Ver Objetivos</a>',
        'objetivo': 'Aquí encontrarás el objetivo general y los objetivos específicos de esta investigación. <a href="#" onclick="navigateTo(\'objetivos\')">Ver Objetivos</a>',
        'marco': 'El Marco Teórico muestra la línea de tiempo de la evolución tecnológica desde 1969. <a href="#" onclick="navigateTo(\'marco-teorico\')">Ver Marco Teórico</a>',
        'metodologia': 'La Metodología describe los pasos de investigación utilizados. <a href="#" onclick="navigateTo(\'metodologia\')">Ver Metodología</a>',
        'resultados': 'En Resultados encontrarás los principales hallazgos de la investigación. <a href="#" onclick="navigateTo(\'resultados\')">Ver Resultados</a>',
        'conclusiones': 'Las Conclusiones sintetizan los hallazgos finales del proyecto. <a href="#" onclick="navigateTo(\'conclusiones\')">Ver Conclusiones</a>',
        'hola': '¡Hola! 👋 ¿En qué puedo ayudarte? Puedes preguntarme sobre cualquier sección del proyecto.',
        'gracias': '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?',
        'ayuda': 'Puedo guiarte a cualquiera de estas secciones: Introducción, Objetivos, Marco Teórico, Metodología, Resultados o Conclusiones. ¿Cuál te gustaría ver?',
        'autor': 'El proyecto fue desarrollado por Anibal Camilo Dulcey Cardenas de la Universidad Libre, Barranquilla, Colombia.',
        'universidad': 'Universidad Libre - Barranquilla, Colombia',
        'que es': 'Este proyecto analiza la evolución de la tecnología desde sus orígenes hasta la actualidad, incluyendo hitos como ARPANET (1969), la World Wide Web (1989), los smartphones (2007) y la IA generativa (2022).',
        'inteligencia artificial': 'La Inteligencia Artificial (IA) es una de las revoluciones tecnológicas más importantes de nuestro tiempo. En 2022 surgieron herramientas como ChatGPT que han transformado la productividad y el acceso al conocimiento.'
    };

    // Buscar coincidencia en las respuestas
    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            return value;
        }
    }

    return `Gracias por tu mensaje: "${message}". Puedo ayudarte a navegar por las secciones del proyecto. ¿Te gustaría ver la <a href="#" onclick="navigateTo('introduccion')">Introducción</a>, <a href="#" onclick="navigateTo('objetivos')">Objetivos</a>, <a href="#" onclick="navigateTo('resultados')">Resultados</a> u otra sección?`;
}

// ============ REGISTRO ============
function openRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Habilitar scroll
}

function submitRegistration(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        id: Date.now(),
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        institution: form.institution.value,
        interest: form.interest.value,
        comments: form.comments.value,
        date: new Date().toLocaleString()
    };
    
    // Guardar en localStorage
    let registrations = JSON.parse(localStorage.getItem('projectRegistrations') || '[]');
    registrations.push(formData);
    localStorage.setItem('projectRegistrations', JSON.stringify(registrations));
    
    // Mostrar mensaje de éxito
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.classList.add('show');
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
    
    // Resetear formulario
    form.reset();
    
    // Mostrar registros
    showRegistrations();
}

function showRegistrations() {
    const container = document.getElementById('registrationsContainer');
    const listSection = document.getElementById('registrationsList');
    
    if (!container || !listSection) return;
    
    const registrations = JSON.parse(localStorage.getItem('projectRegistrations') || '[]');
    
    if (registrations.length > 0) {
        listSection.style.display = 'block';
        container.innerHTML = registrations.map(reg => `
            <div class="registration-item">
                <div class="name">${escapeHtml(reg.name)}</div>
                <div class="email">${escapeHtml(reg.email)} | ${reg.date}</div>
            </div>
        `).join('');
    }
}

// Función para evitar XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registerModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegisterModal();
            }
        });
    }
});

// ============ ANIMACIONES DE SCROLL ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos con clase fade-in
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// ============ EFECTO DEL HEADER AL HACER SCROLL ============
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, #1a237e, #0d47a1)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a237e, #0d47a1)';
        }
    }
});

// ============ MENÚ RESPONSIVE (MÓVIL) ============
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('mobile-active');
    }
}

// ============ DETECTAR VISIBILIDAD DE SECCIONES ============
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ============ CONSOLIDA EL CHATBOT (MEJORAS) ============
// Guardar conversaciones en localStorage
function saveChatHistory(messages) {
    localStorage.setItem('chatHistory', JSON.stringify(messages.slice(-20))); // Guardar últimos 20 mensajes
}

function loadChatHistory() {
    return JSON.parse(localStorage.getItem('chatHistory') || '[]');
}

// ============ EFECTO PARALLAX SUAVE EN HERO ============
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ============ CONTADOR ANIMADO PARA ESTADÍSTICAS ============
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card .number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = !isNaN(target.replace(/[^0-9]/g, ''));
        
        if (isNumber && target.includes('+')) {
            const num = parseInt(target);
            let current = 0;
            const increment = num / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    counter.textContent = num + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', animateCounters);

console.log('✅ Proyecto de Grado - Tecnología Actual y Su Evolución');
console.log('👨‍🎓 Autor: Anibal Camilo Dulcey Cardenas');
console.log('🏛️ Universidad Libre - Barranquilla, Colombia');

