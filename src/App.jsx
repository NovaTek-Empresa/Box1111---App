import React, { useState, useEffect } from 'react'
import logoImg from '../logo/Logo.png'
import LoginScreen from './components/LoginScreen'
import HomeView from './components/HomeView'
import ProfileView from './components/ProfileView'
import PropertyDetail from './components/PropertyDetail'
import Chat from './components/Chat'
import AddPropertyModal from './components/AddPropertyModal'
import ChatsListView from './components/ChatsListView'
import SellerView from './components/SellerView'
import CompanyInfoView from './components/CompanyInfoView'
import AllPropertiesView from './components/AllPropertiesView'
import FavoritesView from './components/FavoritesView'
import Pagamento from './components/Pagamento'
import ConfirmacaoDeReserva from './components/ConfirmacaoDeReserva'
import ReactInputMask from 'react-input-mask'
import AssessmentScreen from "./components/AssessmentScreen";
import Comentario from "./components/Comentario";
import { Routes, Route, useNavigate, BrowserRouter, useLocation } from "react-router-dom";

// --- Helpers e dados iniciais (Movidos para fora para organização) ---

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
        image: "https://imgbr.imovelwebcdn.com/avisos/resize/2/29/75/29/22/73/1200x1200/4719373938.jpg?isFirstImage=true",
            images: [
              "https://imgbr.imovelwebcdn.com/avisos/resize/2/29/75/29/22/73/1200x1200/4719373938.jpg?isFirstImage=true",
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
       },
      {
        id: 4,
        title: "Studio Moderno no Centro",
        address: "Av. Independência, 120 - Centro, Belo Horizonte",
        price: "R$ 2.100/mês",
        status: "Aluguel",
        type: "Studio",
        sellerId: 2,
        description: "Studio moderno com decoração minimalista, próximo a universidades e comércio. Ideal para estudantes e jovens profissionais.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms: 1, bathrooms: 1, area: '38m²', tags: ['Minimalista','Centro','Próximo à universidade']
      },
      {
        id: 5,
        title: "Apartamento Compacto com Varanda",
        address: "Rua das Palmeiras, 45 - Botafogo, Rio de Janeiro",
        price: "R$ 2.800/mês",
        status: "Aluguel",
        type: "Apartamento",
        sellerId: 2,
        description: "Apartamento compacto, recém-reformado, com varanda e vista para o bairro. Ótima localização e acesso ao metrô.",
        image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms: 2, bathrooms: 1, area: '55m²', tags: ['Varanda','Reformado','Próximo ao metrô']
      },
      {
        id: 6,
        title: "Loft Colorido no Bairro Boêmio",
        address: "Rua Augusta, 300 - Consolação, São Paulo",
        price: "R$ 3.500/mês",
        status: "Aluguel",
        type: "Loft",
        sellerId: 2,
        description: "Loft colorido e descolado, com decoração artística e espaço aberto. Próximo a bares, restaurantes e vida noturna.",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms: 1, bathrooms: 1, area: '60m²', tags: ['Boêmio','Artístico','Vida noturna']
      },
      {
        id: 7,
        title: "Apartamento Industrial com Mezanino",
        address: "Rua XV de Novembro, 200 - Centro, Curitiba",
        price: "R$ 3.900/mês",
        status: "Aluguel",
        type: "Apartamento",
        sellerId: 2,
        description: "Apartamento estilo industrial, com mezanino, pé-direito duplo e grandes janelas. Próximo ao centro comercial e transporte público.",
        image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms: 2, bathrooms: 2, area: '110m²', tags: ['Industrial','Mezanino','Centro']
      },
      {
        id: 8,
        title: "Studio Compacto Próximo ao Parque",
        address: "Av. Ipiranga, 900 - Jardim Botânico, Porto Alegre",
        price: "R$ 1.800/mês",
        status: "Aluguel",
        type: "Studio",
        sellerId: 2,
        description: "Studio compacto, ideal para quem busca praticidade e proximidade com áreas verdes. Ambiente aconchegante e funcional.",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80",
        images: [
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1505691723518-36a6f3a0a6b8?auto=format&fit=crop&w=1600&q=90",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=90"
        ],
        bedrooms: 1, bathrooms: 1, area: '32m²', tags: ['Próximo ao parque','Compacto','Aconchegante']
      }
  ]
}

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- Estados do App ---
  const [allSearchQuery, setAllSearchQuery] = useState('')
  const [allPriceOrder, setAllPriceOrder] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [activeTab, setActiveTab] = useState('home')


  const isFullPageMode = location.pathname === '/assessment' || location.pathname === '/comentario';
  const isComentPage = location.pathname === '/comentario';

  const abrirComentarios = () => {
  setActiveTab('comentario');
  navigate('/'); 
};



