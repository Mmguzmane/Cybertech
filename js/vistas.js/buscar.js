function redirectToPage() {
    const input = document.getElementById('search-box').value.toLowerCase();
    let page = '';

    // Determina la página a redirigir según la entrada
    if (input.includes('pc') || input.includes('laptop')) {
        page = '../Pc-Laptops.html';  // Ajustado según la estructura
    } else if (input.includes('mouse')) {
        page = '../Ratones.html';  // Ajustado según la estructura
    } else if (input.includes('teclado')) {
        page = '../Teclados.html';  // Ajustado según la estructura
    } else if (input.includes('contacto')) {
        page = '../contacto.html';  // Ajustado según la estructura
    } else if (input.includes('servicios')) {
        page = '../servicios.html';  // Ajustado según la estructura
    } else {
        alert('No se encontró una coincidencia. Por favor intenta con "PC", "laptop", "mouse", "teclado", "contacto" o "servicios".');
        return;
    }

    // Redirige a la página correspondiente
    window.location.href = page;
}
