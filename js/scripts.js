// FUNCION PARA MOSTRAR EL CONTENIDO DE LOS ICONOS
const userBtn = document.getElementById('user-btn');
const cartBtn = document.getElementById('cart-btn');
const loginModal = document.getElementById('login-modal');
const cartModal = document.getElementById('cart-modal');

let loginTimeout, cartTimeout;

function showModal(modal) {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
}

function hideModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

userBtn.addEventListener('mouseenter', () => {
    clearTimeout(loginTimeout); 
    showModal(loginModal);
});

cartBtn.addEventListener('mouseenter', () => {
    clearTimeout(cartTimeout); 
    showModal(cartModal);
});

loginModal.addEventListener('mouseenter', () => {
    clearTimeout(loginTimeout); 
    showModal(loginModal);
});


cartModal.addEventListener('mouseenter', () => {
    clearTimeout(cartTimeout); 
    showModal(cartModal);
});

userBtn.addEventListener('mouseleave', () => {
    loginTimeout = setTimeout(() => {
        if (!loginModal.matches(':hover')) {
            hideModal(loginModal);
        }
    }, 300);
});

loginModal.addEventListener('mouseleave', () => {
    loginTimeout = setTimeout(() => {
        hideModal(loginModal);
    }, 300); 
});

cartBtn.addEventListener('mouseleave', () => {
    cartTimeout = setTimeout(() => {
        if (!cartModal.matches(':hover')) {
            hideModal(cartModal);
        }
    }, 300); 
});

cartModal.addEventListener('mouseleave', () => {
    cartTimeout = setTimeout(() => {
        hideModal(cartModal);
    }, 300);
});

// --------------------------------------
// -----FUNCION DE AGREGAR PRODUCTOS ----
// --------------------------------------

// Inicializar el carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const botonesCarrito = document.querySelectorAll('.fa-shopping-cart');
const cartModalContent = document.querySelector('.cart-content');
const modal = document.getElementById('cart-modal');

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar el carrito en la página
function actualizarCarrito() {
    const tituloYBotonCerrar = `
        <button class="close-btn" aria-label="Cerrar">&times;</button>
        <h2 id="cart-title">Carrito de Compras</h2>
    `;

    cartModalContent.innerHTML = tituloYBotonCerrar;

    if (carrito.length === 0) {
        modal.style.top = '316px';
    } else if (carrito.length === 1) {
        modal.style.top = '400px';
    } else if (carrito.length > 1) {
        modal.style.top = '430px';
    }

    carrito.forEach((producto, index) => {
        const itemHTML = `
            <div class="cart-item" data-index="${index}">
                <div class="item-image">
                    <img src="${producto.imagen}" alt="${producto.nombre}" />
                </div>
                <div class="item-details">
                    <span>${producto.sku}</span>
                    <h4>${producto.nombre}</h4>
                    <div class="item-quantity">
                        <button class="qty-btn decrease" aria-label="Disminuir cantidad">-</button>
                        <input type="number" value="${producto.cantidad}" min="1" aria-label="Cantidad de producto">
                        <button class="qty-btn increase" aria-label="Aumentar cantidad">+</button>
                    </div>
                    <div class="price-info">
                        <span class="old-price">${producto.precioAntiguo}</span>
                        <span class="new-price">${producto.precioNuevo}</span>
                    </div>
                </div>
            </div>
        `;
        cartModalContent.insertAdjacentHTML('beforeend', itemHTML);
    });

    agregarSubtotalYAcciones();
    agregarEventosCantidad();
}


// Calcular y mostrar el subtotal del carrito
function agregarSubtotalYAcciones() {
    let subtotal = 0;
    carrito.forEach((producto) => {
        const precio = parseFloat(producto.precioNuevo.replace('S/', '').replace(',', ''));
        subtotal += precio * producto.cantidad;
    });

    const subtotalHTML = `
        <div class="cart-subtotal">
            <span>Subtotal:</span>
            <span class="subtotal-price">S/ ${subtotal.toFixed(2)}</span>
        </div>
    `;
    cartModalContent.insertAdjacentHTML('beforeend', subtotalHTML);

    const accionesHTML = `
        <div class="cart-actions">
            <button class="cart-btn finalizar-compra">Finalizar Compra</button>
        </div>
    `;
    cartModalContent.insertAdjacentHTML('beforeend', accionesHTML);
    document.querySelector('.finalizar-compra').addEventListener('click', finalizarCompra);
}

