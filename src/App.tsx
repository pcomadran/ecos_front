import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "0 16px",
        }}
      >
        <h1 style={{ marginBottom: "16px" }}>Hola equipo,</h1>
        <h3 style={{ marginBottom: "8px" }}>
          Este es la estructura Front-End de nuestro proyecto ECOS (Quinto
          Impacto),
        </h3>
        <h1>¡¡ BUEN TRABAJO !!</h1>
      </div>
    </div>
  );
}

export default App;