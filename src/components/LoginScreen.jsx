import React, { useState } from 'react'; // Adicionado useState que faltava no seu import
import Logo from './Logo.png';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function LoginScreen({ authForm, setAuthForm, isRegistering, setIsRegistering, onLogin, onRegister }) {
  
  // Lógica para o botão de fechar/voltar
  const handleClose = () => {
    if (isRegistering) {
      setIsRegistering(false); // Se estiver no cadastro, volta para o login
    } else {
      window.location.href = '/'; // Se estiver no login, volta para a home
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Header com Botão de Fechar */}
        <div></div>
        <div className="auth-header">
          <button className="close-auth" onClick={handleClose}>
            <i className={isRegistering ? "fas fa-arrow-left" : "fas fa-times"}></i>
          </button>

          <div className="logo-container">
            <div className="logo-box">
              <img src={Logo} alt="Logo" className="logo-img" />
            </div>
          </div>
          <div className="header-curve"></div>
        </div>

        {/* Content */}
        <div className="auth-content">
          <h1 className="auth-title">{isRegistering ? 'Sign Up' : 'Login'}</h1>

          {/* Botões sociais */}
          <div className="social-container">
            <button 
              type="button"
              className="btn-social"
              onClick={() => { 
                setAuthForm(prev => ({...prev, email: 'cliente@box1111.com'})); 
                onLogin(); 
              }}
            >
              <FontAwesomeIcon icon={faGoogle} className="icon" />
              Google
            </button>

            <button 
              type="button"
              className="btn-social"
              onClick={() => { 
                setAuthForm(prev => ({...prev, email: 'vendedor@box1111.com'})); 
                onLogin(); 
              }}
            >
              <FontAwesomeIcon icon={faFacebookF} className="icon" />
              Facebook
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={isRegistering ? onRegister : onLogin} className="login-form">
            {isRegistering && (
              <div className="form-group">
                <label className="form-label">Nome completo</label>
                <input 
                  className="form-control" 
                  name="name" 
                  placeholder="Seu nome completo"
                  value={authForm.name} 
                  onChange={e => setAuthForm({...authForm, name: e.target.value})} 
                  required 
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input 
                type="email" 
                className="form-control" 
                name="email" 
                placeholder="exemplo@box1111.com"
                value={authForm.email} 
                onChange={e => setAuthForm({...authForm, email: e.target.value})} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                name="password" 
                placeholder="••••••••"
                value={authForm.password} 
                onChange={e => setAuthForm({...authForm, password: e.target.value})} 
                required 
              />
            </div>

            {isRegistering && (
              <>
                <div className="form-group">
                  <label className="form-label">Confirmar senha</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    name="confirmPassword" 
                    placeholder="••••••••"
                    value={authForm.confirmPassword} 
                    onChange={e => setAuthForm({...authForm, confirmPassword: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Tipo de conta</label>
                  <select 
                    className="form-select" 
                    name="role" 
                    value={authForm.role} 
                    onChange={e => setAuthForm({...authForm, role: e.target.value})}
                  >
                    <option value="usuario">Usuário</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary">
              {isRegistering ? 'Criar Conta' : 'Acessar Plataforma'}
            </button>
          </form>

          <div className="auth-footer">
            <div className="footer-main">
              <a 
                className="registro" 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsRegistering(!isRegistering); }}
              >
                {isRegistering ? 'Já tem conta? Acesse' : 'Ainda não tem conta? Cadastre-se'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}