function finalizarCompra() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    window.location.href = 'carrito.html';
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-btn')) {
        modal.classList.remove('show');
    }
});

// Agregar eventos para modificar la cantidad de productos
function agregarEventosCantidad() {
    const botonesDisminuir = document.querySelectorAll('.qty-btn.decrease');
    const botonesAumentar = document.querySelectorAll('.qty-btn.increase');

    botonesDisminuir.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
                guardarCarrito();
                actualizarCarrito();
            }
        });
    });

    botonesAumentar.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            carrito[index].cantidad++;
            guardarCarrito();
            actualizarCarrito();
        });
    });
}

// Agregar productos al carrito al hacer clic en el botón
botonesCarrito.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();

        const productoElement = btn.closest('.box');
        const producto = {
            imagen: productoElement.querySelector('img').src,
            nombre: productoElement.querySelector('h3').textContent,
            precioNuevo: productoElement.querySelector('.price').childNodes[0].textContent.trim(),
            precioAntiguo: productoElement.querySelector('.price').childNodes[1].textContent.trim(),
            cantidad: 1, 
            sku: `SKU-${Math.random().toString(36).substr(2, 9)}` 
        };

        carrito.push(producto);

        guardarCarrito();
        actualizarCarrito();
        modal.classList.add('show');
    });
});


document.addEventListener('DOMContentLoaded', actualizarCarrito);

document.querySelector('.close-btn').addEventListener('click', () => {
    modal.classList.remove('show');
});



/*------------------------------------------------*/
/*-------------------ACUMULADOR---------------------*/
/*------------------------------------------------*/
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

document.getElementById('cart-count').textContent = cartCount;

const cartIcons = document.querySelectorAll('.fas.fa-shopping-cart');

cartIcons.forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault();  

        cartCount++;  

        document.getElementById('cart-count').textContent = cartCount;

        localStorage.setItem('cartCount', cartCount);
    });
});


/*------------------------------------------------*/
/*------------------------------------------------*/
/*------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    let subMenuTimeout;
    let mainMenuTimeout;

    const perifericosDropdown = document.getElementById('perifericos-dropdown');
    const subDropdown = perifericosDropdown.querySelector('.sub-dropdown');
    const categoriasDropdown = document.getElementById('categorias-dropdown');
    const dropdownMenu = categoriasDropdown.querySelector('.dropdown-menu');

    categoriasDropdown.addEventListener('mouseenter', function () {
        clearTimeout(mainMenuTimeout); 
        dropdownMenu.style.display = 'block';
        dropdownMenu.style.opacity = '1'; 
    });

    categoriasDropdown.addEventListener('mouseleave', function () {
        mainMenuTimeout = setTimeout(function () {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.display = 'none';
        }, 500); 
    });

    perifericosDropdown.addEventListener('mouseenter', function () {
        clearTimeout(subMenuTimeout); 
        subDropdown.style.display = 'block';
        subDropdown.style.opacity = '1';
    });

    perifericosDropdown.addEventListener('mouseleave', function () {
        subMenuTimeout = setTimeout(function () {
            subDropdown.style.opacity = '0'; 
            subDropdown.style.display = 'none'; 
        }, 500); 
    });

    subDropdown.addEventListener('mouseenter', function () {
        clearTimeout(subMenuTimeout); 
        subDropdown.style.opacity = '1'; 
    });

    subDropdown.addEventListener('mouseleave', function () {
        subMenuTimeout = setTimeout(function () {
            subDropdown.style.opacity = '0'; 
            subDropdown.style.display = 'none'; 
        }, 500); 
    });
});




/*------------------------------------------------*/
/*-------------------MENU---------------------*/
/*------------------------------------------------*/


document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector('.color-section.section-2'); 

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            section.classList.add('scrolled'); 
        } else {
            section.classList.remove('scrolled'); 
        }
    });
});


