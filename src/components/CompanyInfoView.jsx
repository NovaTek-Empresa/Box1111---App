import React from 'react';
import logoImg from '../../logo/Logo.png';

// Novo menu Sobre: moderno, funcional, com links e informações atuais
export default function CompanyInfoView() {
  return (
    <div style={{background:'#fff', minHeight:'100vh', width:'100%', padding:'0', margin:'0 auto'}}>
      <div style={{maxWidth:400, margin:'0 auto', padding:'24px 12px 0 12px', borderRadius:18, boxShadow:'0 2px 16px rgba(0,0,0,0.07)', background:'#fff', textAlign:'center'}}>
        {/* Logo centralizada no topo do card */}
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:10}}>
          <img src={logoImg} alt="Logo Box1111" className="logo-img" style={{marginBottom:0, width:90, height:90, borderRadius:18, boxShadow:'0 2px 12px rgba(0,0,0,0.10)'}} />
        </div>

        {/* Nome, slogan */}
        <div style={{fontSize:28, fontWeight:900, letterSpacing:2, color:'#1e90ff', marginBottom:4}}>BOX1111</div>
        <div style={{fontSize:16, color:'#222', marginBottom:10}}>Soluções Imobiliárias Premium</div>
        <div style={{fontSize:15, color:'#555', marginBottom:18}}>
        </div>

        {/* Contato */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>Contato</div>
        <div style={{fontSize:15, marginBottom:2}}>
          <a href="tel:+5511993400273" style={{color:'#1e90ff', textDecoration:'none'}}>Telefone: (11) 99340-0273</a>
        </div>
        <div style={{fontSize:15, marginBottom:14}}>
          <a href="mailto:contato@box1111.com" style={{color:'#1e90ff', textDecoration:'none'}}>E-mail: contato@box1111.com</a>
        </div>

        {/* Endereço */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>Endereço</div>
        <div style={{fontSize:15, marginBottom:18}}>Rua Doutor Baeta Neves, 158 4o andar <br></br>Baeta Neves
          São Bernardo do Campo - SP, CEP 09751-030</div>

        {/* Redes sociais */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:6}}>Redes Sociais</div>
        <div style={{display:'flex', justifyContent:'center', gap:18, marginBottom:18}}>
          <a href="https://instagram.com/box1111" target="_blank" rel="noopener noreferrer" title="Instagram" style={{color:'#E1306C', fontSize:26}}>
            <i className="fab fa-instagram"></i> <span style={{display: 'none' }}>Instagram</span>
          </a>
          <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{color:'#25D366', fontSize:26}}>
            <i className="fab fa-whatsapp"></i> <span style={{display:'none'}}>WhatsApp</span>
          </a>
          <a href="https://linkedin.com/company/box1111" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{color:'#0077B5', fontSize:26}}>
            <i className="fab fa-linkedin"></i> <span style={{display:'none'}}>LinkedIn</span>
          </a>
        </div>

        {/* Equipe */}
        

          <i className="creditos">
            Desenvolvido por
            <span className="novatek">
            <a href="https://novateksiteoficial.netlify.app/" target="_blank">NOVATEK</a>
          </span>
        </i>

      {/* Rodapé */}
      <div style={{fontSize:13, color:'#aaa', marginTop:18}}>
        &copy; {new Date().getFullYear()} BOX1111. Todos os direitos reservados.
      </div>
    </div>
  </div>
      );
}