useEffect(() => {
  if (isFullPageMode) {
    setActiveTab('assessment');
  } else if (isComentPage) {
    setActiveTab('comentario');
  } else if (activeTab === 'assessment' || activeTab === 'comentario') {

    setActiveTab('home');
  }
}, [isFullPageMode, isComentPage]);

  const [exibirReserva, setExibirReserva] = useState(true);
  const [tela, setTela] = useState('detail')
  
  const [properties, setProperties] = useState(() => {
    const raw = localStorage.getItem('box1111_properties')
    return raw ? JSON.parse(raw) : initialProperties()
  })

  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem('box1111_favorites')
    return raw ? JSON.parse(raw) : [1,3]
  })

  const [viewingProperty, setViewingProperty] = useState(null)
  const [viewingImageIndex, setViewingImageIndex] = useState(0)
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem('box1111_messages')
    return raw ? JSON.parse(raw) : []
  })

  const [chats, setChats] = useState(() => {
    const raw = localStorage.getItem('box1111_chats')
    return raw ? JSON.parse(raw) : initialChats()
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [bedroomsFilter, setBedroomsFilter] = useState('')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [newProperty, setNewProperty] = useState(emptyProperty())
  const [isRegistering, setIsRegistering] = useState(false)
  const [authForm, setAuthForm] = useState({ name:'', email:'', password:'', confirmPassword:'', role:'usuario' })

  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem('box1111_users')
    return raw ? JSON.parse(raw) : initialUsers()
  })

  // --- Funções de Lógica ---
  function initialChats(){
    return [
      { id: 1, userId: 2, lastMessage: 'Olá, gostaria de agendar uma visita...', time: '10:30', unread: 0 },
      { id: 2, userId: 3, lastMessage: 'O apartamento ainda está disponível?', time: 'Ontem', unread: 0 },
      { id: 3, userId: 1, lastMessage: 'Relatório mensal enviado', time: '22/10', unread: 0 }
    ]
  }

  const irParaAvaliacao = () => {
    setActiveTab('assessment');
    navigate('/AssessmentScreen');
  };

