import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext'; // Asegúrate de importar tu contexto de autenticación

const DatosPersonales = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({
    phoneNumber: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/get-user-data/${user.id}`);
        if (!response.ok) {
          throw new Error('Error al recuperar los datos del usuario');
        }
        const data = await response.json();
        setUserData(data);
        setEditableData({
          phoneNumber: data.phoneNumber,
          address: data.address
        });
      } catch (error) {
        console.error('Error al recuperar los datos del usuario:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const getInitials = (fullName) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length === 4) {
      return `${nameParts[0][0]}${nameParts[2][0]}`;
    } else if (nameParts.length === 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    } else {
      return fullName[0]; // Fallback in case the name format is unexpected
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('+593')) {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
    } else {
      return `+593 ${phoneNumber}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${day} de ${monthNames[month - 1]} del ${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const isNumber = /^\d*$/.test(value);
      if (isNumber && value.length <= 9) {
        setEditableData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      }
    } else {
      setEditableData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/update-user-data/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la información del usuario');
      }

      const data = await response.json();
      setUserData((prevData) => ({
        ...prevData,
        phoneNumber: editableData.phoneNumber,
        address: editableData.address,
        modifiedAt: new Date().toISOString()
      }));
      setIsEditing(false);
      alert(data.message); // Mostrar el mensaje de éxito del servidor
    } catch (error) {
      console.error('Error al actualizar la información del usuario:', error);
      alert('Error al actualizar la información del usuario.');
    }
  };

  if (!userData) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="user-profile">
      <div className="user-header">
        <div className="user-avatar">
          <span>{getInitials(userData.fullName)}</span> {/* Mostrar las iniciales calculadas */}
        </div>
        <div className="user-info">
          <h2>{userData.fullName}</h2>
          <p>Último ingreso {new Date(userData.lastLogin).toLocaleString()}</p>
          {userData.modifiedAt && (
            <p>Última modificación {new Date(userData.modifiedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
      <div className="user-details">
        <h3>Datos personales</h3>
        <div className="detail-item">
          <strong>Fecha de nacimiento:</strong>
          <span>{formatDate(userData.dateOfBirth)}</span>
        </div>
        <div className="detail-item">
          <strong>Nombre de Usuario:</strong>
          <span>{userData.username}</span>
        </div>
        <div className="detail-item">
          <strong>Correo electrónico:</strong>
          <span>{userData.email}</span>
        </div>
        <div className="detail-item">
          <strong>Verificado:</strong>
          <span>{userData.Verificado ? 'Sí' : 'No'}</span> {/* Mostrar el estado verificado */}
        </div>
      </div>
      <div className="contact-details">
        <h3>Datos de contacto</h3>
        {isEditing ? (
          <>
            <div className="detail-item editable">
              <strong>Número de celular:</strong>
              <input
                type="text"
                name="phoneNumber"
                value={editableData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="detail-item editable">
              <strong>Domicilio:</strong>
              <input
                type="text"
                name="address"
                value={editableData.address}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="detail-item">
              <strong>Número de celular:</strong>
              <span>{formatPhoneNumber(userData.phoneNumber)}</span> {/* Mostrar el número de teléfono formateado */}
            </div>
            <div className="detail-item">
              <strong>Domicilio:</strong>
              <span>{userData.address}</span>
            </div>
          </>
        )}
      </div>
      <div className="button-container">
        <button
          className="update-button"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? 'Guardar Cambios' : 'Actualizar Información'}
        </button>
      </div>
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

        .detail-item span, .detail-item input {
          flex: 2;
          text-align: right;
          margin-right: 10px;
          color: #555;
          border: none;
          background: none;
        }

        .detail-item input {
          border-bottom: 1px solid #e0e0e0;
          padding: 5px;
        }

        .detail-item.editable {
          background-color: #f0f8ff; /* Color de fondo para campos editables */
        }

        .button-container {
          display: flex;
          justify-content: center; /* Centrar el botón */
        }

        .update-button {
          display: block;
          width: auto;
          padding: 10px 20px;
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

export default DatosPersonales;
