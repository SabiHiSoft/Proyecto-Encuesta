document.addEventListener("DOMContentLoaded", function() {
    const botonEnvio = document.getElementById("envio");

    let votoSeleccionado = ""; // Variable para almacenar el voto seleccionado

    // Función para obtener y mostrar la dirección IP del cliente
    function mostrarDireccionIP() {
        return fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                return data.ip;
            })
            .catch(error => {
                console.error('Error al obtener la dirección IP:', error);
                return 'Error al obtener la dirección IP';
            });
    }

    // Función para crear el archivo de texto cuando se oprime el botón de envío
    function crearArchivoTexto(ip) {
        const datos = {};
        datos.voto = votoSeleccionado; // Agregar el voto seleccionado a los datos
        datos["Dirección IP"] = ip; // Agregar la dirección IP
        const contenidoArchivo = generarContenido(datos);
        descargarArchivo(contenidoArchivo);
    }

    // Función para generar el contenido del archivo de texto
    function generarContenido(datos) {
        let contenido = "";
        for (const key in datos) {
            if (datos.hasOwnProperty(key)) {
                contenido += `${key}: ${datos[key]}\n`;
            }
        }
        return contenido;
    }

    // Función para descargar el archivo de texto
    function descargarArchivo(contenido) {
        const archivoBlob = new Blob([contenido], { type: "text/plain" });
        const nombreArchivo = "datos_encuesta.txt";
        const rutaArchivo = "encuestas/" + nombreArchivo; // Ruta de destino
    
        const linkDescarga = document.createElement("a");
    
        linkDescarga.href = URL.createObjectURL(archivoBlob);
        linkDescarga.download = rutaArchivo; // Descargar en la carpeta "encuestas"
        linkDescarga.click();
    }

    // Evento para capturar el voto seleccionado
    document.querySelectorAll(".candidato").forEach(button => {
        button.addEventListener("click", function(event) {
            votoSeleccionado = event.target.textContent.trim();
        });
    });

    // Evento para activar la creación del archivo cuando se oprime el botón de envío
    botonEnvio.addEventListener("click", function() {
        if (votoSeleccionado !== "") {
            // Obtener la dirección IP del cliente
            mostrarDireccionIP()
                .then(ip => {
                    // Crear el archivo de texto con la dirección IP y el voto seleccionado
                    crearArchivoTexto(ip);
                })
                .catch(error => {
                    console.error('Error al obtener la dirección IP:', error);
                });
        } else {
            alert("Por favor selecciona un candidato antes de votar.");
        }
    });
});
