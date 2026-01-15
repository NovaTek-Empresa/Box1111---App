import React from 'react'
import ConfirmacaoDeReserva from './ConfirmacaoDeReserva';
import Comentario from "./Comentario";
import { useNavigate } from 'react-router-dom'; 

export default function PropertyDetail({ 
  property, 
  onBack, 
  isFavorite, 
  onToggleFavorite, 
  onStartChat, 
  users, 
  initialIndex = 0,
  abrirComentarios
}) {
  const navigate = useNavigate();

  // --- ADICIONADO: Estado do index que faltava ---
  const [index, setIndex] = React.useState(initialIndex || 0);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [showReserve, setShowReserve] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('detalhes');

  const next = () => setIndex(i => (i + 1) % (property.images ? property.images.length : 1))
  const prev = () => setIndex(i => (i - 1 + (property.images ? property.images.length : 1)) % (property.images ? property.images.length : 1))

  const seller = users.find(u => u.id === property.sellerId)

  React.useEffect(() => {
    setIndex(initialIndex || 0)
  }, [initialIndex])
  
  if (activeTab === 'confirmar') {
    return <ConfirmacaoDeReserva voltar={() => setActiveTab('detalhes')} />;
  }

  return (
    <div className="property-detail-container fade-in" style={{paddingBottom:120}}>
      <button className="btn btn-secondary" onClick={onBack} style={{marginBottom:12}}>Voltar</button>

      {/* Galeria grande */}
      <div style={{position:'relative',borderRadius:16,overflow:'hidden',marginBottom:16}}>
        <div
          className="property-image"
          style={{
            height: 360,
            backgroundImage: `url(${(property.images && property.images[index]) ? property.images[index] : property.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => setFullscreen(true)}
        />

        <div style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}}>
          <button className="close-modal" onClick={prev}><i className="fas fa-chevron-left"></i></button>
        </div>
        <div style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)'}}>
          <button className="close-modal" onClick={next}><i className="fas fa-chevron-right"></i></button>
        </div>

        <div style={{position:'absolute',bottom:12,left:12}} className="property-price">{property.price}</div>
        <div style={{position:'absolute',top:12,right:12}} className={`property-favorite ${isFavorite ? 'active' : ''}`} onClick={() => onToggleFavorite(property.id)}>
          <i className="fas fa-heart"></i>
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{display:'flex',gap:8,overflowX:'auto',marginBottom:18}}>
        {(property.images && property.images.length > 0 ? property.images : [property.image]).map((img, i) => (
          <div key={i} onClick={() => setIndex(i)} style={{width:80,height:60,backgroundImage:`url(${img})`,backgroundSize:'cover',backgroundPosition:'center',borderRadius:8,border: i===index ? '2px solid #00ff88' : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer'}} />
        ))}
      </div>

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

        <div style={{marginTop:18,display:'grid',gap:12}} className="property-actions">
          <div className="action-btn novo" onClick={() => setActiveTab('confirmar')}>
            <i className="fas fa-key"></i> Alugar
          </div>

          <div className="action-btn novo" onClick={() => onStartChat(seller?.id)}>
            <i className="fas fa-comments"></i> Conversar com Vendedor
          </div> 
          
          <div className="action-btn novo" onClick={abrirComentarios}>
              <i className="fas fa-comments"></i> Ver Comentários
          </div>
          
          <div 
            className="action-btn avaliar" 
            onClick={() => navigate('/assessment')}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-star"></i> Avaliar
          </div>
        </div>
      </div>

      {fullscreen && (
        <div className="modal-overlay" onClick={() => setFullscreen(false)}>
          <div className="modal-content" style={{maxWidth:'95%',padding:6,background:'transparent',boxShadow:'none',border:'none'}}>
            <img src={(property.images && property.images[index]) || property.image} alt="imagem" style={{width:'100%',height:'auto',borderRadius:12}} />
          </div>
        </div>
      )}
    </div>
  )
}