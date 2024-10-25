const chatIcon = document.getElementById('chat-icon');
const chatbot = document.getElementById('chatbot');
const closeBtn = document.getElementById('close-btn');
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');

let chatHistory = []; // Array para mantener el historial de mensajes

// Mostrar el chatbot al hacer clic en el icono
chatIcon.addEventListener('click', function () {
    chatbot.classList.toggle('active');
    if (chatbot.classList.contains('active')) {
        displayChatHistory(); // Mostrar historial al abrir el chatbot
    }
});

// Cerrar el chatbot
closeBtn.addEventListener('click', function () {
    chatbot.classList.remove('active');
});

// Enviar el mensaje cuando se hace clic en el botón
sendBtn.addEventListener('click', sendMessage);

// Agregar el evento keypress para enviar el mensaje con Enter
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') { // Si la tecla presionada es Enter
        e.preventDefault(); // Evitar que se añada un salto de línea
        sendMessage(); // Llama a la función para enviar el mensaje
    }
});

// Función para enviar el mensaje
function sendMessage() {
    const userMessage = chatInput.value;
    if (userMessage.trim() !== "") {
        addToChatHistory(`Usuario: ${userMessage}`); // Añadir al historial
        // Crear el mensaje del usuario
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chat-message');
        userMessageDiv.innerHTML = `<p>${userMessage}</p><span class="timestamp">${getCurrentTime()}</span>`;

        // Añadir el mensaje al cuerpo del chat
        chatBody.appendChild(userMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Hacer scroll hacia abajo

        // Obtener respuesta del bot
        const botResponse = getBotResponse(userMessage);
        if (typeof botResponse === 'string') {
            addBotMessage(botResponse);
        } else if (typeof botResponse === 'function') {
            botResponse(); // Ejecutar la función de redirección
        }

        // Limpiar el input después de enviar el mensaje
        chatInput.value = '';
    }
}

// Función para obtener la hora actual en formato HH:MM:SS
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

// Función para obtener respuesta del bot
function getBotResponse(input) {
    const lowerInput = input.toLowerCase();
    let lastProduct = ''; // Variable para almacenar el último producto mencionado

    if (lowerInput.includes('hola')) {
        return '¡Hola! 👋 ¿En qué puedo ayudarte hoy?';
    } else if (lowerInput.includes('precio')) {
        return '¿Qué producto te interesa?';
    } else if (lowerInput.includes('comprar') || lowerInput.includes('quiero')) {
        if (lastProduct) {
            return `Claro, estás interesado en ${lastProduct}. ¿Te gustaría que te redirija para realizar la compra?`;
        } else {
            return '¿Qué producto deseas comprar?';
        }
    } else if (lowerInput.includes('laptop') || lowerInput.includes('pc')) {
        lastProduct = 'laptop o PC';
        redirectTo('Pc-Laptops.html');
        return function () { };
    } else if (lowerInput.includes('mouse')) {
        lastProduct = 'mouse';
        redirectTo('Ratones.html');
        return function () { };
    } else if (lowerInput.includes('teclado')) {
        lastProduct = 'teclado';
        redirectTo('Teclados.html');
        return function () { };
    } else if (lowerInput.includes('impresora')) {
        lastProduct = 'impresora';
        redirectTo('Impresoras.html');
        return function () { };
    } else if (lowerInput.includes('auriculares')) {
        lastProduct = 'auriculares';
        redirectTo('Auriculares.html');
        return function () { };
    } else if (lowerInput.includes('ofertas') || lowerInput.includes('promociones')) {
        return 'Actualmente tenemos un 10% de descuento en laptops y PCs. ¡Echa un vistazo! 🎉';
    } else if (lowerInput.includes('recomendación')) {
        return '¿Qué tipo de producto buscas? (laptop, impresora, mouse, etc.)';
    } else if (lowerInput.includes('problema') || lowerInput.includes('ayuda')) {
        return 'Por favor, describe tu problema y estaré encantado de ayudarte. Si necesitas más asistencia, por favor visita nuestra página de <a href="contacto.html">contacto</a>.';
    } else if (lowerInput.includes('horario de atención')) {
        return 'Nuestro horario de atención es de lunes a viernes de 9 a 18 horas.';
    } else if (lowerInput.includes('dónde estamos') || lowerInput.includes('dirección')) {
        return 'Estamos ubicados en la Calle Ejemplo 123, Ciudad.';
    } else if (lowerInput.includes('adiós') || lowerInput.includes('chau')) {
        return '¡Hasta luego! Si necesitas más ayuda, aquí estaré. 😊';
    } else {
        return 'Lo siento, no entendí tu pregunta. ¿Puedes reformularla o seleccionar una opción?';
    }
}

// Función para añadir mensaje del bot
function addBotMessage(message) {
    setTimeout(() => { // Simular un retraso
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('chat-message', 'bot-message');
        botMessageDiv.innerHTML = `<p>${message}</p><span class="timestamp">${getCurrentTime()}</span>`;
        chatBody.appendChild(botMessageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Hacer scroll hacia abajo
    }, 500); // Retraso de medio segundo
}

// Función para redirigir a otra página
function redirectTo(url) {
    addBotMessage(`Te estoy redirigiendo a: ${url}`);
    setTimeout(() => {
        window.location.href = url; // Cambiar la ubicación de la ventana
    }, 2000); // 2 segundos de retraso
}

// Función para añadir al historial de chat
function addToChatHistory(message) {
    chatHistory.push(message);
}

// Mostrar historial de conversación
function displayChatHistory() {
    chatHistory.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message');
        messageDiv.innerHTML = `<p>${message}</p><span class="timestamp">${getCurrentTime()}</span>`;
        chatBody.appendChild(messageDiv);
    });
}

// Añadir opciones rápidas (puedes llamar a esta función donde lo desees)
function addQuickReplyOptions() {
    const options = ['Laptop', 'PC', 'Mouse', 'Teclado', 'Impresora', 'Auriculares'];
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => {
            chatInput.value = option.toLowerCase();
            sendBtn.click(); 
        });
        chatBody.appendChild(button);
    });
}



//










