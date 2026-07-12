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
    themeToggle.textContent = isDark ? 'Claro' : 'Escuro';
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

window.addEventListener('DOMContentLoaded', () => {
    const codeElement = document.getElementById('typed-code');
    const langButtons = document.querySelectorAll('.lang-btn');
    if (!codeElement || langButtons.length === 0) return;

    const snippets = {
          html: `<div>\n  <h1>Transforme cliques em clientes.</h1>\n  <p>Design, performance e código que convertem.</p>\n</div>`,
          java: `public class Pitch {\n  public static void main(String[] args) {\n    System.out.println("Código estratégico. Resultados mensuráveis.");\n}\n}`,
          python: `def main():\n    print("Do protótipo ao produto vencedor")\n    print("Soluções robustas com UX que encanta")\n\nif __name__ == "__main__":\n    main()`,
            node: `const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.end('<h1>Wallisson Elizeu</h1><p>Código que converte visitas em clientes.</p>');\n});\n\nserver.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));`,
          react: `import React from "react";\n\nfunction App() {\n  return (\n    <div>\n      <h1>Produtos digitais que as pessoas adoram usar.</h1>\n      <p>Design + Código = Experiência memorável.</p>\n    </div>\n  );\n}\n\nexport default App;`
    };

    let typingTimeout = null;
    const typingInterval = 40;

    const typeCode = (text) => {
        let index = 0;
        codeElement.textContent = '';

        const typeNext = () => {
            codeElement.textContent = text.slice(0, index);
            index += 1;
            if (index <= text.length) {
                typingTimeout = setTimeout(typeNext, typingInterval);
            }
        };

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(typeNext, 100);
    };

    const setLanguage = (lang) => {
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        typeCode(snippets[lang] || snippets.html);
    };

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.lang);
        });
    });

    setLanguage('html');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.project-card, .skill').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

