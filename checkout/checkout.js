document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchase-form');
    const modal = document.getElementById('success-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    
    const subtotalDisplay = document.querySelector('.summary-totals .total-row:nth-child(1) span:nth-child(2)');
    const totalDisplay = document.querySelector('.total-row.final span:nth-child(2)');

    // Función centralizada para renderizar y hacer los cálculos
    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('flowstage_cart')) || [];

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p class="text-dim" style="text-align:center; padding:20px; font-size:0.9rem;">Tu carrito está vacío</p>`;
            subtotalDisplay.innerText = "0.00€";
            totalDisplay.innerText = "0.00€";
            if (purchaseForm.querySelector('button[type="submit"]')) {
                purchaseForm.querySelector('button[type="submit"]').disabled = true;
                purchaseForm.querySelector('button[type="submit"]').innerText = 'Carrito Vacío';
            }
        } else {
            cartItemsList.innerHTML = '';
            let currentTotal = 0;

            // Recorremos el carrito mapeando el índice (index) de cada elemento
            cart.forEach((item, index) => {
                currentTotal += item.price;

                const itemHTML = `
                    <div class="item-mini" data-index="${index}">
                        <img src="../${item.img}" class="vinyl-img" alt="${item.title}">
                        <div class="item-info">
                            <p>${item.title}</p>
                            <span>${item.price.toFixed(2)}€</span>
                        </div>
                        <button type="button" class="btn-remove" title="Quitar del carrito">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                cartItemsList.innerHTML += itemHTML;
            });

            subtotalDisplay.innerText = `${currentTotal.toFixed(2)}€`;
            totalDisplay.innerText = `${currentTotal.toFixed(2)}€`;
            
            // Habilitar botón de compra si hay items
            if (purchaseForm.querySelector('button[type="submit"]')) {
                purchaseForm.querySelector('button[type="submit"]').disabled = false;
                purchaseForm.querySelector('button[type="submit"]').innerText = 'Confirmar Pedido';
            }

            // Asignar eventos a los botones de eliminar recién creados
            initRemoveEvents();
        }
    }

    // Escucha de clics en los botones de eliminar
    function initRemoveEvents() {
        const removeButtons = document.querySelectorAll('.btn-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Obtenemos el índice del contenedor padre
                const itemRow = this.closest('.item-mini');
                const indexToRemove = parseInt(itemRow.getAttribute('data-index'));

                // Traemos el localStorage actual, eliminamos el elemento del array y guardamos
                let cart = JSON.parse(localStorage.getItem('flowstage_cart')) || [];
                cart.splice(indexToRemove, 1); // Borra 1 elemento en la posición dada
                localStorage.setItem('flowstage_cart', JSON.stringify(cart));

                // Volvemos a pintar el carrito con los precios actualizados
                renderCart();
            });
        });
    }

    // Inicializar el carrito al cargar la página
    renderCart();

    // Procesamiento del formulario de compra
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = purchaseForm.querySelector('button[type="submit"]');
        btn.innerText = 'Procesando...';
        btn.disabled = true;

        setTimeout(() => {
            modal.style.display = 'flex';
            localStorage.removeItem('flowstage_cart');
        }, 2000);
    });
});
