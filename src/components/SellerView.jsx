import React from 'react'

// SellerView: mostra estatísticas e lista de propriedades do vendedor
// Comentários em PT-BR descrevem cada parte

export default function SellerView({ properties, currentUser, onViewDetails, chats, onStartChat, users, onUpdateUser }){
  // Se o usuário for admin mostramos todos os vendedores; se for vendedor mostramos apenas seu dashboard
  const isAdmin = currentUser && currentUser.role === 'admin'

  // Para vendedor: filtrar propriedades por sellerId
  const sellerProperties = isAdmin ? properties : properties.filter(p => p.sellerId === currentUser.id)

  // Calcula valor total aproximado (apenas para exibição)
  const totalValue = sellerProperties.reduce((sum, p) => {
    // tenta extrair número do preço, fallback 0
    const num = parseFloat((p.price || '').replace(/[R$\.\s]/g, '').replace(',', '.'))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  return (
    <div className="seller-dashboard fade-in">
      <div className="seller-stats">
        <div className="seller-stat green">
          <div className="seller-stat-value">{sellerProperties.length}</div>
          <div className="seller-stat-label">Imóveis</div>
        </div>
        <div className="seller-stat">
          <div className="seller-stat-value">R$ {totalValue.toLocaleString()}</div>
          <div className="seller-stat-label">Valor estimado</div>
        </div>
      </div>

      <div className="seller-properties">
        <h3>{isAdmin ? 'Imóveis por Vendedor' : 'Seus Imóveis'}</h3>

        {/* Se for admin: mostrar lista de aprovações pendentes */}
        {isAdmin && (
          <div style={{marginBottom:18,padding:12,background:'rgba(255,255,255,0.02)',borderRadius:8}}>
            <h4 style={{marginTop:0}}>Aprovações pendentes</h4>
            {users && users.filter(u => u.role === 'vendedor' && !u.approved).length === 0 && (
              <div style={{color:'#aaa'}}>Nenhum vendedor aguardando aprovação.</div>
            )}
            {users && users.filter(u => u.role === 'vendedor' && !u.approved).map(seller => (
              <div key={seller.id} style={{display:'flex',gap:12,alignItems:'center',marginTop:10, padding:8, borderRadius:8, background:'rgba(0,0,0,0.2)'}}>
                <div style={{width:56,height:56,background:'#222',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:8}}>{seller.avatar}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700}}>{seller.name} <span style={{color:'#aaa',fontSize:12}}>({seller.email})</span></div>
                  <div style={{color:'#ccc',fontSize:13}}>{seller.phone || ''}</div>
                  {seller.cpf && <div style={{color:'#ddd',fontSize:13}}>CPF: {seller.cpf}</div>}
                  {seller.address && <div style={{color:'#ddd',fontSize:13}}>Endereço: {seller.address}</div>}
                  <div style={{display:'flex',gap:8,marginTop:8}}>
                    {seller.rgImage && <img src={seller.rgImage} alt="rg" style={{width:80,height:60,objectFit:'cover',borderRadius:6}} />}
                    {seller.faceImage && <img src={seller.faceImage} alt="face" style={{width:60,height:60,objectFit:'cover',borderRadius:'50%'}} />}
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <button className="btn btn-primary" onClick={() => { if (onUpdateUser) onUpdateUser({ id: seller.id, approved: true }); alert('Vendedor aprovado.') }}>Aprovar</button>
                  <button className="btn btn-secondary" onClick={() => { if (onUpdateUser) onUpdateUser({ id: seller.id, approved: false, docSubmitted: false }); alert('Vendedor rejeitado e dados removidos do envio.') }}>Rejeitar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin ? (
          // Admin: agrupa por vendedor e exibe cada conjunto
          users.filter(u => u.role === 'vendedor').map(seller => (
            <div key={seller.id} style={{marginBottom:18}}>
              <h4 style={{marginBottom:8}}>{seller.name}</h4>
              {properties.filter(p => p.sellerId === seller.id).map(p => (
                <div key={p.id} className="property-card" style={{marginBottom:12}}>
                  <div className="property-image" style={{backgroundImage:`url(${p.image})`}}>
                    <div className="property-price">{p.price}</div>
                  </div>
                  <div className="property-info">
                    <h4 className="property-title">{p.title}</h4>
                    <div style={{display:'flex',gap:8}}>
                      <div className="action-btn primary" onClick={() => onViewDetails(p)}>Ver</div>
                      <div className="action-btn secondary" onClick={() => onStartChat(p.sellerId)}>Chat</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          // Vendedor: mostra apenas seus imóveis
          sellerProperties.length === 0 ? (
            <div style={{color:'#aaa',padding:20}}>Você ainda não cadastrou propriedades.</div>
          ) : sellerProperties.map(p => (
            <div key={p.id} className="property-card" style={{marginBottom:12}}>
              <div className="property-image" style={{backgroundImage:`url(${p.image})`}}>
                <div className="property-price">{p.price}</div>
              </div>
              <div className="property-info">
                <h4 className="property-title">{p.title}</h4>
                <div style={{display:'flex',gap:8}}>
                  <div className="action-btn primary" onClick={() => onViewDetails(p)}>Ver</div>
                  <div className="action-btn secondary" onClick={() => onStartChat(p.sellerId)}>Chat</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
