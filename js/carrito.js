document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const ticketModal = document.getElementById('ticket-modal');
    const ticketDetails = document.getElementById('ticket-details');
    const ticketNumberElement = document.getElementById('ticket-number');
    const aceptarBtn = document.getElementById('aceptar-btn');
    const finalizarCompraBtn = document.querySelector('.checkout-btn');

    let subtotal = 0;

    function generarNumeroTicket() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    function actualizarTotales() {
        subtotal = 0;

        carrito.forEach((producto) => {
            const precio = parseFloat(producto.precioNuevo.replace('S/', '').replace(',', ''));
            const totalProducto = precio * producto.cantidad;
            subtotal += totalProducto;
        });

        subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
    }

    function renderizarCarrito() {
        cartItemsContainer.innerHTML = '';

        carrito.forEach((producto, index) => {
            const precio = parseFloat(producto.precioNuevo.replace('S/', '').replace(',', ''));
            const totalProducto = precio * producto.cantidad;

            const row = `
                <tr>
                    <td class="product-details">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <span>${producto.nombre}</span>
                    </td>
                    <td>${producto.sku}</td>
                    <td>S/ ${precio.toFixed(2)}</td>
                    <td>
                        <input type="number" value="${producto.cantidad}" min="1" class="quantity-input" data-index="${index}">
                    </td>
                    <td>S/ <span class="subtotal-producto">${totalProducto.toFixed(2)}</span></td>
                </tr>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', row);
        });

        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const index = e.target.getAttribute('data-index');
                const nuevaCantidad = parseInt(e.target.value);

                if (nuevaCantidad >= 1) {
                    carrito[index].cantidad = nuevaCantidad;
                    actualizarPrecios(index);
                    actualizarTotales();
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                }
            });
        });

        actualizarTotales();
    }

    function actualizarPrecios(index) {
        const producto = carrito[index];
        const precio = parseFloat(producto.precioNuevo.replace('S/', '').replace(',', ''));
        const totalProducto = precio * producto.cantidad;

        const subtotalProductoElement = document.querySelectorAll('.subtotal-producto')[index];
        subtotalProductoElement.textContent = totalProducto.toFixed(2);
    }

    function mostrarTicket() {
        const numeroTicket = generarNumeroTicket();
        ticketNumberElement.textContent = `Número de Ticket: ${numeroTicket}`;

        let ticketHTML = '<ul>';
        let total = 0;

        carrito.forEach((producto) => {
            const precio = parseFloat(producto.precioNuevo.replace('S/', '').replace(',', ''));
            const subtotalProducto = precio * producto.cantidad;
            total += subtotalProducto;

            ticketHTML += `
                <li>
                    ${producto.nombre} - Cantidad: ${producto.cantidad} - Subtotal: S/ ${subtotalProducto.toFixed(2)}
                </li>
            `;
        });

        ticketHTML += `</ul><p><strong>Total: S/ ${total.toFixed(2)}</strong></p>`;
        ticketDetails.innerHTML = ticketHTML;

        ticketModal.classList.remove('hidden');
        document.body.classList.add('blur');
    }

    finalizarCompraBtn.addEventListener('click', () => {
        mostrarTicket();
    });

    aceptarBtn.addEventListener('click', () => {
        // Ocultar el modal del ticket
        ticketModal.classList.add('hidden');
        document.body.classList.remove('blur');

        // Limpiar el carrito y el almacenamiento local
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el HTML del carrito para reflejar que está vacío
        cartItemsContainer.innerHTML = '<tr><td colspan="5">Carrito vacío</td></tr>';
        subtotalElement.textContent = 'S/ 0.00';
        totalElement.textContent = 'S/ 0.00';

        // Redirigir o refrescar la página si es necesario
        window.location.href = 'index.html';
    });

    renderizarCarrito();
});


/*------------------------------------------------*/
/*-------------------ACUMULADOR---------------------*/
/*------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function() {
    const aceptarBtn = document.getElementById("aceptar-btn");

    aceptarBtn.addEventListener("click", function() {
        alert("Venta generada!");
    });
});



/*------------------------------------------------*/
/*-------------------ACUMULADOR---------------------*/
/*------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    // Al cargar la página, inicializamos el contador desde localStorage o empezamos en 0 si no existe
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

    // Mostrar el contador al cargar la página
    document.getElementById('cart-count').textContent = cartCount;

    // Seleccionar todos los íconos de carrito en la página
    const cartIcons = document.querySelectorAll('.fas.fa-shopping-cart');

    // Agregar evento de clic a cada ícono de carrito para incrementar el contador
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();  // Evitar la acción predeterminada del clic

            cartCount++;  // Incrementar el contador del carrito

            // Actualizar el contenido visual del contador
            document.getElementById('cart-count').textContent = cartCount;

            // Guardar el nuevo valor del contador en localStorage para mantenerlo entre recargas y cambios de página
            localStorage.setItem('cartCount', cartCount);
        });
    });

    // Evento para el botón "Aceptar"
    const aceptarBtn = document.getElementById('aceptar-btn');
    aceptarBtn.addEventListener('click', () => {
        // Reiniciar el contador de carrito
        cartCount = 0;

        // Actualizar el contenido visual del contador
        document.getElementById('cart-count').textContent = cartCount;

        // Guardar el nuevo valor del contador en localStorage
        localStorage.setItem('cartCount', cartCount);

        // Aquí puedes añadir la lógica que ya tienes para cerrar el modal o lo que necesites
        // Por ejemplo:
        // ticketModal.classList.add('hidden');
        // window.location.href = 'index.html';
    });
});
