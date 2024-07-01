import Navbar from "./components/Navbar";
import LandingPage from "./pages/landinPage";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;
