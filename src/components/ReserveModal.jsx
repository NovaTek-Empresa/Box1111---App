import React, { useState } from 'react';

// Modal de reserva inspirado no segundo print
export default function ReserveModal({ property, onClose }) {
    // --- Funções e estados do formulário de reserva ---
    // checkin, checkout: datas de entrada e saída
    // guests: número de hóspedes
    // pets: quantidade de pets
    // payment: forma de pagamento escolhida
    // name, surname, pix: dados do cliente
    // acceptRules, acceptTerms: confirmações obrigatórias
    // handleSubmit: envia a reserva (simulado)
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(1);
  const [pets, setPets] = useState(0);
  const [payment, setPayment] = useState('Pix');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [pix, setPix] = useState('');
  const [acceptRules, setAcceptRules] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Simulação de valor
  const valor = property?.price || 'R$ 0,00';

  function handleSubmit(e) {
    e.preventDefault();
    alert('Reserva confirmada!');
    onClose();
  }

  // --- Layout inspirado no print do cliente ---
  // À esquerda: formulário de reserva com dados, datas, pagamento
  // À direita: resumo da cobrança, valor, taxas e total
  // Fotos do imóvel e thumbs exibidas no topo do formulário
  // Botão de fechar no canto superior direito
  // Botão de confirmação verde ao final do formulário
  // Comentários explicativos em cada bloco principal
  return (
    <div className="reserve-modal-bg">
      <div className="reserve-modal" style={{maxWidth:900,background:'#fff',borderRadius:16,padding:0,boxShadow:'0 8px 32px rgba(0,0,0,0.12)'}}>
        {/* Botão de fechar */}
        <button className="close-btn" onClick={onClose} style={{position:'absolute',top:18,right:18,fontSize:28,background:'none',border:'none',cursor:'pointer'}}>×</button>
        {/* Título principal */}
        <h2 style={{textAlign:'center',margin:'32px 0 0 0',fontWeight:900}}>Informações e Pagamento</h2>
        <div style={{display:'flex',gap:32,alignItems:'flex-start',padding:32}}>
          {/* Formulário principal */}
          <div style={{flex:2}}>
            {/* Bloco do imóvel e fotos */}
            <div style={{background:'#f8fafc',borderRadius:12,padding:24,marginBottom:24}}>
              <div style={{fontWeight:700,fontSize:'1.1rem',marginBottom:8}}>Imóvel</div>
              <div style={{display:'flex',gap:16,alignItems:'center'}}>
                <img src={property?.image} alt="Imóvel" style={{width:120,height:80,borderRadius:8,objectFit:'cover'}} />
                <div>
                  <strong style={{fontSize:'1.1rem'}}>{property?.title}</strong><br/>
                  <span style={{color:'#555'}}>{property?.address}</span>
                </div>
              </div>
              <div style={{marginTop:12,display:'flex',gap:8}}>
                {/* Fotos extras do imóvel */}
                {(property?.images || []).slice(0,3).map((img,i)=>(<img key={i} src={img} alt={`Foto ${i+1}`} style={{width:48,height:32,borderRadius:6,objectFit:'cover',border:'1px solid #eee'}}/>))}
              </div>
            </div>
            {/* Formulário de reserva */}
            <form className="reserve-form" onSubmit={handleSubmit}>
              {/* 1. Datas */}
              <div className="form-group" style={{marginBottom:18}}>
                <label style={{fontWeight:700}}>1. Datas</label>
                <div style={{display:'flex',gap:16}}>
                  <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} required style={{flex:1}} placeholder="Data de entrada (check-in)" />
                  <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} required style={{flex:1}} placeholder="Data de saída (check-out)" />
                </div>
              </div>
              {/* 2. Quantidade de pessoas */}
              <div className="form-group" style={{marginBottom:18}}>
                <label style={{fontWeight:700}}>2. Quantidade de pessoas</label>
                <div style={{display:'flex',gap:16}}>
                  <input type="number" min={1} value={guests} onChange={e => setGuests(e.target.value)} required placeholder="Número de hóspedes" style={{flex:1}} />
                  <input type="number" min={0} value={pets} onChange={e => setPets(e.target.value)} placeholder="Pets (opcional)" style={{flex:1}} />
                </div>
                <div style={{marginTop:8}}>
                  <input type="number" min={0} placeholder="Bebês (opcional)" style={{width:120}} />
                </div>
              </div>
              {/* 3. Forma de pagamento */}
              <div className="form-group" style={{marginBottom:18}}>
                <label style={{fontWeight:700}}>3. Forma de pagamento</label>
                <select value={payment} onChange={e => setPayment(e.target.value)} style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #eee'}}>
                  <option value="Pix">PIX</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Boleto">Boleto</option>
                  <option value="Dinheiro">Dinheiro (no local)</option>
                </select>
              </div>
              {/* 4. Dados do cliente */}
              <div className="form-group" style={{marginBottom:18,display:'flex',gap:16}}>
                <div style={{flex:1}}>
                  <label>Nome</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Nome" style={{width:'100%'}} />
                </div>
                <div style={{flex:1}}>
                  <label>Sobrenome</label>
                  <input type="text" value={surname} onChange={e => setSurname(e.target.value)} required placeholder="Sobrenome" style={{width:'100%'}} />
                </div>
              </div>
              {/* 5. Chave Pix */}
              <div className="form-group" style={{marginBottom:18}}>
                <label>Chave PIX (CPF/CNPJ, e-mail ou telefone)</label>
                <input type="text" value={pix} onChange={e => setPix(e.target.value)} placeholder="Chave PIX" style={{width:'100%'}} />
              </div>
              {/* 6. Confirmação */}
              <div className="form-group" style={{marginBottom:18}}>
                <label><input type="checkbox" checked={acceptRules} onChange={e => setAcceptRules(e.target.checked)} /> Aceitar regras da casa</label>
              </div>
              <div className="form-group" style={{marginBottom:18}}>
                <label><input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} /> Aceitar termos e condições</label>
              </div>
              {/* Botão de confirmação */}
              <button type="submit" className="btn-confirm" style={{width:'100%',background:'#0a0',color:'#fff',fontWeight:700,padding:'14px 0',borderRadius:8,fontSize:'1.1rem',marginTop:8}}>Confirmar Reserva</button>
            </form>
          </div>
          {/* Resumo à direita */}
          <div style={{flex:1,background:'#f8fafc',borderRadius:12,padding:24,minWidth:220}}>
            <h4 style={{marginTop:0,fontWeight:900}}>4. Resumo da cobrança</h4>
            <div style={{marginBottom:12}}>
              <div style={{fontWeight:700}}>{property?.title}</div>
              <div style={{color:'#555',fontSize:13}}>{property?.address}</div>
            </div>
            <div style={{marginBottom:8}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span>Valor por estadia:</span>
                <span>{valor}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span>Taxas:</span>
                <span>R$ 0,00</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontWeight:700}}>
                <span>Total final:</span>
                <span>{valor}</span>
              </div>
            </div>
            <div style={{fontSize:13,color:'#888',marginTop:18}}>
              O valor será confirmado após o envio. Pagamento final será processado após confirmação.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
