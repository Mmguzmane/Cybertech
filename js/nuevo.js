
    //*********************************//
//************CONTACTO******************//
//*********************************//

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("contactModal");
    const btn = document.getElementById("openModal");
    const span = document.getElementById("closeModal");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});