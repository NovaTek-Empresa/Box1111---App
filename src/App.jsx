import React from 'react'
import LoginScreen from './components/LoginScreen'
import HomeView from './components/HomeView'
import ProfileView from './components/ProfileView'
import PropertyDetail from './components/PropertyDetail'
import Chat from './components/Chat'
import AddPropertyModal from './components/AddPropertyModal'
import ChatsListView from './components/ChatsListView'
import SellerView from './components/SellerView'
import CompanyInfoView from './components/CompanyInfoView'

// App principal: converte a lógica do HTML original para React moderno
// Comentários e explicações em PT-BR em cada função/parte importante

export default function App() {
  // Estado: usuário logado e dados iniciais (simulados)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false) // controla interface de login
  const [currentUser, setCurrentUser] = React.useState(null) // dados do usuário atual
  const [activeTab, setActiveTab] = React.useState('home') // aba ativa do app
  const [properties, setProperties] = React.useState(() => {
    // Carregar propriedades do localStorage se existir
    const raw = localStorage.getItem('box1111_properties')
    return raw ? JSON.parse(raw) : initialProperties()
  }) // lista de imóveis
  const [favorites, setFavorites] = React.useState(() => {
    const raw = localStorage.getItem('box1111_favorites')
    return raw ? JSON.parse(raw) : [1,3]
  }) // favoritos iniciais
  // Estado: propriedade em visualização detalhada
  const [viewingProperty, setViewingProperty] = React.useState(null)
  // Índice da imagem selecionada ao abrir a visualização de detalhe
  const [viewingImageIndex, setViewingImageIndex] = React.useState(0)
  // Estado: chat ativo (objeto do usuário com quem conversa)
  const [activeChat, setActiveChat] = React.useState(null)
  // Estado: mensagens (lista global, persistida)
  const [messages, setMessages] = React.useState(() => {
    const raw = localStorage.getItem('box1111_messages')
    return raw ? JSON.parse(raw) : []
  })
  // Chats (metadados das conversas): lastMessage, time, unread, userId
  const [chats, setChats] = React.useState(() => {
    const raw = localStorage.getItem('box1111_chats')
    return raw ? JSON.parse(raw) : initialChats()
  })
  const [searchQuery, setSearchQuery] = React.useState('') // query de busca
  const [activeFilter, setActiveFilter] = React.useState('all') // filtro ativo
  // Filtros avançados
  const [priceMin, setPriceMin] = React.useState('')
  const [priceMax, setPriceMax] = React.useState('')
  const [bedroomsFilter, setBedroomsFilter] = React.useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false) // controle de modal
  const [newProperty, setNewProperty] = React.useState(emptyProperty()) // formulário novo imóvel
  const [isRegistering, setIsRegistering] = React.useState(false) // toggle registrar
  const [authForm, setAuthForm] = React.useState({ name:'', email:'', password:'', confirmPassword:'', role:'usuario' })

  // usuários simulados (dados locais) com persistência em localStorage
  const [users, setUsers] = React.useState(() => {
    const raw = localStorage.getItem('box1111_users')
    return raw ? JSON.parse(raw) : initialUsers()
  })

  // Função utilitária: atualiza um usuário na lista e persiste
  function updateUser(updated) {
    setUsers(prev => {
      const next = prev.map(u => u.id === updated.id ? { ...u, ...updated } : u)
      localStorage.setItem('box1111_users', JSON.stringify(next))
      return next
    })
    // Se o usuário atualizado for o currentUser, atualiza também
    if (currentUser && updated.id === currentUser.id) {
      const merged = { ...currentUser, ...updated }
      setCurrentUser(merged)
      localStorage.setItem('box1111_currentUser', JSON.stringify(merged))
    }
  }

  // Função: executar login (simulado)
  // Recebe e-mail/senha no authForm e verifica na lista `users`
  function handleLogin(e) {
    e?.preventDefault()
    const user = users.find(u => u.email === authForm.email)
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      setAuthForm({ name:'', email:'', password:'', confirmPassword:'', role:'usuario' })
    } else {
      alert('Usuário não encontrado. Tente com admin@box1111.com ou cliente@box1111.com')
    }
  }

  function initialChats(){
    return [
      { id: 1, userId: 2, lastMessage: 'Olá, gostaria de agendar uma visita...', time: '10:30', unread: 0 },
      { id: 2, userId: 3, lastMessage: 'O apartamento ainda está disponível?', time: 'Ontem', unread: 0 },
      { id: 3, userId: 1, lastMessage: 'Relatório mensal enviado', time: '22/10', unread: 0 }
    ]
  }

  // Função: registrar novo usuário (simulado)
  function handleRegister(e){
    e?.preventDefault()
    if(authForm.password !== authForm.confirmPassword){ alert('As senhas não coincidem!'); return }
    const newUser = { id: users.length + 1, name: authForm.name, email: authForm.email, role: authForm.role, avatar: (authForm.name||'U').substring(0,2).toUpperCase(), approved: authForm.role === 'vendedor' ? false : true, docSubmitted: false }
    setUsers(prev => [...prev, newUser])
    setCurrentUser(newUser)
    setIsLoggedIn(true)
    setAuthForm({ name:'', email:'', password:'', confirmPassword:'', role:'usuario' })
    alert('Cadastro realizado com sucesso!')
  }

  // Função: logout
  function handleLogout(){
    setIsLoggedIn(false); setCurrentUser(null); setActiveTab('home')
  }

  // Função: alterna favorito (adiciona/remove)
  function toggleFavorite(id){
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // Função: abrir visualização detalhada do imóvel
  function viewPropertyDetails(property, index = 0){
    // Abre a visualização detalhada (PropertyDetail) e posiciona na imagem desejada
    setViewingProperty(property)
    setViewingImageIndex(index || 0)
    // Muda a aba para 'detail' para garantir que a view apareça corretamente
    setActiveTab('detail')
  }

  // Função: iniciar chat com um usuário (seller ou contato)
  function startChat(userId){
    // encontra o usuário pelo id
    const user = users.find(u => u.id === userId)
    if (!user) return
    setActiveChat(user)
    setActiveTab('chat')
  }

  // Função: enviar mensagem (cria e persiste)
  function handleSendMessage(toUserId, text){
    // cria objeto de mensagem com timestamp simples
    const msg = {
      id: Date.now(),
      chatWith: toUserId,
      senderId: currentUser ? currentUser.id : 0,
      text,
      time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    }
    setMessages(prev => {
      const next = [...prev, msg]
      localStorage.setItem('box1111_messages', JSON.stringify(next))
      return next
    })

    // Atualiza metadados da conversa (lastMessage, time, unread)
    setChats(prev => {
      const found = prev.find(c => c.userId === toUserId)
      const time = msg.time
      if (found) {
        const updated = prev.map(c => c.userId === toUserId ? { ...c, lastMessage: text, time, unread: (c.unread || 0) + (currentUser && currentUser.id !== toUserId ? 1 : 0) } : c)
        localStorage.setItem('box1111_chats', JSON.stringify(updated))
        return updated
      } else {
        const nc = { id: Date.now(), userId: toUserId, lastMessage: text, time, unread: (currentUser && currentUser.id !== toUserId ? 1 : 0) }
        const next = [nc, ...prev]
        localStorage.setItem('box1111_chats', JSON.stringify(next))
        return next
      }
    })
  }

  // Função: marcar conversa como lida (zera unread)
  function markChatRead(userId){
    setChats(prev => {
      const next = prev.map(c => c.userId === userId ? { ...c, unread: 0 } : c)
      localStorage.setItem('box1111_chats', JSON.stringify(next))
      return next
    })
  }

  // Filtra propriedades com base em `searchQuery` e `activeFilter`
  const filteredProperties = properties.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false
    }
    if (activeFilter !== 'all' && p.type !== activeFilter && p.status !== activeFilter) return false

    // Filtro por número de quartos (se definido)
    if (bedroomsFilter) {
      const num = parseInt(bedroomsFilter)
      if (!isNaN(num) && (isNaN(p.bedrooms) ? true : p.bedrooms < num)) return false
    }

    // Filtro por faixa de preço (se definido)
    if (priceMin || priceMax) {
      // Tenta extrair apenas números do preço (ex.: "R$ 2.500.000" -> 2500000)
      const priceNum = parseFloat((p.price || '').replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(',', '.'))
      if (!isNaN(priceNum)) {
        if (priceMin) {
          const min = parseFloat(priceMin.replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(',', '.'))
          if (!isNaN(min) && priceNum < min) return false
        }
        if (priceMax) {
          const max = parseFloat(priceMax.replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(',', '.'))
          if (!isNaN(max) && priceNum > max) return false
        }
      }
    }
    return true
  })

  // Função: abrir modal de novo imóvel
  function openAddProperty(){ setNewProperty(emptyProperty()); setModalOpen(true) }
  function closeModal(){ setModalOpen(false); setNewProperty(emptyProperty()) }

  // Função: adicionar imóvel (simulado) — exige usuário vendedor/admin
  function handleAddProperty(e){
    e?.preventDefault()
    if (!currentUser) { alert('Faça login como vendedor ou admin para adicionar.'); return }
    if (currentUser.role !== 'vendedor' && currentUser.role !== 'admin') { alert('Apenas vendedores/administradores podem adicionar.'); return }
    const prop = { ...newProperty, id: properties.length + 1, sellerId: currentUser.id, image: newProperty.image || properties[0].image }
    setProperties(prev => [prop, ...prev])
    closeModal()
    alert('Propriedade adicionada com sucesso!')
  }

  // Sincronizar estados importantes com localStorage
  React.useEffect(() => {
    localStorage.setItem('box1111_users', JSON.stringify(users))
  }, [users])

  React.useEffect(() => {
    localStorage.setItem('box1111_properties', JSON.stringify(properties))
  }, [properties])

  React.useEffect(() => {
    localStorage.setItem('box1111_favorites', JSON.stringify(favorites))
  }, [favorites])

  React.useEffect(() => {
    localStorage.setItem('box1111_currentUser', JSON.stringify(currentUser))
  }, [currentUser])

  // Render: se não logado mostra tela de login/registro
  // Se não estiver logado, mostra componente de login/registro
  if (!isLoggedIn) {
    return (
      <div className="app-container">
        <LoginScreen
          authForm={authForm}
          setAuthForm={setAuthForm}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    )
  }

  // Render quando logado
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <div className="logo-box-small">1111</div>
          <h1>BOX1111</h1>
        </div>
        <div className="user-profile" onClick={() => setActiveTab('profile')}>
          <div className="user-avatar">{currentUser.avatar}</div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontWeight:700}}>{currentUser.name.split(' ')[0]}</div>
            <div style={{fontSize:'.8rem',color:'#00ff88'}}>{currentUser.role}</div>
          </div>
        </div>
      </header>

      {/* Barra de busca centralizada: sempre visível (atende mobile em qualquer tela) */}
      <div className="search-bar" style={{padding:'12px 18px'}}>
        <div style={{display:'flex',gap:10}}>
          <input className="search-input" placeholder="Buscar por local, tipo ou característica..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <button className="search-btn" onClick={() => {}}><i className="fas fa-search"></i></button>
        </div>
      </div>

      {/* Pequena seção de filtros rápida (mantida, mas a busca principal ficou global) */}
      <div className="filters-section" style={{padding:'0 18px'}}>
        <div style={{display:'flex',gap:10}}>
          {['all','Apartamento','Casa','Venda','Aluguel'].map(f => (
            <div key={f} className={`filter-tag ${activeFilter===f?'active':''}`} onClick={() => setActiveFilter(f)}>
              {f === 'all' ? 'Todos' : f}
            </div>
          ))}
        </div>
      </div>

      <main className="app-content">
        {activeTab === 'home' && (
          <HomeView
            properties={filteredProperties}
            onViewDetails={(p, i) => { viewPropertyDetails(p, i) }}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            showAdvanced={showAdvancedFilters}
            setShowAdvanced={setShowAdvancedFilters}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            bedroomsFilter={bedroomsFilter}
            setBedroomsFilter={setBedroomsFilter}
          />
        )}

        {/* Visualização detalhada do imóvel (galeria maior) */}
        {activeTab === 'detail' && viewingProperty && (
          <PropertyDetail
            property={viewingProperty}
            initialIndex={viewingImageIndex}
            onBack={() => { setViewingProperty(null); setViewingImageIndex(0); setActiveTab('home') }}
            isFavorite={favorites.includes(viewingProperty.id)}
            onToggleFavorite={toggleFavorite}
            onStartChat={startChat}
            users={users}
          />
        )}

        {activeTab === 'seller' && (
          <div className="fade-in">Área do vendedor (exibida para vendedores/admin)</div>
        )}

        {/* Chat: se a aba for 'chat' exibimos lista ou conversa ativa */}
        {activeTab === 'chat' && (
          <div>
            {activeChat ? (
              <Chat
                contact={activeChat}
                messages={messages.filter(m => m.chatWith === activeChat.id)}
                onSendMessage={handleSendMessage}
                onBack={() => { setActiveChat(null); setActiveTab('chat') }}
                currentUserId={currentUser?.id}
              />
            ) : (
              <ChatsListView chats={chats} users={users} onStartChat={(userId) => { startChat(userId); markChatRead(userId); }} />
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileView user={currentUser} onLogout={handleLogout} onUpdateUser={updateUser} />
        )}
      </main>

      <div className="bottom-menu">
        <div className={`menu-item ${activeTab==='home'?'active':''}`} onClick={() => setActiveTab('home')}>
          <i className="fas fa-home"></i>
          <span>Início</span>
        </div>
        {/* Menu 'Vendas' visível apenas para administradores e vendedores aprovados */}
        {(currentUser && (currentUser.role === 'admin' || (currentUser.role === 'vendedor' && currentUser.approved))) && (
          <div className={`menu-item ${activeTab==='seller'?'active':''}`} onClick={() => setActiveTab('seller')}>
            <i className="fas fa-chart-line"></i>
            <span>Vendas</span>
          </div>
        )}
        {/* Botão de adicionar imóvel visível apenas para admin e vendedores aprovados */}
        {(currentUser.role === 'admin' || (currentUser.role === 'vendedor' && currentUser.approved)) && (
          <div className="add-property-btn" onClick={openAddProperty}><i className="fas fa-plus"></i></div>
        )}
        <div className={`menu-item ${activeTab==='chat'?'active':''}`} onClick={() => setActiveTab('chat')}>
          <i className="fas fa-comments"></i>
          <span>Chat</span>
        </div>
        <div className={`menu-item ${activeTab==='company'?'active':''}`} onClick={() => setActiveTab('company')}>
          <i className="fas fa-info-circle"></i>
          <span>Sobre</span>
        </div>
      </div>

      {modalOpen && (
        <AddPropertyModal
          newProperty={newProperty}
          setNewProperty={setNewProperty}
          onSubmit={handleAddProperty}
          onClose={closeModal}
        />
      )}
      {/* Selecione as views adicionais por aba */}
      {activeTab === 'seller' && currentUser && (currentUser.role === 'vendedor' || currentUser.role === 'admin') && (
        <SellerView properties={properties} currentUser={currentUser} onViewDetails={viewPropertyDetails} chats={chats} onStartChat={startChat} users={users} onUpdateUser={updateUser} />
      )}

      {activeTab === 'company' && (
        <CompanyInfoView />
      )}
    </div>
  )
}

