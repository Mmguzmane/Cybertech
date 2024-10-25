 // Obtener la URL actual de la página y obtener solo el nombre del archivo
 const currentLocation = window.location.pathname.split('/').pop();

 // Obtener todos los enlaces del menú
 const menuItems = document.querySelectorAll('.navbar a');

 // Recorrer todos los enlaces del menú
 menuItems.forEach(item => {
   // Verificar si el href del enlace coincide con el nombre del archivo actual
   if (item.getAttribute('href') === currentLocation) {
     // Agregar la clase 'active' al enlace que coincida con la página actual
     item.classList.add('active');
   }
 });