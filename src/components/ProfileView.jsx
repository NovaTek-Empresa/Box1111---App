import React from 'react'

// ProfileView: exibe dados do usuário e ações como logout

export default function ProfileView({ user, onLogout, onUpdateUser }){
  // Estado local para edição de documentos (usado por vendedores para envio)
  const [cpf, setCpf] = React.useState(user?.cpf || '')
  const [address, setAddress] = React.useState(user?.address || '')
  const [rgImage, setRgImage] = React.useState(user?.rgImage || '')
  const [faceImage, setFaceImage] = React.useState(user?.faceImage || '')

  // Converte arquivo para base64 e guarda no state correspondente
  function handleFileToBase64(file, setter){
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setter(reader.result)
    reader.readAsDataURL(file)
  }

  // Envia os documentos para revisão do admin (marca docSubmitted=true)
  function handleSubmitDocs(e){
    e?.preventDefault()
    const updated = { id: user.id, cpf, address, rgImage, faceImage, docSubmitted: true }
    // Chama callback do App para persistir
    if (onUpdateUser) onUpdateUser(updated)
    alert('Documentos enviados para revisão do administrador.')
  }

  // Render do perfil com seção de documentos para vendedores
  return (
    <div style={{paddingBottom:120}}>
      <div style={{textAlign:'center',marginBottom:20}}>
        <div className="user-avatar" style={{width:100,height:100,fontSize:'2.5rem'}}>{user.avatar}</div>
        <h2 style={{marginTop:10}}>{user.name}</h2>
        <div style={{fontSize:'.9rem',color:'#00ff88',fontWeight:700}}>{user.role} {user.role === 'vendedor' && user.approved ? '(Aprovado)' : ''}</div>
        <p style={{color:'#aaa'}}>{user.email}</p>
      </div>

      <div style={{padding:20,background:'rgba(26,26,26,0.8)',borderRadius:12,marginBottom:12}}>
        <h3>Configurações</h3>
        <p style={{color:'#aaa'}}>Notificações, Privacidade e Preferências</p>
      </div>

      {/* Se for vendedor, mostrar formulário de envio de documentos */}
      {user.role === 'vendedor' && (
        <div style={{padding:16,background:'rgba(26,26,26,0.6)',borderRadius:10}}>
          <h3>Verificação de Vendedor</h3>
          <p style={{color:'#bbb',marginTop:0}}>Envie seus documentos para que o administrador possa aprovar sua conta.</p>

          <form onSubmit={handleSubmitDocs} style={{display:'flex',flexDirection:'column',gap:10}}>
            <div style={{display:'flex',gap:8,flexDirection:'column'}}>
              <label style={{fontSize:12,color:'#ddd'}}>CPF</label>
              <input className="form-control" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" />
            </div>

            <div style={{display:'flex',gap:8,flexDirection:'column'}}>
              <label style={{fontSize:12,color:'#ddd'}}>Endereço</label>
              <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} placeholder="Rua, número, bairro, cidade" />
            </div>

            <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
              <div style={{flex:1}}>
                <label style={{fontSize:12,color:'#ddd'}}>Foto do RG (frente)</label>
                <input type="file" accept="image/*" onChange={e => handleFileToBase64(e.target.files[0], setRgImage)} />
                {rgImage && <img src={rgImage} alt="rg" style={{width:120,height:80,objectFit:'cover',marginTop:8,borderRadius:6}} />}
              </div>
              <div style={{flex:1}}>
                <label style={{fontSize:12,color:'#ddd'}}>Foto do rosto (selfie)</label>
                <input type="file" accept="image/*" onChange={e => handleFileToBase64(e.target.files[0], setFaceImage)} />
                {faceImage && <img src={faceImage} alt="face" style={{width:120,height:120,objectFit:'cover',marginTop:8,borderRadius:'50%'}} />}
              </div>
            </div>

            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="btn btn-primary" type="submit">Enviar para aprovação</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setCpf(user.cpf||''); setAddress(user.address||''); setRgImage(user.rgImage||''); setFaceImage(user.faceImage||'') }}>Recarregar</button>
            </div>

            {user.docSubmitted && !user.approved && (
              <div style={{color:'#ffd966',marginTop:8}}>Documentos enviados. Aguardando avaliação do administrador.</div>
            )}
            {user.approved && (
              <div style={{color:'#8ef08e',marginTop:8}}>Sua conta de vendedor foi aprovada.</div>
            )}
          </form>
        </div>
      )}

      <button className="btn btn-secondary" style={{width:'100%',marginTop:20}} onClick={onLogout}>Sair</button>
    </div>
  )
}
