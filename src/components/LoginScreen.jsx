import React from 'react'

// LoginScreen: componente de autenticação (login / registro)
// Comentários em PT-BR explicam cada bloco para facilitar manutenção

export default function LoginScreen({ authForm, setAuthForm, isRegistering, setIsRegistering, onLogin, onRegister }){
  // Exibe título e subtítulo
  return (
    <div className="login-screen fade-in" style={{minHeight:'100vh',padding:30}}>
      <div style={{textAlign:'center',marginBottom:25}}>
        {/* Logo simplificada */}
        <div style={{display:'inline-flex',alignItems:'center',gap:12}}>
          <div style={{width:50,height:50,background:'linear-gradient(135deg,#000,#6900cc)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#ffffffff',fontWeight:900}}>BOX</div>
          <h1>BOX1111</h1>
        </div>
        <p style={{color:'#aaa'}}>Conecte-se ao futuro dos negócios imobiliários</p>
      </div>

      {/* Botões de login social (simulados) */}
      <div style={{display:'flex',gap:10,marginBottom:12}}>
        <button className="btn btn-google" onClick={() => { setAuthForm(prev => ({...prev, email: 'cliente@box1111.com'})); onLogin() }}>Entrar com Google</button>
        <button className="btn btn-facebook" onClick={() => { setAuthForm(prev => ({...prev, email: 'vendedor@box1111.com'})); onLogin() }}>Entrar com Facebook</button>
      </div>

      {/* Formulário de login / registro */}
      <form onSubmit={isRegistering ? onRegister : onLogin} className="login-form" style={{marginTop:12}}>
        {isRegistering && (
          <div className="form-group">
            <label>Nome completo</label>
            <input className="form-control" name="name" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} required />
          </div>
        )}

        <div className="form-group">
          <label>E-mail</label>
          <input type="email" className="form-control" name="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} required />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input type="password" className="form-control" name="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} required />
        </div>

        {isRegistering && (
          <>
            <div className="form-group">
              <label>Confirmar senha</label>
              <input type="password" className="form-control" name="confirmPassword" value={authForm.confirmPassword} onChange={e => setAuthForm({...authForm, confirmPassword: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Tipo de conta</label>
              <select className="form-control" name="role" value={authForm.role} onChange={e => setAuthForm({...authForm, role: e.target.value})}>
                <option value="usuario">Usuário</option>
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary" style={{width:'100%'}}>{isRegistering ? 'Criar Conta' : 'Acessar Plataforma'}</button>
      </form>

      <div style={{textAlign:'center',marginTop:12}}>
        <a class='registro' href="#" onClick={(e)=>{e.preventDefault(); setIsRegistering(prev=>!prev)}}>{isRegistering ? 'Já tem conta? Acesse' : 'Ainda não tem conta? Cadastre-se'}</a>
      </div>

      <div style={{color:'#666',fontSize:'.85rem',marginTop:15}}>
        <strong>Dica:</strong> use admin@box1111.com para admin ou cliente@box1111.com para usuário
      </div>
    </div>
  )
}
