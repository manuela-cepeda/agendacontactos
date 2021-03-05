//sintaxis nueva de javascript
//nuevos frameworks utilizan estas sintaxis

const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody'),
    inputBuscador = document.querySelector('#buscar');


eventListeners();

function eventListeners() {
    //cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
    //listener para eliminar con el boton de borrar
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    numeroContactos();
    //buscador
    inputBuscador.addEventListener('input', buscarContactos);


}

function leerFormulario(e) { // e de evento:
    e.preventDefault(); // ponerla para prevenir la accion por default del formulario que es llevarte a otra pagina

    //leeer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;


    if (nombre === '' || empresa === '' || telefono === '') {
        //2parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');

    } else {
        //pasa la validacion, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);


        if (accion === 'crear') {
            //crearemos un nuevo elemento
            insertarBD(infoContacto);
        } else {
            //editar el contacto
            //leer el id

            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);

        }
    }


}



//insertar en la base de datos via ajax - nuevas tecnologias: fetchapi
// ajax hace que se pongan los contactos abajo sin recargar la pagina pero hay que hacer tmb 
//con php una conexion a la base de datos para que queden siempre los que ya fueron agregados
//si no cuand se actualiza la pagina se borran los agregados via ajax

function insertarBD(datos) {
    //lamar a ajax
    //crrear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    //pasar los datos
    xhr.onload = function() {
            if (this.status === 200) {
                //leemos la resupuesta de php
                const respuesta = JSON.parse(xhr.responseText); //json parse lo convierte a un objeto
                //inserta un nuevo elemento en la tabla
                const nuevoContacto = document.createElement('tr');
                nuevoContacto.innerHTML = `
                <td> ${respuesta.datos.nombre} </td>
                <td> ${respuesta.datos.empresa} </td>
                <td> ${respuesta.datos.telefono} </td>
                `;
                const contenedorAcciones = document.createElement('td');
                //crear el inono de editar
                const iconoEditar = document.createElement('i');
                iconoEditar.classList.add('fas', 'fa-pen-square');
                //crear enlace para editar
                const btnEditar = document.createElement('a');
                btnEditar.appendChild(iconoEditar);
                btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
                btnEditar.classList.add('btn', 'btn-editar');
                //agregarlo al padre
                contenedorAcciones.appendChild(btnEditar);

                //crear icono de eliminar
                const iconoEliminar = document.createElement('i');
                iconoEliminar.classList.add('fas', 'fa-trash-alt');
                //crear el boton de eliminar
                const btnEliminar = document.createElement('button');
                btnEliminar.appendChild(iconoEliminar);
                btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
                btnEliminar.classList.add('btn', 'btn-borrar');
                //agregarlo al padre
                contenedorAcciones.appendChild(btnEliminar);
                //agregarlo al tr
                nuevoContacto.appendChild(contenedorAcciones);

                //agregarlo con los contactos
                listadoContactos.appendChild(nuevoContacto);

                //resetear el formulario
                document.querySelector('form').reset();

                //mostrar la notificacion
                mostrarNotificacion('Contacto creado correctamente', 'correcto');

                //actualizar numero
                numeroContactos();



            }
        }
        //enviar los datos
    xhr.send(datos);


}

function actualizarRegistro(datos) {
    //lamar a ajax
    //crrear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
    //leer la respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                console.log(xhr.responseText);
                const respuesta = JSON.parse(xhr.responseText);
                if (respuesta.respuesta === 'correcto') {
                    //mostrar notificacion
                    mostrarNotificacion('Contacto editado correctamente', 'correcto');

                } else {
                    //hubo un errror
                    mostrarNotificacion('No se ha editado el contacto', 'error');
                }
                //desp de 3 segundos redireccionar 
                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 3000); //3segundos
            }


        }
        //enviar la peticion
    xhr.send(datos);
}
//eliminar contacto 

function eliminarContacto(e) {
    //lee el click en cualquier lado pero la e de evento te dice a que elemento le diste click

    if (e.target.parentElement.classList.contains('btn-borrar')) {

        //tomar el id
        const id = e.target.parentElement.getAttribute('data-id');
        //preguntar la usuario
        const respuesta = confirm('¿Estás Seguro/a ?');

        if (respuesta) {
            //lamado a ajax
            //crrear el objeto
            const xhr = new XMLHttpRequest();
            //abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            //leer la respuesta
            xhr.onload = function() {
                    if (this.status === 200) {
                        //console.log(xhr.responseText); TUVE UN ERROR Y ESTO ME AYUDO A ENCONTRAR
                        const resultado = JSON.parse(xhr.responseText);

                        if (resultado.respuesta == 'correcto') {
                            //eliminar el registro del dom
                            e.target.parentElement.parentElement.parentElement.remove(); //para que elimine todo el <td>
                            mostrarNotificacion('Contacto eliminado', 'correcto');
                            //actualizar numero
                            numeroContactos();
                        } else {
                            //mostramos una notificacion
                            mostrarNotificacion('Hubo un error...', 'error');

                        }
                    }
                }
                //
            xhr.send();
        }

    }



}



//notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formualario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    //ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {

                notificacion.remove();

            }, 500);
        }, 3000);


    }, 100);
}

// BUSCADOR DE REGISTROS
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"), //i para que te encuentre este en mayusculas o minusc
        registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';
        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
            //replace(/\s/g, " ") eso es para que encuentre si hay epsacio 
        }
        numeroContactos();
    })

}

//muestra el numero de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }

    });
    // console.log(total);
    contenedorNumero.textContent = total;
}