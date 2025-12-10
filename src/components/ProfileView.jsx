import React from 'react'

// ProfileView: exibe dados do usuário e ações como logout

export default function ProfileView({ user, onLogout, onUpdateUser }){
  // Estado local para edição de perfil completo
  const [name, setName] = React.useState(user?.name || '')
  const [email, setEmail] = React.useState(user?.email || '')
  const [cpf, setCpf] = React.useState(user?.cpf || '')
  const [address, setAddress] = React.useState(user?.address || '')
  const [avatar, setAvatar] = React.useState(user?.avatarImg || '')

  // Converte arquivo para base64 e guarda no state correspondente
  function handleFileToBase64(file, setter){
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setter(reader.result)
    reader.readAsDataURL(file)
  }

  // Salva alterações do perfil
  function handleSaveProfile(e){
    e?.preventDefault()
    const updated = { ...user, name, email, cpf, address, avatarImg: avatar }
    if (onUpdateUser) onUpdateUser(updated)
    alert('Perfil atualizado com sucesso!')
  }

  // Render do perfil editável para todos os usuários
  return (
    <div style={{paddingBottom:120}}>
      <div style={{textAlign:'center',marginBottom:20}}>
        <div className="user-avatar" style={{width:100,height:100,fontSize:'2.5rem',margin:'0 auto',position:'relative'}}>
          {avatar ? (
            <img src={avatar} alt="avatar" style={{width:100,height:100,borderRadius:'50%',objectFit:'cover',boxShadow:'0 2px 8px rgba(0,0,0,0.10)'}} />
          ) : (
            <span>{user.avatar}</span>
          )}
          <label htmlFor="avatar-upload" style={{position:'absolute',bottom:0,right:0,background:'#fff',borderRadius:'50%',padding:6,cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.10)'}}>
            <i className="fas fa-camera" style={{color:'#222'}}></i>
            <input id="avatar-upload" type="file" accept="image/*" style={{display:'none'}} onChange={e => handleFileToBase64(e.target.files[0], setAvatar)} />
          </label>
        </div>
        <form onSubmit={handleSaveProfile} style={{marginTop:18,display:'flex',flexDirection:'column',alignItems:'center',gap:14}}>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" style={{maxWidth:320,padding:'10px 16px',borderRadius:8,fontSize:'1.1rem',fontWeight:600}} />
          <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" style={{maxWidth:320,padding:'10px 16px',borderRadius:8}} />
          <input className="form-control" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" style={{maxWidth:320,padding:'10px 16px',borderRadius:8}} />
          <input className="form-control" value={address} onChange={e => setAddress(e.target.value)} placeholder="Endereço completo" style={{maxWidth:320,padding:'10px 16px',borderRadius:8}} />
          <button className="btn btn-primary" type="submit" style={{width:180,marginTop:8}}>Salvar alterações</button>
        </form>
        <div style={{fontSize:'.9rem',color:'#00ff88',fontWeight:700,marginTop:18}}>{user.role}</div>
        <p style={{color:'#aaa'}}>{email}</p>
      </div>
      <div style={{padding:20,background:'rgba(26,26,26,0.8)',borderRadius:12,marginBottom:12}}>
        <h3>Configurações</h3>
        <p style={{color:'#aaa'}}>Notificações, Privacidade e Preferências</p>
      </div>
      <button className="btn btn-secondary" style={{width:'100%',marginTop:20}} onClick={onLogout}>Sair</button>
    </div>
  )
}
