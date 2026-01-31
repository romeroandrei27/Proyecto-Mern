const { useState, useEffect } = React;

function App() {
  const [matricula, setMatricula] = useState(() => {
    return localStorage.getItem("matricula") || "";
  });
  const [inputMatricula, setInputMatricula] = useState("");

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("Tarea");
  const [entregas, setEntregas] = useState(() => {
    return JSON.parse(localStorage.getItem("entregas")) || [];
  });
  const [dragId, setDragId] = useState(null);

  useEffect(() => {
    localStorage.setItem("entregas", JSON.stringify(entregas));
  }, [entregas]);

  const guardarMatricula = (e) => {
    e.preventDefault();

    if (!/^\d{6,}$/.test(inputMatricula)) {
      alert("La matrícula debe tener al menos 6 números");
      return;
    }

    localStorage.setItem("matricula", inputMatricula);
    setMatricula(inputMatricula);
  };

  const cerrarSesion = () => {
    const confirmar = confirm("¿Deseas cambiar la matrícula?");
    if (!confirmar) return;

    localStorage.removeItem("matricula");
    setMatricula("");
    setInputMatricula("");
  };

  const agregarEntrega = (e) => {
    e.preventDefault();

    if (titulo.trim().length < 3) {
      alert("El título debe tener al menos 3 caracteres");
      return;
    }

    setEntregas([
      ...entregas,
      {
        id: Date.now(),
        titulo,
        tipo,
        estado: "Pendiente",
        inicio: Date.now()
      }
    ]);

    setTitulo("");
  };

  const eliminarEntrega = (id) => {
    const confirmar = confirm("¿Seguro que deseas eliminar esta entrega?");
    if (!confirmar) return;

    setEntregas(entregas.filter(e => e.id !== id));
  };

  const moverEntrega = (estado) => {
    setEntregas(entregas.map(e =>
      e.id === dragId ? { ...e, estado } : e
    ));
  };

  const tiempoTranscurrido = (inicio) => {
    const segundos = Math.floor((Date.now() - inicio) / 1000);
    return `${segundos}s activo`;
  };

  // 🔐 SI NO HAY MATRÍCULA → PANTALLA DE ACCESO
  if (!matricula) {
    return (
      <div className="session-card">
        <h2>Acceso al sistema</h2>
        <form onSubmit={guardarMatricula}>
          <input
            placeholder="Ingresa tu matrícula"
            value={inputMatricula}
            onChange={e => setInputMatricula(e.target.value)}
          />
          <button>Ingresar</button>
        </form>
      </div>
    );
  }

  // 📋 SISTEMA PRINCIPAL
  return (
    <div className="container">
      <h1>Gestor de Entregas Académicas</h1>
      <p><strong>Matrícula:</strong> {matricula}</p>

      <form onSubmit={agregarEntrega}>
        <input
          placeholder="Título de la entrega"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option>Tarea</option>
          <option>Examen</option>
          <option>Proyecto</option>
        </select>

        <button>Agregar</button>
      </form>

      <div className="board">
        {["Pendiente", "En Proceso", "Entregado"].map(col => (
          <div
            key={col}
            className="column"
            onDragOver={e => e.preventDefault()}
            onDrop={() => moverEntrega(col)}
          >
            <h3>{col}</h3>

            {entregas
              .filter(e => e.estado === col)
              .map(e => (
                <div
                  key={e.id}
                  className="card"
                  draggable
                  onDragStart={() => setDragId(e.id)}
                >
                  <div className="card-header">
                    <strong>{e.titulo}</strong>
                    <button
                      className="delete-btn"
                      onClick={(ev) => {
                        ev.stopPropagation();
                        eliminarEntrega(e.id);
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  <div>{e.tipo}</div>
                  <div className="timer">
                    {tiempoTranscurrido(e.inicio)}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <button className="logout-btn" onClick={cerrarSesion}>
        Cambiar matrícula
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
