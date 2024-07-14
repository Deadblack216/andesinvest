// /src/components/AccountCarousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel

const AccountCarousel = ({ accounts }) => {
  return (
    <Carousel
      showThumbs={false}
      infiniteLoop
      useKeyboardArrows
      showStatus={false}
      className="custom-carousel"
    >
      {accounts.map((account) => (
        <div key={account._id} className="account-info bg-blue-800 p-6 rounded-md mb-6 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">
            {account.accountType === 'savings' ? 'Cuenta de Ahorros' : 'Cuenta Corriente'}
          </h2>
          <p className="text-gray-300 text-lg mb-1">{account.accountNumber}</p>
          <p className="text-gray-300 font-semibold text-xl">Saldo: ${account.balance.toFixed(2)}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default AccountCarousel;
