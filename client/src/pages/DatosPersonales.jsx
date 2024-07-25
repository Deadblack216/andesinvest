import React from 'react';

const datospersonales = () => {
  // Datos quemados
  const userData = {
    initials: 'HS',
    fullName: 'HERNAN DARIO SANCHEZ TENELANDA',
    lastLogin: '26-07-2024 a las 19:04',
    birthDate: '28/05/1982',
    dataProcessingStatus: 'Autorizado',
    additionalProfileData: 'Ninguno',
    phoneNumber: '0987654321',
    email: 'hernan@example.com',
    address: 'IBARRA, GUAYAQUIL, V-519 EDIFICAZAR'
  };

  return (
    <div className="user-profile">
      <div className="user-header">
        <div className="user-avatar">
          <span>{userData.initials}</span>
        </div>
        <div className="user-info">
          <h2>{userData.fullName}</h2>
          <p>Último ingreso {userData.lastLogin}</p>
        </div>
      </div>
      <div className="user-details">
        <h3>Datos personales</h3>
        <div className="detail-item">
          <strong>Fecha de nacimiento:</strong>
          <span>{userData.birthDate}</span>
        </div>
        <div className="detail-item">
          <strong>Tratamiento de datos personales:</strong>
          <span>{userData.dataProcessingStatus}</span>
        </div>
        <div className="detail-item">
          <strong>Datos adicionales de perfil:</strong>
          <span>{userData.additionalProfileData}</span>
        </div>
      </div>
      <div className="contact-details">
        <h3>Datos de contacto</h3>
        <div className="detail-item">
          <strong>Número de celular:</strong>
          <span>{userData.phoneNumber}</span>
        </div>
        <div className="detail-item">
          <strong>Correo electrónico:</strong>
          <span>{userData.email}</span>
        </div>
      </div>
      <div className="address-details">
        <h3>Direcciones</h3>
        <div className="detail-item">
          <strong>Domicilio:</strong>
          <span>{userData.address}</span>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 MiAplicación</p>
      </footer>

      <style jsx>{`
        .user-profile {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff; /* Fondo blanco */
        }

        .user-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .user-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #007bff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          margin-right: 15px;
        }

        .user-info h2 {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }

        .user-info p {
          margin: 0;
          color: #888;
        }

        .user-details, .contact-details, .address-details {
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .detail-item strong {
          flex: 1;
          color: #333;
        }

        .detail-item span {
          flex: 2;
          text-align: right;
          margin-right: 10px;
          color: #555;
        }

        .footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #888;
        }
        background-color: white;
      `}</style>
    </div>
  );
};

export default datospersonales;
