// ==================== CONFIGURATION ====================
const CONFIG = {
    typingSpeed: 100,
    typingDelay: 2000,
    particleCount: 100,
    toastDuration: 3000
};

// ==================== SAMPLE SCRIPTS DATA ====================
const scriptsData = [
    {
        id: 1,
        name: "Anti Waves | Escape Tsunami for Brainros",
        description: "Este script es un script sencillo que hice por aburrimiento. Elimina el daño de todas las olas (solo ten cuidado con las olas que salen del piso!).",
        features: [
            "Eliminar daño de olas - Podrás recoger cualquier brainrot sin preocupaciones",
            "Optimizado - Consume pocos recursos"
        ],
        category: "exploit",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12c2.5-3 5-3 7 0 2 3 4.5 3 7 0 2.5-3 5-3 7 0"></path>
    <path d="M2 17c2.5-3 5-3 7 0 2 3 4.5 3 7 0 2.5-3 5-3 7 0"></path>
    <path d="M2 7c2.5-3 5-3 7 0 2 3 4.5 3 7 0 2.5-3 5-3 7 0"></path>
</svg>`,
        code: ` loadstring(game:HttpGet("https://raw.githubusercontent.com/gsm231/Anti-Waves/refs/heads/main/V0.1"))()`
    },
];

// ==================== TYPING ANIMATION ====================
const typingTexts = ['Scripts Para Roblox', 'LJZG EXP'];
let currentTextIndex = 0;

function typeText(element, speed = CONFIG.typingSpeed) {
    const text = typingTexts[currentTextIndex];
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                eraseText(element, speed);
            }, 3500);
        }
    }, speed);
}

function eraseText(element, speed) {
    let text = element.textContent;
    
    const interval = setInterval(() => {
        if (text.length > 0) {
            text = text.slice(0, -1);
            element.textContent = text;
        } else {
            clearInterval(interval);
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(() => {
                typeText(element, speed);
            }, 800);
        }
    }, speed / 2);
}

// ==================== PARTICLES CANVAS ====================
function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.2;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==================== HEADER SCROLL ====================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const burger = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burger.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// ==================== LOAD SCRIPTS ====================
function loadScripts() {
    const grid = document.getElementById('scriptsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    scriptsData.forEach((script, index) => {
        const card = document.createElement('div');
        card.className = 'script-card';
        card.setAttribute('data-category', script.category);
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="script-header">
                <div class="script-icon">${script.icon}</div>
                <span class="script-badge">${script.category}</span>
            </div>
            <h3 class="script-title">${script.name}</h3>
            <p class="script-description">${script.description}</p>
            <div class="script-buttons">
                <button class="script-btn btn-view" data-id="${script.id}">Ver Código</button>
                <button class="script-btn btn-copy" data-id="${script.id}">Copiar</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    attachScriptListeners();
}

// ==================== SCRIPT LISTENERS ====================
function attachScriptListeners() {
    const viewButtons = document.querySelectorAll('.btn-view');
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const scriptId = parseInt(this.getAttribute('data-id'));
            const script = scriptsData.find(s => s.id === scriptId);
            if (script) {
                openModal(script);
            }
        });
    });
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const scriptId = parseInt(this.getAttribute('data-id'));
            const script = scriptsData.find(s => s.id === scriptId);
            if (script) {
                copyToClipboard(script.code, this);
            }
        });
    });
}

// ==================== MODAL ====================
function openModal(script) {
    const modal = document.getElementById('scriptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalCode = document.getElementById('modalCode');
    
    modalTitle.textContent = script.name;
    modalDescription.textContent = script.description;
    
    if (script.features && script.features.length > 0) {
        modalFeatures.innerHTML = script.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
    } else {
        modalFeatures.innerHTML = '<li>No hay características listadas</li>';
    }
    
    modalCode.textContent = script.code;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('scriptModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initModal() {
    const modal = document.getElementById('scriptModal');
    const backdrop = document.querySelector('.modal-backdrop');
    const closeBtn = document.getElementById('modalClose');
    const copyBtn = document.getElementById('copyCodeBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!modal) return;
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = document.getElementById('modalCode').textContent;
            copyToClipboard(code, copyBtn);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const code = document.getElementById('modalCode').textContent;
            const title = document.getElementById('modalTitle').textContent;
            downloadScript(code, title);
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==================== CLIPBOARD ====================
function copyToClipboard(text, buttonElement) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = '✓ Copiado';
                buttonElement.classList.add('copied');
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('copied');
                }, 2000);
            }
            showToast('¡Código copiado al portapapeles!');
        }).catch(err => {
            console.error('Error al copiar:', err);
            fallbackCopy(text, buttonElement);
        });
    } else {
        fallbackCopy(text, buttonElement);
    }
}

function fallbackCopy(text, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            if (buttonElement) {
                const originalText = buttonElement.textContent;
                buttonElement.textContent = '✓ Copiado';
                buttonElement.classList.add('copied');
                
                setTimeout(() => {
                    buttonElement.textContent = originalText;
                    buttonElement.classList.remove('copied');
                }, 2000);
            }
            showToast('¡Código copiado al portapapeles!');
        } else {
            showToast('Error al copiar el código', 'error');
        }
    } catch (err) {
        console.error('Error en fallback copy:', err);
        showToast('Error al copiar el código', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ==================== DOWNLOAD SCRIPT ====================
function downloadScript(code, title) {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.lua`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Script descargado!');
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;
    }
    
    if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ff4444, #ff0000)';
    } else {
        toast.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, CONFIG.toastDuration);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.script-card, .skill-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== REMOVE EXTRA BOTTOM LINE ====================
function fixBottomLine() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.margin = '0';
    body.style.padding = '0';
    html.style.margin = '0';
    html.style.padding = '0';
    
    const lastElement = document.querySelector('.footer');
    if (lastElement) {
        lastElement.style.marginBottom = '0';
    }
}

// ==================== ELIMINAR OUTLINE DE NAVEGACIÓN ====================
function removeNavigationOutline() {
    document.querySelectorAll('.nav-link, .burger-menu, .btn, .script-btn, .contact-card, .modal-close').forEach(el => {
        el.addEventListener('mousedown', (e) => {
            e.preventDefault();
            el.style.outline = 'none';
        });
        
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                el.style.outline = '2px solid var(--color-primary)';
            }
        });
    });
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        setTimeout(() => {
            typeText(typingElement, 80);
        }, CONFIG.typingDelay);
    }
    
    initParticles();
    initScrollProgress();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    loadScripts();
    initModal();
    initScrollAnimations();
    fixBottomLine();
    removeNavigationOutline();
    
    console.log('%c LJZG Scripts Loaded! ', 'background: linear-gradient(90deg, #00d4ff, #00ffff); color: #0a0e1a; font-size: 20px; font-weight: bold; padding: 10px;');
});

window.addEventListener('resize', fixBottomLine);
