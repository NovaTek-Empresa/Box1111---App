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

        {/* Nome, slogan e missão */}
        <div style={{fontSize:28, fontWeight:900, letterSpacing:2, color:'#1e90ff', marginBottom:4}}>BOX1111</div>
        <div style={{fontSize:16, color:'#222', marginBottom:10}}>Soluções Imobiliárias Premium</div>
        <div style={{fontSize:15, color:'#555', marginBottom:18}}>
          <b>Missão:</b> Conectar pessoas aos melhores imóveis com tecnologia, transparência e atendimento humanizado.
        </div>

        {/* Contato */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>Contato</div>
        <div style={{fontSize:15, marginBottom:2}}>
          <a href="tel:+5511999990000" style={{color:'#1e90ff', textDecoration:'none'}}>Telefone: (11) 99999-0000</a>
        </div>
        <div style={{fontSize:15, marginBottom:14}}>
          <a href="mailto:contato@box1111.com" style={{color:'#1e90ff', textDecoration:'none'}}>E-mail: contato@box1111.com</a>
        </div>

        {/* Endereço */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>Endereço</div>
        <div style={{fontSize:15, marginBottom:18}}>Av. Realidade, 1111 - São Paulo, SP</div>

        {/* Redes sociais */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:6}}>Redes Sociais</div>
        <div style={{display:'flex', justifyContent:'center', gap:18, marginBottom:18}}>
          <a href="https://instagram.com/box1111" target="_blank" rel="noopener noreferrer" title="Instagram" style={{color:'#E1306C', fontSize:26}}>
            <i className="fab fa-instagram"></i> <span style={{fontSize:0}}>Instagram</span>
          </a>
          <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{color:'#25D366', fontSize:26}}>
            <i className="fab fa-whatsapp"></i> <span style={{fontSize:0}}>WhatsApp</span>
          </a>
          <a href="https://linkedin.com/company/box1111" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{color:'#0077B5', fontSize:26}}>
            <i className="fab fa-linkedin"></i> <span style={{fontSize:0}}>LinkedIn</span>
          </a>
        </div>

        {/* Valores */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:2}}>Valores</div>
        <div style={{fontSize:15, marginBottom:18}}>
          Inovação, ética, proximidade e excelência no atendimento.
        </div>

        {/* Equipe */}
        <div style={{fontWeight:700, fontSize:15, marginBottom:6}}>Equipe</div>
        <div style={{display:'flex', justifyContent:'center', gap:18, marginBottom:24}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{width:44, height:44, borderRadius:'50%', background:'#1e90ff', color:'#fff', fontWeight:700, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:2}}>
              <i className="fas fa-user-tie"></i>
            </div>
            <div style={{fontWeight:700, fontSize:14}}>Bruno Alves</div>
            <div style={{color:'#888', fontSize:13}}>CEO</div>
          </div>
            {/* ...outros membros da equipe, se desejar... */}
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div style={{width:44, height:44, borderRadius:'50%', background:'#ff3366', color:'#fff', fontWeight:700, fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:2}}>
                <i className="fas fa-user"></i>
              </div>
              <div style={{fontWeight:700, fontSize:14}}>Vanessa Brito</div>
              <div style={{color:'#888', fontSize:13}}>Atendimento</div>
            </div>
          </div>
      </div>

      {/* Rodapé */}
      <div style={{fontSize:13, color:'#aaa', marginTop:18}}>
        &copy; {new Date().getFullYear()} BOX1111. Todos os direitos reservados.
      </div>
    </div>
  );
}
