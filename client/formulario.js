const formulario = document.getElementById("formularioEntrega");
const titulo = document.getElementById("tituloEntrega");
const descripcion = document.getElementById("descripcionEntrega");
const alumno = document.getElementById("alumnoEntrega");
const btnGuardar = document.getElementById("btnGuardar");
const lista = document.getElementById("listaEntregas");
const textoVacio = document.getElementById("textoVacio");

// Intentar cargar datos de LocalStorage al abrir la página
let entregas = JSON.parse(localStorage.getItem("mis_entregas")) || [];

// Ejecutar mostrarEntregas al inicio para ver lo que ya estaba guardado
mostrarEntregas();

/* VALIDACIÓN */
function validarFormulario() {
  const tVal = titulo.value.trim();
  const aVal = alumno.value.trim();

  // Se activa solo si el título tiene 5+ caracteres y el alumno no está vacío
  if (tVal.length >= 5 && aVal !== "") {
    btnGuardar.disabled = false;
  } else {
    btnGuardar.disabled = true;
  }
}

// Escuchamos el evento 'input' para que la validación sea inmediata
titulo.addEventListener("input", validarFormulario);
alumno.addEventListener("input", validarFormulario);

/* GUARDAR */
formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que la página se recargue

  const nuevaEntrega = {
    titulo: titulo.value,
    descripcion: descripcion.value,
    alumno: alumno.value,
    id: Date.now() // ID único para cada tarea
  };

  // Guardar en el array
  entregas.push(nuevaEntrega);
  
  // GUARDAR EN LOCALSTORAGE (Persistencia)
  localStorage.setItem("mis_entregas", JSON.stringify(entregas));

  // Actualizar la interfaz
  mostrarEntregas();

  // Limpiar formulario
  formulario.reset();
  btnGuardar.disabled = true;
});

/* MOSTRAR */
function mostrarEntregas() {
  lista.innerHTML = "";

  if (entregas.length === 0) {
    textoVacio.style.display = "block";
    return;
  }

  textoVacio.style.display = "none";

  entregas.forEach(entrega => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entrega.titulo}</strong>
      <span class="texto-chico">Alumno: ${entrega.alumno}</span>
      <p style="margin: 5px 0 0 0;">${entrega.descripcion}</p>
    `;
    lista.appendChild(li);
  });
}