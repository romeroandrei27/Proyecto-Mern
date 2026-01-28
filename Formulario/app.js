const { useState, useEffect } = React;

function App() {
  const [session, setSession] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // Al cargar el componente, revisamos LocalStorage
  useEffect(() => {
    const sessionGuardada = localStorage.getItem("sesionUsuario");
    if (sessionGuardada) {
      setSession(JSON.parse(sessionGuardada));
    }
  }, []);

  const guardarSesion = (e) => {
    e.preventDefault();

    const nuevaSesion = {
      nombre,
      email,
      fecha: new Date().toLocaleString(),
    };

    localStorage.setItem("sesionUsuario", JSON.stringify(nuevaSesion));
    setSession(nuevaSesion);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("sesionUsuario");
    setSession(null);
    setNombre("");
    setEmail("");
  };

  return (
    <div className="container">
      {!session ? (
        <>
          <h2>Iniciar sesión</h2>
          <form onSubmit={guardarSesion}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Guardar sesión</button>
          </form>
        </>
      ) : (
        <>
          <h2>Sesión activa</h2>
          <div className="session-box">
            <p><strong>Nombre:</strong> {session.nombre}</p>
            <p><strong>Email:</strong> {session.email}</p>
            <p><strong>Fecha:</strong> {session.fecha}</p>
          </div>

          <button className="logout" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
