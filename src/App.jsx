import { useState } from "react";
import { Contact } from "./components/Contact";
import "./App.css";

function App() {
  const [contacto, setContacto] = useState({
    id: 1,
    nombre: "Cami",
    apellido: "Medrano",
    telefono: "7777-7777",
    favorito: false,
  });

  const eliminarContacto = (id) => {
    alert("Contacto eliminado (simulación)");
  };

  const toggleFavorito = (id) => {
    setContacto({
      ...contacto,
      favorito: !contacto.favorito,
    });
  };

  return (
    <div className="app-container">
      <h1>Lista de Contactos</h1>

      <Contact
        contact={contacto}
        onDelete={eliminarContacto}
        onToggleFavorite={toggleFavorito}
      />
    </div>
  );
}

export default App;