// --- Helpers e dados iniciais ---

function emptyProperty(){ return { title:'', address:'', price:'', status:'Venda', type:'Apartamento', description:'', bedrooms:'', bathrooms:'', area:'', tags:'', image:'' } }

function initialUsers(){
  return [
    { id: 1, name: "BOX Admin", email: "admin@box1111.com", role: "admin", avatar: "BA", approved: true, docSubmitted: false },
    { id: 2, name: "Vendedor BOX", email: "vendedor@box1111.com", role: "vendedor", avatar: "VB", phone: "(11) 99999-0000", approved: false, docSubmitted: false },
    { id: 3, name: "Cliente Comprador", email: "cliente@box1111.com", role: "usuario", avatar: "CC", phone: "(11) 98888-0000", approved: true, docSubmitted: false }
  ]
}

function initialProperties(){
  return [
    {
        id:1,
        title: "Apartamento Luxuoso com Vista para o Mar",
        address: "Av. Beira Mar, 1500 - Copacabana, Rio de Janeiro",
        price: "R$ 2.500.000",
        status: "Venda",
        type: "Apartamento",
        sellerId:2,
        description: "Apartamento luxuoso com vista panorâmica para o mar, acabamentos em mármore, cozinha gourmet equipada, 3 suítes...",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
            images: [
              "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90",
              "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90"
            ],
        bedrooms:3, bathrooms:4, area:'220m²', tags:['Vista para o mar','Luxo','Piscina','Varanda']
    },
    {
        id:2,
        title: "Casa Moderna em Condomínio Fechado",
        address: "Rua das Magnólias, 250 - Alphaville, São Paulo",
        price: "R$ 3.800.000",
        status: "Venda",
        type: "Casa",
        sellerId:2,
        description: "Casa moderna em condomínio fechado com segurança 24h, piscina aquecida...",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1560448099-2b0f06f9a7d7?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms:4, bathrooms:5, area:'450m²', tags:['Condomínio fechado','Piscina aquecida','Jardim','Churrasqueira']
    },
    {
        id:3,
        title: "Loft Industrial no Centro Histórico",
        address: "Rua do Rosário, 80 - Centro Histórico, Porto Alegre",
        price: "R$ 4.200/mês",
        status: "Aluguel",
        type: "Loft",
        sellerId:2,
        description: "Loft industrial com pé-direito alto, localizado em edifício histórico reformado...",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1475855581690-80a9b3fdae3a?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms:1, bathrooms:1, area:'95m²', tags:['Centro histórico','Industrial','Pé-direito alto']
    }
  ]
}
