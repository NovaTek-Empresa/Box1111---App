import React from 'react'

// Lista completa de imóveis, com filtro de preço e busca
export default function AllPropertiesView({ properties, onViewDetails, searchQuery, setSearchQuery, priceOrder, setPriceOrder }) {
  // Filtra por busca
  const filtered = properties.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
  });

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
        .all-properties-header { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; }
        .all-properties-search { display: flex; gap: 10px; align-items: center; }
        .all-properties-filter { display: flex; gap: 10px; align-items: center; }
        .all-properties-list { display: flex; flex-direction: column; gap: 24px; }
      `}</style>
      <div className="all-properties-header">
        <h2 style={{margin:0}}>Todos os Imóveis Disponíveis</h2>
        <div className="all-properties-search">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por título, endereço ou descrição..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{padding:'8px 14px',borderRadius:8,border:'1px solid #ddd',width:260}}
          />
        </div>
        <div className="all-properties-filter">
          <span>Ordenar por preço:</span>
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
