document.getElementById("enviar").addEventListener("click", function (event) {
  event.preventDefault();
  var nombres = document.getElementById("nombres").value;
  var apellidos = document.getElementById("apellidos").value;
  var correo = document.getElementById("correo").value;
  var mensaje = document.getElementById("mensaje").value;

  if (nombres === "" || apellidos === "" || correo === "" || mensaje === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Alto ahi!',
      text: 'Por favor completa los campos vacios antes de enviar',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: '¡Gracias por contactarnos!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
    localStorage.setItem("ultimoMensaje", mensaje);
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("mensaje").value = "";
  }
});

document.getElementById("recuperar").addEventListener("click", function() {
  var ultimoMensaje = localStorage.getItem("ultimoMensaje");
  if (ultimoMensaje) {
    Swal.fire({
      icon: 'info',
      title: 'Último mensaje enviado',
      text: ultimoMensaje,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'No hay mensajes enviados',
      text: 'No ha enviado ningún mensaje todavía',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    });
  }
});
