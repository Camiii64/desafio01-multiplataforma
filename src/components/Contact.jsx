import "./Contact.css";

export const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  const { id, nombre, apellido, telefono, favorito } = contact;

  const handleDelete = () => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar a ${nombre} ${apellido}?`
    );

    if (confirmar) {
      onDelete(id);
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(id);
  };

  return (
    <div className={`contact-card ${favorito ? "favorite" : ""}`}>
      <div className="contact-info">
        <h3>
          {nombre} {apellido}
        </h3>
        <p>📞 {telefono}</p>
      </div>

      <div className="contact-actions">
        <button className="favorite-btn" onClick={handleToggleFavorite}>
          {favorito ? "⭐" : "☆"}
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};