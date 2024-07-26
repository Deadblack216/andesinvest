import React from 'react';

const CanalesDigitales = () => {
    return (
        <div>   
            <header className="page-header">
                <h1>Redes Digitales</h1>
            </header>
            <main>
                <section className="social-media-cards">
                    <div className="card facebook-card">
                        <div className="image-container">
                            <img src="public/AndesinvestFacebook.webp" alt="Facebook" className="social-media-image" />
                        </div>
                        <h2>Facebook</h2>
                        <p>Únete a nuestra comunidad en Facebook y mantente actualizado con las últimas noticias y promociones.</p>
                        <a href="https://www.facebook.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Facebook</a>
                    </div>
                    <div className="card instagram-card">
                        <div className="image-container">
                            <img src="public/AndesinvestInstagram.webp" alt="Instagram" className="social-media-image" />
                        </div>
                        <h2>Instagram</h2>
                        <p>Sigue nuestro perfil de Instagram para ver fotos y videos exclusivos, y participa en nuestros concursos.</p>
                        <a href="https://www.instagram.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Instagram</a>
                    </div>
                    <div className="card twitter-card">
                        <div className="image-container">
                            <img src="public/AndesinvestTwitter.webp" alt="Twitter" className="social-media-image" />
                        </div>
                        <h2>Twitter</h2>
                        <p>Conéctate con nosotros en Twitter para recibir actualizaciones en tiempo real y unirte a la conversación.</p>
                        <a href="https://www.twitter.com/tu_pagina" className="social-media-link" target="_blank" rel="noopener noreferrer">Síguenos en Twitter</a>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 AndesInvest</p>
            </footer>

            {/* Estilos en línea para propósitos demostrativos */}
            <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                    background-color: #FFF; /* Fondo gris claro */
                }
                .page-header {
                    text-align: center;
                    margin: 20px 0;
                }
                .page-header h1 {
                    font-size: 3em;
                    color: #003366; /* Azul oscuro del logo EPN */
                    text-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                    border-bottom: 2px solid #d32f2f; /* Rojo del logo EPN */
                    padding-bottom: 10px;
                    display: inline-block;
                }
                .social-media-cards {
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                }
                .card {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    text-align: center;
                    width: 30%;
                    padding: 20px;
                    background-color: white;
                    transition: transform 0.3s;
                }
                .card:hover {
                    transform: scale(1.05);
                }
                .image-container {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 15px;
                }
                .social-media-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .facebook-card {
                    background-color: #3b5998; /* Azul de Facebook */
                    color: white;
                }
                .instagram-card {
                    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                    color: white;
                }
                .twitter-card {
                    background-color: #1da1f2; /* Azul de Twitter */
                    color: white;
                }
                .social-media-link {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 15px;
                    border-radius: 5px;
                    background-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    text-decoration: none;
                    transition: background-color 0.3s;
                }
                .social-media-link:hover {
                    background-color: rgba(255, 255, 255, 0.4);
                }
                    

            `}</style>
        </div>
    );
};

export default CanalesDigitales;