const irParaComentarios = () => {
  navigate('/Comentario');
  setActiveTab('comentario')
};


  function updateUser(updated) {
    setUsers(prev => {
      const next = prev.map(u => u.id === updated.id ? { ...u, ...updated } : u)
      localStorage.setItem('box1111_users', JSON.stringify(next))
      return next
    })
    if (currentUser && updated.id === currentUser.id) {
      const merged = { ...currentUser, ...updated }
      setCurrentUser(merged)
      localStorage.setItem('box1111_currentUser', JSON.stringify(merged))
    }
  }

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

  function handleLogout(){
    setIsLoggedIn(false); setCurrentUser(null); setActiveTab('home')
  }

  function toggleFavorite(id){
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function viewPropertyDetails(property, index = 0){
    setViewingProperty(property)
    setViewingImageIndex(index || 0)
    setActiveTab('detail')
  }

  

  function startChat(userId){
    const user = users.find(u => u.id === userId)
    if (!user) return
    setActiveChat(user)
    setActiveTab('chat')
  }

  function handleSendMessage(toUserId, text){
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

  function markChatRead(userId){
    setChats(prev => {
      const next = prev.map(c => c.userId === userId ? { ...c, unread: 0 } : c)
      localStorage.setItem('box1111_chats', JSON.stringify(next))
      return next
    })
  }

  const filteredProperties = properties.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false
    }
    if (activeFilter !== 'all' && p.type !== activeFilter && p.status !== activeFilter) return false
    if (bedroomsFilter) {
      const num = parseInt(bedroomsFilter)
      if (!isNaN(num) && (isNaN(p.bedrooms) ? true : p.bedrooms < num)) return false
    }
    if (priceMin || priceMax) {
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

  function openAddProperty(){ setNewProperty(emptyProperty()); setModalOpen(true) }
  function closeModal(){ setModalOpen(false); setNewProperty(emptyProperty()) }

  function handleAddProperty(e){
    e?.preventDefault()
    if (!currentUser) { alert('Faça login como vendedor ou admin para adicionar.'); return }
    if (currentUser.role !== 'vendedor' && currentUser.role !== 'admin') { alert('Apenas vendedores/administradores podem adicionar.'); return }
    const prop = { ...newProperty, id: properties.length + 1, sellerId: currentUser.id, image: newProperty.image || properties[0].image }
    setProperties(prev => [prop, ...prev])
    closeModal()
    alert('Propriedade adicionada com sucesso!')
  }

  useEffect(() => { localStorage.setItem('box1111_users', JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem('box1111_properties', JSON.stringify(properties)) }, [properties])
  useEffect(() => { localStorage.setItem('box1111_favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('box1111_currentUser', JSON.stringify(currentUser)) }, [currentUser])

  // Lógica de Renderização Condicional da Reserva (conforme solicitado)
  if (!exibirReserva) {
    return <HomeView properties={filteredProperties} />; // Exemplo de fallback
  }

  return (
    <div className="app-container">
      {!["company", "confirmar"].includes(activeTab) && (
      <header className="app-header">
        <div className="logo" style={{height:60, width:60, display:'flex', alignItems:'center', justifyContent:'center', marginRight:18}}>
          <img src={logoImg} alt="Logo BOX1111" className="logo-img" style={{height:50, width:50, objectFit:'contain', borderRadius:12, boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} />
        </div>

        {!(activeTab === 'profile' && !currentUser) && (
          <div className="user-profile" onClick={() => setActiveTab('profile')}>
            <div className="user-avatar">
              {currentUser && currentUser.avatarImg ? (
                <img src={currentUser.avatarImg} alt="avatar" style={{width:36,height:36,borderRadius:'50%',objectFit:'cover'}} />
              ) : currentUser ? currentUser.avatar : <i className="fas fa-user"></i>}
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
              <div style={{fontWeight:700, color:'#000'}}>{currentUser ? currentUser.name.split(' ')[0] : 'Visitante'}</div>
              <div style={{fontSize:'.8rem',color:'#000000ff'}}>{currentUser ? currentUser.role : 'Não logado'}</div>
            </div>
          </div>
        )}
      </header>
      )}

      {(activeTab === 'home' || activeTab === 'all') && (
        <div className="search-bar" style={{padding:'12px 18px', backgroundColor: '#fff'}}>
          <div style={{display:'flex',gap:10}}>
            <input className="search-input" placeholder="Buscar por local, tipo ou característica..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button className="search-btn" onClick={() => {}}><i className="fas fa-search"></i></button>
          </div>
        </div>
      )}
      
      {activeTab !== "company" && (
      <main className="app-content"> 
        <div>
          {isFullPageMode ? (
            <Routes>
              <Route path="/assessment" element={<AssessmentScreen />} />
              <Route path="/comentario" element={<Comentario />} />
            </Routes>
          

            
          ) : activeTab === 'profile' && !currentUser ? (
            <LoginScreen
              authForm={authForm}
              setAuthForm={setAuthForm}
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
              onLogin={handleLogin}
              onRegister={handleRegister}
            />
          ) : (
            <>
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

              {tela === 'confirmar' && (
                <ConfirmacaoDeReserva sair={() => setTela('detail')} />
              )}

              {activeTab === 'all' && (
                <AllPropertiesView
                  properties={properties}
                  onViewDetails={viewPropertyDetails}
                  searchQuery={allSearchQuery}
                  setSearchQuery={setAllSearchQuery}
                  priceOrder={allPriceOrder}
                  setPriceOrder={setAllPriceOrder}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}

              {activeTab === 'favorites' && (
                <FavoritesView
                  properties={properties}
                  favorites={favorites}
                  onViewDetails={viewPropertyDetails}
                  onToggleFavorite={toggleFavorite}
                />
              )}
              
              {/* Lógica de Detalhes do Imóvel */}
              {activeTab === 'detail' && viewingProperty && (
                !isLoggedIn ? (
                  <LoginScreen
                    authForm={authForm}
                    setAuthForm={setAuthForm}
                    isRegistering={isRegistering}
                    setIsRegistering={setIsRegistering}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                  />
                ) : (
                  <PropertyDetail
                    property={viewingProperty}
                    initialIndex={viewingImageIndex}
                    onBack={() => { setViewingProperty(null); setViewingImageIndex(0); setActiveTab('home') }}
                    isFavorite={favorites.includes(viewingProperty.id)}
                    onToggleFavorite={toggleFavorite}
                    onStartChat={startChat}
                    abrirComentarios={() => setActiveTab('comentario')} // Mudando o estado aqui
                    users={users}
                  />
                )
              )}

              {/* Rota para a tela de Comentários */}
              {activeTab === 'comentario' && (
                <Comentario onBack={() => setActiveTab('detail')} />
              )}

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

              {activeTab === 'profile' && currentUser && (
                <ProfileView user={currentUser} onLogout={handleLogout} onUpdateUser={updateUser} />
              )}

                          </>
          )}
        </div>
      </main>
      )}

      {activeTab !== "confirmar" && (
        <div className="bottom-menu">
          <div className={`menu-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); navigate('/'); }}>
            <i className="fas fa-home"></i>
            <span>Início</span>
          </div>

          <div className={`menu-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => { setActiveTab('all'); navigate('/'); }}>
            <i className="fas fa-th-list"></i>
            <span>Todos</span>
          </div>

          <div className={`menu-item ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => { setActiveTab('favorites'); navigate('/'); }}>
            <i className="fas fa-heart"></i>
            <span>Favoritos</span>
          </div>

          <div className={`menu-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => { setActiveTab('chat'); navigate('/'); }}>
            <i className="fas fa-comments"></i>
            <span>Chat</span>
          </div>

          <div className={`menu-item ${activeTab === 'company' ? 'active' : ''}`} onClick={() => { setActiveTab('company'); navigate('/'); }}>
            <i className="fas fa-info-circle"></i>
            <span>Sobre</span>
          </div>
        </div>
      )}

      {activeTab === 'company' && ( 
        <CompanyInfoView />
      )}
    </div>
  )
}



// O App exportado que envolve tudo com Router
export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}