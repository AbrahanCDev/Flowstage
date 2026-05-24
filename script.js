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

    // 2. Gestión Real de Carrito con LocalStorage
    const addButtons = document.querySelectorAll('.btn-add');
    const cartBadge = document.querySelector('.cart-badge');
    
    // Recuperamos el carrito que ya exista o creamos uno vacío si es la primera vez
    let cart = JSON.parse(localStorage.getItem('flowstage_cart')) || [];
    
    // Sincronizar el número del badge al cargar la página
    cartBadge.innerText = cart.length;

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Capturamos los datos del atributo data del botón
            const title = button.getAttribute('data-title');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img');

            // Añadimos el disco seleccionado al array del carrito
            cart.push({ title, price, img });

            // Guardamos la lista actualizada en LocalStorage convirtiéndola a texto JSON
            localStorage.setItem('flowstage_cart', JSON.stringify(cart));

            // Actualizamos el número del contador visual
            cartBadge.innerText = cart.length;

            // Feedback visual clásico que tenías
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