document.addEventListener('DOMContentLoaded', () => {

    // 1. Efecto de Scroll en el Header
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // 2. Simulación de Carrito
    const addButtons = document.querySelectorAll('.btn-add');
    const cartBadge = document.querySelector('.cart-badge');
    let cartCount = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartBadge.innerText = cartCount;

            // Feedback visual simple
            button.innerText = '¡Añadido!';
            button.style.borderColor = 'var(--accent-orange)';

            setTimeout(() => {
                button.innerText = 'Añadir';
                button.style.borderColor = 'var(--accent-purple)';
            }, 1000);
        });
    });

    // 3. Simulación de Buscador
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
        const query = prompt('¿Qué vinilo estás buscando?');
        if (query) {
            alert(`Buscando: ${query}... (Esta es una demo funcional)`);
        }
    });

    // 4. Newsletter Feedback
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        alert(`¡Gracias! Hemos registrado a: ${email}. Pronto recibirás noticias de Flowstage.`);
        e.target.reset();
    });

    // 5. Smooth Scroll para los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });

    });
    // En tu script.js original, añade esto:
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'checkout/checkout.html';
    });
});