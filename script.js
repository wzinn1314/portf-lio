const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;


const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-theme');
    themeToggle.textContent = 'Escuro';
} else {
    htmlElement.classList.remove('dark-theme');
    themeToggle.textContent = 'Claro';
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-theme');
    const isDark = htmlElement.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Escuro' : 'Claro';
});


const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const section = document.querySelector(href);
        
        if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            
            if (scrollY >= top - 100 && scrollY < top + height - 100) {
                current = href;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});


navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});


const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        
        
        alert(`Mensagem enviada com sucesso! Entraremos em contato em breve, ${name}.`);
        contactForm.reset();
    });
}


document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

