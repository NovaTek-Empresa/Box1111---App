import React from 'react'

// CompanyInfoView: seção "Sobre a Empresa" replicando conteúdo original

export default function CompanyInfoView(){
  // Ajustes inline para corrigir espaçamento excessivo na seção "Sobre"
  // Mantemos classes CSS originais, mas aplicamos pequenos overrides locais
  return (
    <div className="company-info fade-in" style={{padding:20, paddingTop:12, marginTop:6, textAlign:'center'}}>
      <div className="company-logo-large" style={{marginBottom:12}}>1111</div>
      <div className="company-name" style={{marginBottom:8}}>BOX1111</div>
      <div className="company-slogan" style={{marginBottom:14}}>Soluções Imobiliárias Premium</div>

      <div className="company-details" style={{marginBottom:12}}>
        <div className="company-detail" style={{padding:12}}>
          <i className="fas fa-phone"></i>
          <h4>Contato</h4>
          <p>Tel: (11) 99999-0000</p>
        </div>
        <div className="company-detail" style={{padding:12}}>
          <i className="fas fa-map-marker-alt"></i>
          <h4>Endereço</h4>
          <p>Av. Exemplo, 123 - Rio de Janeiro</p>
        </div>
      </div>

      <div className="team-members" style={{marginTop:6}}>
        <div className="team-member">
          <div className="team-member-avatar">BA</div>
          <div className="team-member-name">Admin</div>
          <div className="team-member-role">Suporte</div>
        </div>
        <div className="team-member">
          <div className="team-member-avatar">VB</div>
          <div className="team-member-name">Vendedor</div>
          <div className="team-member-role">Vendas</div>
        </div>
      </div>
    </div>
  )
}
