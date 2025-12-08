import React from 'react'

// HomeView: lista de imóveis e cartões com filtros modernos
// Inclui estilos responsivos locais para funcionar bem em mobile/app
export default function HomeView({ properties, onViewDetails, favorites, onToggleFavorite, searchQuery = '', setSearchQuery = () => {}, activeFilter = 'all', setActiveFilter = () => {}, showAdvanced = false, setShowAdvanced = () => {}, priceMin = '', setPriceMin = () => {}, priceMax = '', setPriceMax = () => {}, bedroomsFilter = '', setBedroomsFilter = () => {} }){
  return (
    <div>
      {/* Estilos locais e responsivos específicos para o HomeView */}
      <style>{`
        /* Ajustes responsivos para a busca e filtros */
        .home-search { display:flex; gap:8px; align-items:center; }
        .home-search .search-input { width:220px; max-width:60vw; }
        .home-filters { display:flex; gap:12px; align-items:center; }
        .home-advanced { padding:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
        @media (max-width: 520px) {
          .home-search { width:100%; }
          .home-search .search-input { width:100%; max-width:100%; }
          .home-filters { flex-direction:column; align-items:flex-start; gap:10px; }
          .home-advanced { flex-direction:column; align-items:stretch; }
          .property-card { margin-left:10px; margin-right:10px; }
          .property-image { height:220px !important; }
        }
      `}</style>
      {/* Cabeçalho com título e busca compacta */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div>
          <h2 style={{margin:0}}>Imóveis Premium</h2>
          <div style={{color:'#00ff88',fontWeight:700,fontSize:13}}>{properties.length} disponíveis</div>
        </div>
      </div>

      {/* Filtros rápidos + botão para filtros avançados */}
      <div className="filters-section" style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',gap:10}}>
          {['all','Apartamento','Casa','Venda','Aluguel'].map(f => (
            <div key={f} className={`filter-tag ${activeFilter===f?'active':''}`} onClick={() => setActiveFilter(f)} style={{cursor:'pointer'}}>
              {f === 'all' ? 'Todos' : f}
            </div>
          ))}
        </div>

        <div>
          <button className="btn btn-secondary" onClick={() => setShowAdvanced(!showAdvanced)}>{showAdvanced ? 'Ocultar filtros' : 'Filtros avançados'}</button>
        </div>
      </div>

      {showAdvanced && (
        <div style={{padding:12,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap',marginBottom:12}}>
          <div style={{display:'flex',flexDirection:'column',minWidth:140}}>
            <label style={{color:'#ddd',fontSize:12}}>Preço mínimo</label>
            <input className="form-control" value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="Ex.: 1000000" />
          </div>
          <div style={{display:'flex',flexDirection:'column',minWidth:140}}>
            <label style={{color:'#ddd',fontSize:12}}>Preço máximo</label>
            <input className="form-control" value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="Ex.: 4000000" />
          </div>
          <div style={{display:'flex',flexDirection:'column',minWidth:120}}>
            <label style={{color:'#ddd',fontSize:12}}>Mínimo de quartos</label>
            <select className="form-control" value={bedroomsFilter} onChange={e => setBedroomsFilter(e.target.value)}>
              <option value="">Qualquer</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div style={{marginLeft:'auto'}}>
            <button className="btn btn-primary" onClick={() => { /* filtros já são reativos */ }}>Aplicar</button>
          </div>
        </div>
      )}

      {/* Listagem de imóveis */}
      {properties.length === 0 ? (
        <div style={{textAlign:'center',padding:40,color:'#aaa'}}>Nenhum imóvel encontrado</div>
      ) : properties.map((p,idx) => (
        <div key={p.id} className="property-card" style={{marginBottom:20}}>
          {/* Imagem maior e clicável para abrir detalhes */}
          <div className="property-image" style={{backgroundImage:`url(${(p.images && p.images[0]) || p.image})`, height: 300, cursor: 'pointer'}} onClick={() => onViewDetails(p)}>
            <div className="property-badge">{p.type}</div>
            <div className="property-price">{p.price}</div>
            <div className="property-favorite" onClick={() => onToggleFavorite(p.id)}>
              <i className="fas fa-heart" style={{color: favorites.includes(p.id)?'#ff3366':'#fff'}}></i>
            </div>
          </div>
          <div className="property-info">
            {/* Título clicável também abre detalhes */}
            <h3 className="property-title" style={{cursor:'pointer'}} onClick={() => onViewDetails(p)}>{p.title}</h3>
            <p className="property-address">{p.address}</p>
            <p style={{color:'#ccc'}}>{p.description.substring(0,220)}...</p>
            {/* Tags do imóvel para ajudar na busca visual */}
            <div className="property-tags" style={{marginTop:8}}>
              {(p.tags || []).slice(0,4).map((t,i) => (
                <div key={i} className="property-tag">{t}</div>
              ))}
            </div>

            {/* Miniaturas (até 4) — clicáveis para abrir o detalhe já na imagem correspondente */}
            <div style={{display:'flex',gap:8,overflowX:'auto',marginTop:8}}>
              {(p.images && p.images.length > 0 ? p.images.slice(0,4) : [p.image]).map((img, i) => (
                <img key={i} src={img} alt="thumb" loading="lazy" onClick={() => onViewDetails(p, i)} style={{width:80,height:60,objectFit:'cover',borderRadius:8,border:'1px solid rgba(255,255,255,0.06)', cursor:'pointer'}} />
              ))}
            </div>
            <div className="property-actions">
              <div className="action-btn secondary" onClick={() => onToggleFavorite(p.id)}>{favorites.includes(p.id)?'Remover':'Favoritar'}</div>
              <div className="action-btn primary" onClick={() => onViewDetails(p)}>Ver Detalhes</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
