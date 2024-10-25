/***********************************************/
/*********************CARRUSEL******************/
/***********************************************/
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    const totalImages = images.length;

    if (!images || !prevButton || !nextButton) {
        console.error('Uno o más elementos del carrusel no se encontraron.');
        return;
    }

    function updateCarousel(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                setTimeout(() => img.classList.add('active'), 300); // Retraso para mejorar la apreciación del efecto
            }
        });
        currentIndex = index;
    }

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % totalImages;
        updateCarousel(nextIndex);
    }

    function showPreviousImage() {
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel(prevIndex);
    }

    // Asignar eventos a los botones de control
    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);

    // Inicializar la primera imagen como activa
    updateCarousel(currentIndex);

    // Repetir el carrusel automáticamente cada 5 segundos
    setInterval(showNextImage, 5000);
});


/***********************************************/
/******************CARRUSEL-2******************/
/***********************************************/
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.productos-container');
    const productos = document.querySelectorAll('.producto');
    const totalProductos = productos.length;
    const visibleCount = 5; 
    const interval = 3000; 
    const transitionDuration = 1000; 

    const cloneProducts = () => {
        productos.forEach(producto => {
            const clone = producto.cloneNode(true);
            container.appendChild(clone);
        });
    };

    
    function initCarousel() {
        cloneProducts(); 

        
        container.style.width = `${(totalProductos * 2) * 42 / visibleCount}%`; 

      
        container.style.transform = `translateX(0%)`;

        let currentIndex = 0;

        function moveCarousel() {
            currentIndex++;
            if (currentIndex >= totalProductos) {
                currentIndex = 0;
                container.style.transition = 'none';
                container.style.transform = `translateX(0%)`;

             
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        container.style.transition = `transform ${transitionDuration}ms linear`;
                        container.style.transform = `translateX(-${100 / visibleCount}%)`;
                    });
                });
            } else {
                container.style.transform = `translateX(-${(currentIndex + 1) * 100 / visibleCount}%)`;
            }
        }

        setInterval(moveCarousel, interval);
    }

    initCarousel();
});

/***********************************************/
/*******************CARRUSEL-3******************/
/***********************************************/
function startRotation() {
    const items = document.querySelectorAll('.small');
    let currentIndex = 0; 
    const itemsToShow = 2; 
    const totalItems = items.length;
    const rotationInterval = 3000; 

    
    function updateVisibility() {
        
        items.forEach(item => {
            item.style.display = 'none'; 
        });

        for (let i = 0; i < itemsToShow; i++) {
            const index = (currentIndex + i) % totalItems;
            items[index].style.display = 'flex'; 
        }

        currentIndex = (currentIndex + 1) % totalItems;
    }

    setInterval(updateVisibility, rotationInterval);

    updateVisibility();
}

window.onload = startRotation;



