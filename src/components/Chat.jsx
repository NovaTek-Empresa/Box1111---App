import React from 'react'

// Chat: componente de conversa com contato, envia/recebe mensagens
// Comentários em PT-BR por função e blocos principais

export default function Chat({ contact, messages, onSendMessage, onBack, currentUserId }){
  // Estado local para o texto digitado
  const [text, setText] = React.useState('')
  // Ref para rolar a lista de mensagens ao final
  const endRef = React.useRef(null)

  // Efeito: sempre rola para o fim quando mensagens mudam
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Função: enviar mensagem (chama handler do pai)
  const send = (e) => {
    e?.preventDefault()
    const t = text.trim()
    if (!t) return
    onSendMessage(contact.id, t)
    setText('')
  }

  return (
    <div className="chat-container fade-in">
      <div className="chat-header">
        <button className="close-modal" onClick={onBack}><i className="fas fa-arrow-left"></i></button>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="chat-contact-avatar">{contact.avatar}</div>
          <div className="chat-contact-info">
            <h3>{contact.name}</h3>
            <p id='chat-vendor'>Vendedor</p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className={`message ${m.senderId === currentUserId ? 'sent' : 'received'}`}>
            <div>{m.text}</div>
            <div className="message-time">{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="chat-input-area" onSubmit={send}>
        <input className="chat-input" value={text} onChange={e => setText(e.target.value)} placeholder="Escreva uma mensagem..." />
        <button className="chat-send-btn" type="submit"><i className="fas fa-paper-plane"></i></button>
      </form>
    </div>
  )
}
