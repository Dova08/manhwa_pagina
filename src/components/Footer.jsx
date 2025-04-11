import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Derechos de autor */}
      <div style={styles.copyright}>
        <p style={styles.copyrightText}>© 2025 ImNotScanlation. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

// Estilos
const styles = {
  footer: {
    backgroundColor: "#212529", // Fondo oscuro
    color: "#fff", // Texto blanco
    padding: "20px 10px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  copyright: {
    borderTop: "1px solid #444", // Línea divisoria opcional
    paddingTop: "10px",
    marginTop: "10px",
  },
  copyrightText: {
    fontSize: "0.8rem",
    color: "#adb5bd", // Color gris claro para el texto
    margin: "0",
  },
};

export default Footer;