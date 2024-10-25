 function validateForm() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea');
        
        for (const input of inputs) {
            if (!input.value.trim()) {
                alert('Por favor, complete todos los campos.');
                return false; 
            }
        }
        
        alert('¡Formulario enviado con éxito!');
        return true; 
    }

