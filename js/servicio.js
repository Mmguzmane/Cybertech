document.addEventListener('DOMContentLoaded', () => {
    const servicesList = document.getElementById('services-list');
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        if (index !== 0) {
            card.style.display = 'none';
        }
    });

    servicesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedService = e.target.getAttribute('data-service');

            serviceCards.forEach(card => {
                card.style.display = 'none';
            });

            switch (selectedService) {
                case 'software':
                    document.getElementById('card-1').style.display = 'block';
                    break;
                case 'networks':
                    document.getElementById('card-2').style.display = 'block';
                    break;
                case 'computers':
                    document.getElementById('card-3').style.display = 'block';
                    break;
                case 'maintenance':
                    document.getElementById('card-4').style.display = 'block';
                    break;
                case 'web-design':
                    document.getElementById('card-5').style.display = 'block';
                    break;
                case 'support':
                    document.getElementById('card-6').style.display = 'block';
                    break;
            }
        }
    });
});




    document.addEventListener("DOMContentLoaded", function() {
        const servicesList = document.getElementById('services-list');
        const serviceItems = servicesList.getElementsByTagName('li');

        Array.from(serviceItems).forEach(item => {
            item.addEventListener('click', function() {
                Array.from(serviceItems).forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                
                const serviceData = this.getAttribute('data-service');
                showServiceDetails(serviceData);
            });
        });

        function showServiceDetails(service) {
            const serviceDetails = document.querySelectorAll('.service-card');
            serviceDetails.forEach(card => {
                card.style.display = 'none';
                if (card.id === `card-${getServiceIndex(service) + 1}`) {
                    card.style.display = 'block';
                }
            });
        }

        function getServiceIndex(service) {
            const services = ["software", "networks", "computers", "maintenance", "web-design", "support"];
            return services.indexOf(service);
        }
    });
