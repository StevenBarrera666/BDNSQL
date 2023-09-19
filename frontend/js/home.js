const boton = document.querySelector("#botonTest");
const botonGuardarNota = document.querySelector("#guardarNota");

function obtenerNotasDesdeAPI() {
  fetch("http://localhost:3002/notes", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((notasDesdeAPI) => {
      mostrarNotas(notasDesdeAPI);
    })
    .catch((error) => {
      console.error("Error al obtener las notas desde la API:", error);
    });
}

function mostrarNotas(notas) {
  const notaContainer = document.getElementById("notaContainer");
  notaContainer.innerHTML = "";

  notas.forEach((nota) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-3");

    const cardHTML = `
        <div class="card mb-4">
        <div class="card-body overflow-hidden">
            <h5 class="card-title">${nota.titulo}</h5>
            <p class="card-text">${nota.contenido}</p>
        </div>
        <div class="card-footer text-right border-0">
            <button id="actualizar" class="btn btn-primary mr-2"  onclick="editarNota('${nota._id}')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarNota('${nota._id}')">Eliminar</button>        
        </div>
    </div>`;
    colDiv.innerHTML = cardHTML;
    notaContainer.appendChild(colDiv);
  });
}

function generarID() {
  return Math.random().toString(36).substring(2, 15);
}

function crearNotaNueva(event) {
  const titulo = "titulo";
  const contenido = "Dummy contenido";

  const nuevoID = generarID();

  const nuevaNota = {
    id: nuevoID,
    titulo: titulo,
    contenido: contenido,
  };

  fetch("http://127.0.0.1:3002/notes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaNota),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al enviar la nota:", error);
    });
}

function agregarNotaNueva(event) {
  // Evitar que el formulario se envíe de forma predeterminada
  event.preventDefault();

  // Obtener los valores del título y el contenido desde los campos del formulario
  const tituloInput = document.getElementById("titulo");
  const contenidoTextarea = document.getElementById("contenido");

  const titulo = tituloInput.value;
  const contenido = contenidoTextarea.value;

  if (!titulo || !contenido) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const nuevoID = generarID();

  const nuevaNota = {
    id: nuevoID,
    titulo: titulo,
    contenido: contenido,
  };

  fetch("http://127.0.0.1:3002/notes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaNota),
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error al enviar la nota:", error);
    });
}

// function editarNota(_id) {
//     // Obtener la nota con el ID proporcionado desde la API
//     fetch(`http://localhost:3002/notes/update/${_id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             titulo: "Nuevo título 300",
//             contenido: "Nuevo contenido 300"
//         }),
//         credentials: 'same-origin'
//     })
//     .then(response => response.json())
//     .then(nota => {
//         // Haz algo con la nota actualizada si es necesario
//         console.log('Nota actualizada:', nota);

//         // Activar el modal después de obtener la respuesta
//         $('#modalNuevaNota').modal('show'); // Esto abrirá el modal
//     })
//     .catch(error => {
//         console.error('Error al actualizar la nota:', error);
//     });
// }

function editarNota(_id) {
    // Obtén la nota actual desde la API
    fetch("http://localhost:3002/notes")
        .then(response => response.json())
        .then(nota => {
            // Llena el formulario dentro del modal con los datos actuales
            document.getElementById('titulo').value = nota.titulo;
            document.getElementById('contenido').value = nota.contenido;

            // Abre el modal
            $('#modalNuevaNota').modal('show');

            // Configura un manejador de eventos para el botón "Guardar"
            document.getElementById('guardarNota').addEventListener('click', () => {
                // Obtén los valores actualizados del formulario
                const nuevoTitulo = document.getElementById('titulo').value;
                const nuevoContenido = document.getElementById('contenido').value;

                // Actualiza la nota con los nuevos valores
                fetch(`http://localhost:3002/notes/update/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        titulo: nuevoTitulo,
                        contenido: nuevoContenido
                    }),
                    credentials: 'same-origin'
                })
                .then(response => response.json())
                .then(notaActualizada => {
                    console.log('Nota actualizada:', notaActualizada);

                    // Cierra el modal después de actualizar
                    $('#modalNuevaNota').modal('hide');
                })
                .catch(error => {
                    console.error('Error al actualizar la nota:', error);
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener la nota:', error);
        });
}

function eliminarNota(_id) {
  alert("Eliminar nota con ID " + _id);
  // Mostrar una confirmación al usuario
  if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
    // Realizar la solicitud de eliminación a la API
    fetch(`http://localhost:3002/notes/delete/${_id}`, {
        method: 'DELETE',
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // La nota se eliminó con éxito, puedes realizar alguna acción adicional si es necesario
            console.log('Nota eliminada con éxito');
            
            // Actualiza la interfaz de usuario para reflejar la eliminación (opcional)
            // Por ejemplo, puedes eliminar la tarjeta de la nota de la interfaz
            // Aquí puedes agregar tu lógica para actualizar la interfaz
        } else {
            console.error('Error al eliminar la nota:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al eliminar la nota:', error);
    });
 }
}

obtenerNotasDesdeAPI();

boton.addEventListener("click", crearNotaNueva);
botonGuardarNota.addEventListener("click", agregarNotaNueva);
