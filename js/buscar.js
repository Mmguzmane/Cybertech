function redirectToPage() {
    const input = document.getElementById('search-box').value.toLowerCase();
    let page = '';

    // Determina la página a redirigir según la entrada
    if (input.includes('pc')) {
        page = 'Pc-Laptops.html';
    } else if (input.includes('laptop')) {
        page = 'Pc-Laptops.html';
    } else if (input.includes('mouse')) {
        page = 'Ratones.html';
    } else if (input.includes('teclado')) {
        page = 'Teclados.html';
    } else if (input.includes('contacto')) {
        page = 'contacto.html';
    } else if (input.includes('servicios')) {
        page = 'servicios.html'; // Asegúrate de tener esta página
    } else {
        alert('No se encontró una coincidencia. Por favor intenta con "PC", "laptop", "mouse", "teclado", "contacto" o "servicios".');
        return;
    }

    // Redirige a la página correspondiente
    window.location.href = page;
}




// RECLAMO MENSAJE

document.getElementById('reclamoForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    alert('¡Reclamo enviado exitosamente!');

    
    this.reset(); 
});




