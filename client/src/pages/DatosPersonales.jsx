import React from 'react';

const datospersonales = () => {
  // Datos de la base de datos
  const userData = {
    initials: 'NA',
    username: 'User',
    fullName: 'Nombre Apellido',
    lastLogin: '25-07-2024 a las 03:28',
    birthDate: '26/08/2002',
    additionalProfileData: 'Ninguno',
    phoneNumber: '0987456186',
    email: '@epn.edu.ec',
    address: 'Quito'
  };

  const handleUpdate = () => {
    // Lógica para actualizar la información
    alert('Actualizar información');
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
          <strong>Nombre de Usuario:</strong>
          <span>{userData.username}</span>
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
      <button className="update-button" onClick={handleUpdate}>Actualizar Información</button>
      <footer className="footer">
        <p>&copy; 2024 AndesInvest</p>
      </footer>

      <style jsx>{`
       body {
          background-color: #fff; /* Fondo blanco */
        }
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

        .update-button {
          display: block;
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          text-align: center;
        }

        .update-button:hover {
          background-color: #0056b3;
        }

        .footer {
          margin-top: 1.5rem;
          text-align: center;
          color: #888;
        }
      `}</style>
    </div>
  );
};

export default datospersonales;
