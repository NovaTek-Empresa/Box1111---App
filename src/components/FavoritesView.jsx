import React from 'react'

// Lista de imóveis favoritos do usuário
export default function FavoritesView({ properties, favorites, onViewDetails }) {
  const favoriteProps = properties.filter(p => favorites.includes(p.id));

  return (
    <div>
      <style>{`
        .favorites-header { margin-bottom: 18px; }
        .favorites-list { display: flex; flex-direction: column; gap: 24px; }
      `}</style>
      <div className="favorites-header">
        <h2 style={{margin:0}}>Meus Favoritos</h2>
        <div style={{color:'#000000ff',fontWeight:700,fontSize:13}}>{favoriteProps.length} imóveis favoritados</div>
      </div>
      <div className="favorites-list">
        {favoriteProps.length === 0 ? (
          <div style={{textAlign:'center',padding:40,color:'#aaa'}}>Nenhum imóvel favoritado</div>
        ) : favoriteProps.map(p => (
          <div key={p.id} className="property-card" style={{marginBottom:0}}>
            <div className="property-image" style={{backgroundImage:`url(${(p.images && p.images[0]) || p.image})`, height: 220, cursor: 'pointer'}} onClick={() => onViewDetails(p)}>
              <div className="property-badge">{p.type}</div>
              <div className="property-price">{p.price}</div>
            </div>
            <div className="property-info">
              <h3 className="property-title" style={{cursor:'pointer'}} onClick={() => onViewDetails(p)}>{p.title}</h3>
              <p className="property-address">{p.address}</p>
              <p style={{color:'#ccc'}}>{p.description.substring(0,220)}...</p>
              <div className="property-tags" style={{marginTop:8}}>
                {(p.tags || []).slice(0,4).map((t,i) => (
                  <div key={i} className="property-tag">{t}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
