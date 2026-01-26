/*Script para formulario de entregas*/
/*-Estado: listaEntregas*/
/*-Validacion: título mínimo 5 caracteres, alumno no vacío*/
/*Handlers o escuchadores de eventos*/
const listaEntregas = [];
const formulario = document.getElementById('formularioEntrega');
const tituloEntrega = document.getElementById('tituloEntrega');
const descripcionEntrega = document.getElementById('descripcionEntrega');
const alumnoEntrega = document.getElementById('alumnoEntrega');
const btnGuardar = document.getElementById('btnGuardar');
const listaEnPantalla = document.getElementById('listaEntregas');
const textoVacio = document.getElementById('textoVacio');

if(!formulario || !tituloEntrega || !descripcionEntrega || !alumnoEntrega || 
    !btnGuardar || !listaEnPantalla || !textoVacio)
{
    if(!formulario) console.error('No se encontró el formulario');
    if(!tituloEntrega) console.error('No se encontró el campo tituloEntrega');
    if(!descripcionEntrega) console.error('No se encontró el campo descripcionEntrega');
    if(!alumnoEntrega) console.error('No se encontró el campo alumnoEntrega');
    if(!btnGuardar) console.error('No se encontró el botón de guardar');
    if(!listaEnPantalla) console.error('No se encontró la lista de entregas');
    if(!textoVacio) console.error('No se encontró el texto de lista vacía');

    throw new Error('No se encontraron los elementos del DOM necesarios');
}

function normalizarTexto(texto) {
    return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

function validar(){
    const titulo = tituloEntrega.value.trim();
    const alumno = normalizarTexto(alumnoEntrega.value);

    let esValido = true;
    if(titulo.length < 5){
        esValido = false;
    } else if(alumno.length < 1){
        esValido = false;
    }

    btnGuardar.disabled = !esValido;
    return esValido;
}

function pintarPantalla(){
    listaEnPantalla.innerHTML = '';
    textoVacio.style.display = listaEntregas.length ? "none": "block";
    for(let i = 0; i < listaEntregas.length; i++){
        const card = document.createElement('div');
        card.className = 'entrega-card';
        card.innerHTML = `
            <div class="entrega-numero">#${i + 1}</div>
            <div class="entrega-titulo">${listaEntregas[i].titulo}</div>
            <div class="entrega-alumno"><strong>Alumno:</strong> ${listaEntregas[i].alumno}</div>
            ${listaEntregas[i].descripcion ? `<div class="entrega-descripcion"><strong>Descripción:</strong> ${listaEntregas[i].descripcion}</div>` : ''}
        `;
        listaEnPantalla.appendChild(card);
    }
}   

function limpiarFormulario(){
    console.log('Limpiando formulario');
    tituloEntrega.value = '';
    descripcionEntrega.value = '';
    alumnoEntrega.value = '';
    btnGuardar.disabled = true;
    tituloEntrega.focus();
}

function limpiarLista(){
    console.log('Limpiando lista');
    listaEntregas.length = 0;
    pintarPantalla();
}

tituloEntrega.addEventListener('input', validar);
alumnoEntrega.addEventListener('input', validar);

formulario.addEventListener('submit',(e) => {
    e.preventDefault();//Evitar recarga de pagina
    if(!validar()) return;

    listaEntregas.push({
        titulo: tituloEntrega.value.trim(),
        descripcion: descripcionEntrega.value.trim(),
        alumno: normalizarTexto(alumnoEntrega.value),
    });
    console.log('Entrega guardada:', listaEntregas[listaEntregas.length - 1]);
    limpiarFormulario();
    pintarPantalla();
});
validar();//Validacion inicial
pintarPantalla();//Pintar inicial
