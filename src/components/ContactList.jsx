import { useState } from "react";
import { Contact } from "./Contact";

export const ContactList = ({ 
  contacts, 
  onRequestDelete, 
  onToggleFavorite, 
  onAddContact 
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const validarTelefono = (telefono) => {
    const telefonoLimpio = telefono.replace(/[\s\-\.]/g, '');
    return /^[0-9]{7,8}$/.test(telefonoLimpio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    const nombreValido = formData.nombre.trim();
    const apellidoValido = formData.apellido.trim();
    const telefonoValido = formData.telefono.trim();

    if (!nombreValido || !apellidoValido || !telefonoValido) {
      setError("⚠️ Completa todos los campos");
      return;
    }

    if (!validarTelefono(telefonoValido)) {
      setError("📱 Teléfono inválido. Usa: 7777-7777, 777.777.7777 o 77777777");
      return;
    }

    const telefonoExiste = contacts.some(c => 
      c.telefono.toLowerCase() === telefonoValido.toLowerCase()
    );
    
    if (telefonoExiste) {
      setError("❌ Este número ya está registrado");
      return;
    }

    const nuevoContacto = {
      id: Date.now(),
      nombre: nombreValido,
      apellido: apellidoValido,
      telefono: telefonoValido,
      favorito: false
    };

    onAddContact(nuevoContacto);
    setFormData({ nombre: "", apellido: "", telefono: "" });
  };

  const contactosOrdenados = [...contacts].sort((a, b) => 
    Number(b.favorito) - Number(a.favorito)
  );

  return (
    <div className="contact-list">
      <form onSubmit={handleSubmit} className="add-contact-form">
        <div className="form-row">
          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <input
            name="telefono"
            placeholder="Ej: 7777-7777"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit">+ Agregar Contacto</button>
      </form>

      <div className="contacts-container">
        {contacts.length === 0 ? (
          <p className="empty-state">No hay contactos aún</p>
        ) : (
          contactosOrdenados.map((contact) => (
            <Contact
              key={contact.id.toString()}
              contact={contact}
              onRequestDelete={onRequestDelete}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};