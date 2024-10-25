const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.box');

filters.forEach(filter => {
    filter.addEventListener('change', () => {
        const selectedBrands = [...document.querySelectorAll('input[data-type="marca"]:checked')].map(input => input.value);
        const selectedPrices = [...document.querySelectorAll('input[data-type="precio"]:checked')].map(input => input.value);

        products.forEach(product => {
            const productBrand = product.getAttribute('data-marca');
            const productPrice = parseFloat(product.getAttribute('data-precio'));

            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
            const priceMatch = selectedPrices.length === 0 || checkPriceRange(selectedPrices, productPrice);

            if (brandMatch && priceMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

function checkPriceRange(selectedPrices, productPrice) {
    for (let price of selectedPrices) {
        switch (price) {
            case 'menos-500':
                if (productPrice < 500) return true;
                break;
            case '500-1000':
                if (productPrice >= 500 && productPrice < 1000) return true;
                break;
            case '1000-2000':
                if (productPrice >= 1000 && productPrice < 2000) return true;
                break;
            case 'mas-2000':
                if (productPrice >= 2000) return true;
                break;
        }
    }
    return false;
}

const acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
