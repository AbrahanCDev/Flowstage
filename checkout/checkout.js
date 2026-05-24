document.addEventListener('DOMContentLoaded', () => {
    const purchaseForm = document.getElementById('purchase-form');
    const modal = document.getElementById('success-modal');

    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulamos una carga de procesamiento
        const btn = purchaseForm.querySelector('button');
        btn.innerText = 'Procesando...';
        btn.disabled = true;

        setTimeout(() => {
            modal.style.display = 'flex';
        }, 2000);
    });
});