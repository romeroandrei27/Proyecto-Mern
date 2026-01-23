/* eslint-env browser */
/*
  Plataforma Académica - CRUD de Entregas
  SPA basada en estado del DOM
*/

// ==================
// ESTADO (fuente de verdad)
// ==================
const listaEntregas = [];
let indiceEnEdicion = null;

// ==================
// ELEMENTOS DEL DOM
// ==================
const formulario = document.getElementById("formularioEntrega");
const titulo = document.getElementById("tituloEntrega");
const descripcion = document.getElementById("descripcionEntrega");
const alumno = document.getElementById("alumnoEntrega");
const textoError = document.getElementById("textoError");
const mensaje = document.getElementById("mensaje");
const btnGuardar = document.getElementById("btnGuardar");
const lista = document.getElementById("listaEntregas");
const textoVacio = document.getElementById("textoVacio");

// ==================
// REGLAS DE NEGOCIO
// ==================
const MIN_TITULO = 5;
const MIN_ALUMNO = 3;

function normalizar(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function validar() {
  let error = "";

  if (normalizar(titulo.value).length < MIN_TITULO) {
    error = "El título debe tener al menos 5 caracteres.";
  } else if (normalizar(alumno.value).length < MIN_ALUMNO) {
    error = "El nombre del alumno es obligatorio.";
  }

  textoError.textContent = error;
  btnGuardar.disabled = Boolean(error);
  return !error;
}

// ==================
// RENDER (READ)
// ==================
function pintar() {
  lista.textContent = "";
  textoVacio.style.display = listaEntregas.length ? "none" : "block";

  listaEntregas.forEach((entrega, index) => {
    const li = document.createElement("li");

    const info = document.createElement("p");
    info.textContent =
      `${entrega.titulo} — ${entrega.alumno}\n${entrega.descripcion}`;

    const acciones = document.createElement("div");
    acciones.className = "fila-acciones";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar ✏️";
    btnEditar.className = "boton-chico";
    btnEditar.dataset.accion = "editar";
    btnEditar.dataset.indice = index;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar 🗑️";
    btnEliminar.className = "boton-chico boton-peligro";
    btnEliminar.dataset.accion = "eliminar";
    btnEliminar.dataset.indice = index;

    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    li.appendChild(info);
    li.appendChild(acciones);
    lista.appendChild(li);
  });
}

// ==================
// EVENTOS
// ==================
titulo.addEventListener("input", validar);
alumno.addEventListener("input", validar);

// CREATE / UPDATE
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validar()) return;

  const entrega = {
    titulo: normalizar(titulo.value),
    descripcion: normalizar(descripcion.value),
    alumno: normalizar(alumno.value),
  };

  if (indiceEnEdicion === null) {
    listaEntregas.push(entrega);
    mensaje.textContent = "Entrega registrada ✅";
  } else {
    listaEntregas[indiceEnEdicion] = entrega;
    mensaje.textContent = "Entrega actualizada ✏️";
    indiceEnEdicion = null;
  }

  formulario.reset();
  btnGuardar.disabled = true;
  pintar();
});

// DELETE / EDIT (delegación)
lista.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;

  const index = Number(boton.dataset.indice);

  if (boton.dataset.accion === "eliminar") {
    listaEntregas.splice(index, 1);
    mensaje.textContent = "Entrega eliminada 🗑️";
    pintar();
  }

  if (boton.dataset.accion === "editar") {
    const entrega = listaEntregas[index];
    titulo.value = entrega.titulo;
    descripcion.value = entrega.descripcion;
    alumno.value = entrega.alumno;
    indiceEnEdicion = index;
    validar();
    mensaje.textContent = "Editando entrega ✏️";
  }
});

// ==================
// INICIO
// ==================
mensaje.textContent = "Listo para registrar entregas.";
pintar();
