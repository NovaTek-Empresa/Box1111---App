import React from 'react';
import logoImg from '../../logo/Logo.png';

export default function CompanyInfoView() {
  return (
    <div className="container-wrapper">
      <div className="info-card">

        <div className="logo-container">
          <img 
            src={logoImg} 
            alt="Logo Box1111" 
            className="logo-img" 
          />
        </div>


        <h1 className="brand-title">BOX1111</h1>
        <p className="brand-subtitle">Soluções Imobiliárias Premium</p>


        <div className="section-title">Contato</div>
        <div className="contact-item">
          <a href="tel:+5511993400273">Telefone: (11) 99340-0273</a>
        </div>
        <div className="contact-item email-margin">
          <a href="mailto:contato@box1111.com">E-mail: contato@box1111.com</a>
        </div>


        <div className="section-title">Endereço</div>
        <address className="address-text">
          Rua Doutor Baeta Neves, 158 4º andar<br />
          Baeta Neves – São Bernardo do Campo - SP, CEP 09751-030
        </address>


        <div className="section-title">Redes Sociais</div>
        <div className="social-links">
          <a href="https://instagram.com/box1111" target="_blank" rel="noopener noreferrer" className="icon-ig">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/5511993400273" target="_blank" rel="noopener noreferrer" className="icon-wa">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://linkedin.com/company/box1111" target="_blank" rel="noopener noreferrer" className="icon-li">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>


        <div className="footer-credits">
          <i>Desenvolvido por <span className="novatek">
            <a href="https://novateksiteoficial.netlify.app/" target="_blank" rel="noopener noreferrer">NOVATEK</a>
          </span></i>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} BOX1111. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
}