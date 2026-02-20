import { useState, useEffect } from "react";
import { ContactList } from "./components/ContactList";
import "./index.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetch('/contacts.json')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const agregarContacto = (nuevoContacto) => {
    setContacts(prev => [...prev, nuevoContacto]);
    addNotification("✅ Contacto agregado correctamente");
  };

  const solicitarEliminar = (contacto) => {
    setContactToDelete(contacto);
    setShowDeleteModal(true);
  };

  const confirmarEliminar = () => {
    setContacts(prev => prev.filter(c => c.id !== contactToDelete.id));
    addNotification("🗑️ Contacto eliminado correctamente");
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  const cancelarEliminar = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  const toggleFavorito = (id) => {
    setContacts(prev => 
      prev.map(c => 
        c.id === id ? { ...c, favorito: !c.favorito } : c
      )
    );
    const contacto = contacts.find(c => c.id === id);
    const accion = contacto?.favorito ? "removido" : "agregado";
    addNotification(`⭐ Contacto ${accion} de favoritos`);
  };

  return (
    <div className="app-container">
      <h1>📱 Lista de Contactos</h1>
      
      <ContactList 
        contacts={contacts}
        onAddContact={agregarContacto}
        onRequestDelete={solicitarEliminar}
        onToggleFavorite={toggleFavorito}
      />

      {/* RECUADROS CENTRALES SUPERIORES */}
      <div className="notification-container">
        {notifications.map(({ id, message, type }) => (
          <div key={id} className={`toast-recuaadro toast-recuaadro-${type}`}>
            <div className="toast-icon">{getIcon(type)}</div>
            <span className="toast-message">{message}</span>
            <button onClick={() => removeNotification(id)} className="toast-close">×</button>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelarEliminar}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">🗑️</div>
            <h3>¿Eliminar contacto?</h3>
            <p>
              ¿Estás seguro que quieres eliminar a <strong>
                {contactToDelete?.nombre} {contactToDelete?.apellido}
              </strong>?
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelarEliminar}>Cancelar</button>
              <button className="btn-confirm" onClick={confirmarEliminar}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function getIcon(type) {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  }
}

export default App;