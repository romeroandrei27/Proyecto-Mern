/*Script para formulario de calificaciones*/
/*-Estado: listaCalificaciones*/
/*-Validacion: campos no vacios, calificacion valida*/
/*Handlers o escuchadores de eventos*/
const listaCalificaciones = [];
const formulario = document.getElementById('formulario');
const nombreAlumno = document.getElementById('nombreAlumno');
const materia = document.getElementById('materia');
const calificacion = document.getElementById('calificacion');
const comentarios = document.getElementById('comentarios');
const textoError = document.getElementById('textoError');
const botonAgregar = document.getElementById('btnAgregar');
const botonLimpiarFormulario = document.getElementById('btnLimpiarFormulario');
const botonLimpiarLista = document.getElementById('btnLimpiarLista');
const listaEnPantalla = document.getElementById('listaCalificaciones');
const textoVacio = document.getElementById('textoVacio');

if(!formulario || !nombreAlumno || !materia || !calificacion || !comentarios || !textoError || 
    !botonAgregar || !botonLimpiarFormulario || !botonLimpiarLista || !listaEnPantalla || !textoVacio)
{
    if(!formulario) console.error('No se encontró el formulario');
    if(!nombreAlumno) console.error('No se encontró el campo nombreAlumno');
    if(!materia) console.error('No se encontró el campo materia');
    if(!calificacion) console.error('No se encontró el campo calificacion');
    if(!comentarios) console.error('No se encontró el campo comentarios');
    if(!textoError) console.error('No se encontró el campo de texto del error');
    if(!botonAgregar) console.error('No se encontró el botón de agregar');
    if(!botonLimpiarFormulario) console.error('No se encontró el botón de limpiar formulario');
    if(!botonLimpiarLista) console.error('No se encontró el botón de limpiar lista');
    if(!listaEnPantalla) console.error('No se encontró la lista de calificaciones');
    if(!textoVacio) console.error('No se encontró el texto de lista vacía');

    throw new Error('No se encontraron los elementos del DOM necesarios');
}

function normalizarTexto(texto) {
    return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

function validar(){
    const nombre = normalizarTexto(nombreAlumno.value);
    const mat = normalizarTexto(materia.value);
    const calif = parseFloat(calificacion.value);
    const com = comentarios.value.trim();

    let mensajeError = '';
    if(nombre.length < 1){
        mensajeError = 'El nombre del alumno no puede estar vacío.';
    }else if(mat.length < 1){
        mensajeError = 'La materia no puede estar vacía.';
    }else if(isNaN(calif) || calif < 0 || calif > 100){
        mensajeError = 'La calificación debe ser un número entre 0 y 100.';
    }

    textoError.textContent = mensajeError;
    botonAgregar.disabled = Boolean(mensajeError);

    return !mensajeError;
}

function pintarPantalla(){
    listaEnPantalla.textContent = '';
    textoVacio.style.display = listaCalificaciones.length ? "none": "block";
    for(let i = 0; i < listaCalificaciones.length; i++){
        const li = document.createElement('li');
        li.textContent = `#${i + 1} | Alumno: ${listaCalificaciones[i].nombre} | Materia: ${listaCalificaciones[i].materia} | Calificación: ${listaCalificaciones[i].calificacion} | Comentarios: ${listaCalificaciones[i].comentarios || 'Ninguno'}`;
        listaEnPantalla.appendChild(li);
    }
}   

function limpiarFormulario(){
    console.log('Limpiando formulario');
    nombreAlumno.value = '';
    materia.value = '';
    calificacion.value = '';
    comentarios.value = '';
    textoError.textContent = '';
    botonAgregar.disabled = true;
    nombreAlumno.focus();
}

function limpiarLista(){
    console.log('Limpiando lista');
    listaCalificaciones.length = 0;
    pintarPantalla();
}

nombreAlumno.addEventListener('input', validar);
materia.addEventListener('input', validar);
calificacion.addEventListener('input', validar);
botonLimpiarFormulario.addEventListener('click', limpiarFormulario);
botonLimpiarLista.addEventListener('click', limpiarLista);
formulario.addEventListener('submit',(e) => {
    e.preventDefault();//Evitar recarga de pagina
    if(!validar()) return;

    listaCalificaciones.push({
        nombre: normalizarTexto(nombreAlumno.value),
        materia: normalizarTexto(materia.value),
        calificacion: parseFloat(calificacion.value),
        comentarios: comentarios.value.trim(),
    });
    limpiarFormulario();
    pintarPantalla();
});
validar();//Validacion inicial
pintarPantalla();//Pintar inicial
