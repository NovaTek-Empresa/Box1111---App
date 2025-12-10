import React from 'react'

// Lista completa de imóveis, com filtro de preço e busca
export default function AllPropertiesView({ properties, onViewDetails, searchQuery, setSearchQuery, priceOrder, setPriceOrder }) {
  // Filtros avançados
  // Filtro apenas por preço
  const filtered = properties;

  // Ordena por preço
  const sorted = [...filtered].sort((a, b) => {
    const getPrice = v => parseFloat((v.price || '').replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(',', '.'));
    if (priceOrder === 'asc') return getPrice(a) - getPrice(b);
    if (priceOrder === 'desc') return getPrice(b) - getPrice(a);
    return 0;
  });

  return (
    <div>
      <style>{`
        .all-properties-header { display: flex; flex-direction: column; gap: 18px; margin-bottom: 24px; }
        .all-properties-filter {
          display: flex;
          gap: 18px;
          align-items: center;
          background: #f8f8f8;
          border-radius: 14px;
          padding: 18px 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .all-properties-list { display: flex; flex-direction: column; gap: 24px; }
        .filter-label { font-size: 0.95rem; color: #222; font-weight: 600; }
        .filter-input { padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 1rem; }
        .filter-btns { display: flex; gap: 10px; }
      `}</style>
      <div className="all-properties-header">
        <h2 style={{margin:0}}>Todos os Imóveis Disponíveis</h2>
        <div className="all-properties-filter">
          <span className="filter-label">Ordenar por preço:</span>
          <button
            className={priceOrder==='asc' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => setPriceOrder('asc')}
            style={{borderRadius:8,padding:'6px 16px'}}
          >Mais barato</button>
          <button
            className={priceOrder==='desc' ? 'btn btn-primary' : 'btn btn-secondary'}
            onClick={() => setPriceOrder('desc')}
            style={{borderRadius:8,padding:'6px 16px'}}
          >Mais caro</button>
        </div>
      </div>
      <div className="all-properties-list">
        {sorted.length === 0 ? (
          <div style={{textAlign:'center',padding:40,color:'#aaa'}}>Nenhum imóvel encontrado</div>
        ) : sorted.map(p => (
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
