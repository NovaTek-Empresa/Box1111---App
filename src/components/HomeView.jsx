import React from 'react'

// HomeView: lista de imóveis e cartões com filtros modernos
// Inclui estilos responsivos locais para funcionar bem em mobile/app
export default function HomeView({ properties, onViewDetails, favorites, onToggleFavorite, searchQuery = '', setSearchQuery = () => {}, activeFilter = 'all', setActiveFilter = () => {}, showAdvanced = false, setShowAdvanced = () => {}, priceMin = '', setPriceMin = () => {}, priceMax = '', setPriceMax = () => {}, bedroomsFilter = '', setBedroomsFilter = () => {} }){
  return (
    <div>
      {/* Estilo para grid de 2 colunas responsivo */}
      <style>{`
        .properties-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      `}</style>
      {/* Estilos locais e responsivos específicos para o HomeView */}
      <style>{`
        /* Ajustes responsivos para a busca e filtros */
        .home-search { display:flex; gap:8px; align-items:center; }
        .home-search .search-input { width:220px; max-width:60vw; }
        .home-filters { display:flex; gap:12px; align-items:center; }
        .home-advanced { padding:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }

        .property-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.10), 0 1.5px 4px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          border: 1px solid #f2f2f2;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .property-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12);
          transform: translateY(-2px) scale(1.01);
        }
        .property-image {
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
          height: 220px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 0 0 12px 0;
        }
        .property-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: #222;
          color: #fff;
          font-size: 0.95rem;
          padding: 5px 14px;
          border-radius: 12px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
        .property-price {
          background: rgba(255,255,255,0.95);
          color: #222;
          font-size: 1.15rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 12px;
          margin-left: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .property-favorite {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.85);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          cursor: pointer;
          transition: background 0.2s;
        }
        .property-favorite:hover {
          background: #ffe6ee;
        }
        .property-info {
          padding: 18px 18px 12px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .property-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #222;
        }
        .property-address {
          font-size: 0.95rem;
          color: #888;
          margin-bottom: 2px;
        }
        .property-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .property-tag {
          background: #f2f2f2;
          color: #444;
          font-size: 0.85rem;
          padding: 4px 12px;
          border-radius: 10px;
          font-weight: 500;
        }
        .property-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .action-btn {
          padding: 8px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          border: none;
          transition: background 0.2s, color 0.2s;
        }
        .action-btn.primary {
          background: linear-gradient(135deg, #000000, #22c55e);
          color: #fff;
        }
        .action-btn.primary:hover {
          background: linear-gradient(135deg, #000000, #22c55e);
        }
        .action-btn.secondary {
          background: #f2f2f2;
          color: #222;
        }
        .action-btn.secondary:hover {
          background: #e0e0e0;
        }
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 700px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .home-search { width:100%; }
          .home-search .search-input { width:100%; max-width:100%; }
          .home-filters { flex-direction:column; align-items:flex-start; gap:10px; }
          .home-advanced { flex-direction:column; align-items:stretch; }
          .property-card { margin-left:10px; margin-right:10px; }
          .property-image { height:180px !important; }
        }
      `}</style>
      {/* Cabeçalho com título e busca compacta */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div>
          <h2 style={{margin:0}}>Imóveis Premium</h2>
          <div style={{color:'#000000ff',fontWeight:700,fontSize:13}}>{properties.length} disponíveis</div>
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

      {/* Listagem de imóveis em lista vertical (1 por coluna) */}
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
            <p style={{color:'#000000ff'}}>{p.description.substring(0,220)}...</p>
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
