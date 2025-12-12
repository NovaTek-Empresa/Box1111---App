import React from 'react'

export default function AllPropertiesView({ properties, onViewDetails, favorites, onToggleFavorite }) {

  const list = properties;

  return (
    <div>
      <style>{`
        .all-properties-header { display: flex; flex-direction: column; gap: 18px; margin-bottom: 24px; }
        .all-properties-list { display: flex; flex-direction: column; gap: 24px; }
      `}</style>

      <div className="all-properties-header">
        <h2 style={{margin:0}}>Todos os Imóveis Disponíveis</h2>
      </div>

      <div className="all-properties-list">
        {list.length === 0 ? (
          <div style={{textAlign:'center',padding:40,color:'#aaa'}}>Nenhum imóvel encontrado</div>
        ) : list.map(p => (
          <div key={p.id} className="property-card" style={{marginBottom:20}}>

            <div
              className="property-image"
              style={{
                backgroundImage:`url(${(p.images && p.images[0]) || p.image})`,
                height: 300,
                cursor: 'pointer'
              }}
              onClick={() => onViewDetails(p)}
            >
              <div className="property-badge">{p.type}</div>
              <div className="property-price">{p.price}</div>
              <div className="property-favorite" onClick={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }}>
                <i className="fas fa-heart" style={{color: (favorites || []).includes(p.id) ? '#ff3366' : '#fff'}}></i>
              </div>
            </div>

            <div className="property-info">
              <h3 className="property-title" style={{cursor:'pointer'}} onClick={() => onViewDetails(p)}>
                {p.title}
              </h3>

              <p className="property-address">{p.address}</p>
              <p style={{color:'#000000ff'}}>{p.description.substring(0,220)}...</p>

              <div className="property-tags" style={{marginTop:8}}>
                {(p.tags || []).slice(0,4).map((t,i) => (
                  <div key={i} className="property-tag">{t}</div>
                ))}
              </div>

              <div style={{display:'flex',gap:8,overflowX:'auto',marginTop:8}}>
                {(p.images && p.images.length > 0 ? p.images.slice(0,4) : [p.image]).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    loading="lazy"
                    onClick={() => onViewDetails(p, i)}
                    style={{
                      width:80,
                      height:60,
                      objectFit:'cover',
                      borderRadius:8,
                      border:'1px solid rgba(255,255,255,0.06)',
                      cursor:'pointer'
                    }}
                  />
                ))}
              </div>

              <div className="property-actions">
                <div className="action-btn secondary" onClick={() => onToggleFavorite(p.id)}>
                  {(favorites || []).includes(p.id) ? 'Remover' : 'Favoritar'}
                </div>
                <div className="action-btn primary" onClick={() => onViewDetails(p)}>Ver Detalhes</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
