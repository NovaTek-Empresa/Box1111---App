import React from 'react'

// PropertyDetail: exibe o imóvel com galeria maior e controles
// Comentários em PT-BR explicam cada função e linha chave

export default function PropertyDetail({ property, onBack, isFavorite, onToggleFavorite, onStartChat, users, initialIndex = 0 }){
  // Estado para índice da imagem atual na galeria
  const [index, setIndex] = React.useState(initialIndex)
  // Estado para fullscreen simples (exibe imagem em overlay)
  const [fullscreen, setFullscreen] = React.useState(false)
  // Estado para modal de reserva
  const [showReserve, setShowReserve] = React.useState(false)

  // Função: avança para próxima imagem (roda)
  const next = () => setIndex(i => (i + 1) % (property.images ? property.images.length : 1))
  // Função: volta para imagem anterior
  const prev = () => setIndex(i => (i - 1 + (property.images ? property.images.length : 1)) % (property.images ? property.images.length : 1))

  // Seller (vendedor) relacionado ao imóvel
  const seller = users.find(u => u.id === property.sellerId)
  // Se o initialIndex mudar externamente, atualiza o índice
  React.useEffect(() => {
    setIndex(initialIndex || 0)
  }, [initialIndex])

  return (
    <div className="property-detail-container fade-in" style={{paddingBottom:120}}>
      <button className="btn btn-secondary" onClick={onBack} style={{marginBottom:12}}>Voltar</button>

      {/* Galeria grande: deixamos a imagem maior para melhor visualização */}
      <div style={{position:'relative',borderRadius:16,overflow:'hidden',marginBottom:16}}>
        <div className="property-image" style={{height:360, backgroundImage:`url(${(property.images && property.images[index]) || property.image})`, backgroundSize:'cover', backgroundPosition:'center'}} onClick={() => setFullscreen(true)} />

        {/* Controles da galeria */}
        <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}>
          <button className="close-modal" onClick={prev}><i className="fas fa-chevron-left"></i></button>
        </div>
        <div style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)'}}>
          <button className="close-modal" onClick={next}><i className="fas fa-chevron-right"></i></button>
        </div>

        {/* Preço e ações */}
        <div style={{position:'absolute',bottom:12,left:12}} className="property-price">{property.price}</div>
        <div style={{position:'absolute',top:12,right:12}} className={`property-favorite ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(property.id)}>
          <i className="fas fa-heart"></i>
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:18}}>
        {(property.images && property.images.length > 0 ? property.images : [property.image]).map((img, i) => (
          <div key={i} onClick={() => setIndex(i)} style={{width:80,height:60,backgroundImage:`url(${img})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:8,border: i===index ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.06)'}} />
        ))}
      </div>

      {/* Informações do imóvel */}
      <div className="property-info" style={{marginBottom:16}}>
        <h2 className="property-title">{property.title}</h2>
        <div className="property-address">{property.address}</div>
        <p className="property-description" style={{marginTop:12}}>{property.description}</p>

        <div className="property-features" style={{marginTop:12}}>
          <div className="feature">
            <i className="fas fa-bed"></i>
            <div>{property.bedrooms} Quartos</div>
          </div>
          <div className="feature">
            <i className="fas fa-bath"></i>
            <div>{property.bathrooms} Banheiros</div>
          </div>
          <div className="feature">
            <i className="fas fa-ruler-combined"></i>
            <div>{property.area}</div>
          </div>
        </div>

        <div style={{marginTop:18,display:'block',gap:12}} className="property-actions">
          <div className="action-btn green" style={{background:'#22c55e',color:'#000000ff',}} onClick={() => setShowReserve(true)}><i class="fas fa-key"></i>Alugar
          </div>
          <div className="action-btn primary" onClick={() => onStartChat(seller.id)}><i class="fas fa-comments"></i>Conversar com Vendedor</div> 
        </div>
      </div>

      {/* Fullscreen overlay para imagem */}
      {fullscreen && (
        <div className="modal-overlay" onClick={() => setFullscreen(false)}>
          <div className="modal-content" style={{maxWidth:'95%',padding:6,background:'transparent',boxShadow:'none',border:'none'}}>
            <img src={(property.images && property.images[index]) || property.image} alt="imagem" style={{width:'100%',height:'auto',borderRadius:12}} />
          </div>
        </div>
      )}

      {/* Modal de reserva */}
      {showReserve && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth:600,padding:0}}>
            {/* Importa o modal de reserva */}
            {React.createElement(require('./ReserveModal').default, { property, onClose: () => setShowReserve(false) })}
          </div>
        </div>
      )}
    </div>
  )
}
