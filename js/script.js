// Objetos para almacenamiento local
const storage = window.localStorage;
const key = "catering";

// Funcion para limpiar el formulario al actualizar la pagina
window.onload = function () {
    inputComensales.value = "";
    selectMenu.value = "";
    selectTemporada.value = "";
    selectMediopago.value = "";
};

// DOM - Elementos HTML
const simuladorForm = document.getElementById("simulador");
const inputComensales = document.getElementById("inputComensales");
const outputComensales = document.getElementById("outputComensales");
const selectMenu = document.getElementById("selectMenu");
const selectTemporada = document.getElementById("selectTemporada");
const selectMediopago = document.getElementById("selectMediopago");
const resultado = document.getElementById("resultado");

// Eventos
inputComensales.addEventListener("input", actualizarOutputComensales);
simuladorForm.addEventListener("submit", calcularCostoCatering);

// JSON - Objetos
const menuObjeto = {
    degustacion: 3500,
    completo: 5000,
    mixto: 7500
};

const temporadaObjeto = {
    primera: 1.5,
    segunda: 1.1,
    tercera: 1.3
};

// Almacenamiento Local
if (storage.getItem(key)) {
    const data = JSON.parse(storage.getItem(key));
    inputComensales.value = data.comensales;
    selectMenu.value = data.menu;
    selectTemporada.value = data.temporada;
    selectMediopago.value = data.mediopago;
    actualizarOutputComensales();
}

// Funciones
function actualizarOutputComensales() {
    outputComensales.value = inputComensales.value;
}

function calcularCostoCatering(event) {
    event.preventDefault();

    // Validar cantidad de comensales menor a 10 + animacion para remover el mensaje de alerta
    const cantidadComensales = parseInt(inputComensales.value);
    if (cantidadComensales < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Alto ahí comensal!...',
            text: 'Para cotizar tu catering debes ingresar un mínimo de 10 comensales.',
            timer: 3000,
            timerProgressBar: true,
        });
        return;
    }

    // Almacenar datos
    const datos = {
        comensales: cantidadComensales,
        menu: selectMenu.value,
        temporada: selectTemporada.value,
        mediopago: selectMediopago.value
    };
    storage.setItem(key, JSON.stringify(datos));

    // Cálculo del costo
    let costoMenu = menuObjeto[selectMenu.value];
    let factorTemporada = temporadaObjeto[selectTemporada.value];
    let medioPago = selectMediopago.value;
    let costoCatering = cantidadComensales * costoMenu * factorTemporada;

    // Aplicar descuento/recargo según medio de pago
    if (medioPago === "efectivo") {
        costoCatering *= 0.95;
    } else if (medioPago === "tarjeta") {
        costoCatering *= 1.08;
    }

    // Mostrar resultado
    Swal.fire({
        icon: 'success',
        title: 'Cotización',
        text: `El costo del catering para ${cantidadComensales} comensales abonando con ${medioPago} será de $${costoCatering.toFixed(2)}.`,
    });

}

// Boton para borrar resultado

const borrarResultadoBtn = document.getElementById("borrarResultado");

borrarResultadoBtn.addEventListener("click", borrarResultado);

function borrarResultado() {
    resultado.textContent = "";
    inputComensales.value = "";
    selectMenu.value = "";
    selectTemporada.value = "";
    selectMediopago.value = "";
}

// Boton para ver presupuesto anterior
const verCateringAnteriorBtn = document.getElementById("verCatering");

verCateringAnteriorBtn.addEventListener("click", verCatering);

function verCatering() {
    if (storage.getItem(key)) {
        const data = JSON.parse(storage.getItem(key));
        inputComensales.value = data.comensales;
        selectMenu.value = data.menu;
        selectTemporada.value = data.temporada;
        selectMediopago.value = data.mediopago;
        actualizarOutputComensales();
        calcularCostoCatering(event);
        Swal.fire({
            icon: 'success',
            title: 'Catering Anterior',
            html: `Comensales: ${data.comensales}<br>
            Menú: ${data.menu}<br>
            Temporada: ${data.temporada}<br>
            Medio de pago: ${data.mediopago}<br>
            Costo: $${(costoCatering).toFixed(2)}`,
            timer: 3000,
            timerProgressBar: true,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay un presupuesto anterior guardado.',
            timer: 3000,
            timerProgressBar: true,
        });
    }
}


//Uso de Fetch consumiendo API que muestra los comentarios de los clientes

// Definir cantidad de comentarios por default
const DEFAULT_COMMENTS = 10;

// Definir función para mostrar comentarios
function mostrarComentarios(comments) {
    // Mostrar en el HTML la información de los comentarios
    const comentariosHTML = comments
        .map(comentario =>
            `<p><strong>Nombre:</strong> ${comentario.name}</p>
        <br>   
        <p><strong>Comentario:</strong> ${comentario.body}</p>
        <hr>`
        )
        .join('');

    // Mostrar la información en una ventana modal de SweetAlert + boton para cerrar
    Swal.fire({
        title: 'Comentarios',
        html: comentariosHTML,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
    });
}

document.getElementById('btn-fetch').addEventListener('click', () => {
    // Mostrar mensaje de carga
    Swal.fire({
        title: 'Cargando comentarios...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => response.json())
        .then(comments => {
            // Mostrar solamente los primeros 10 comentarios por defecto
            mostrarComentarios(comments.slice(0, DEFAULT_COMMENTS));
        })
        .catch(error => {
            // Mostrar mensaje de error en caso de falla
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ha ocurrido un error al cargar los comentarios',
            });
        });
});



