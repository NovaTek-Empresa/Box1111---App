import React from 'react'

// ChatsListView: mostra a lista de conversas/contatos
// Comentários em PT-BR explicam cada bloco

export default function ChatsListView({ chats, users, onStartChat }){
  // Renderiza cada item de chat com nome, último texto e badge de não lidos
  return (
    <div className="fade-in">
      <h3 style={{marginBottom:12, color: '#000'}}>Conversas</h3>
      {chats.length === 0 ? (
        <div style={{color:'#aaa',padding:20}}>Nenhuma conversa iniciada</div>
      ) : (
        chats.map(c => {
          const user = users.find(u => u.id === c.userId)
          return (
            <div key={c.id} className={`chat-item ${c.unread>0?'unread':''}`} onClick={() => onStartChat(c.userId)} style={{cursor:'pointer'}}>
              <div className="chat-contact-avatar">{user?.avatar}</div>
              <div className="chat-item-info">
                <div className="chat-item-name">{user?.name || 'Contato'}</div>
                <div className="chat-item-last-message">{c.lastMessage}</div>
              </div>
              <div className="chat-item-time">{c.time}</div>
              {c.unread > 0 && <div className="chat-item-unread">{c.unread}</div>}
            </div>
          )
        })
      )}
    </div>
  )
}
