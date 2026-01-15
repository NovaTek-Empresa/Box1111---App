import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Comentario() {
  const navigate = useNavigate();

  const dadosProgresso = [
    { rotulo: "Excelente", valor: 80, cor: "#22c55e" },
    { rotulo: "Bom", valor: 65, cor: "#8BC34A" },
    { rotulo: "Médio", valor: 45, cor: "#CDDC39" },
    { rotulo: "Abaixo da média", valor: 30, cor: "#FFC107" },
    { rotulo: "Ruim", valor: 15, cor: "#F44336" },
  ];

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      navigate("/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <div className="tela-overlay-premium">
      {/* Elementos decorativos de fundo */}
      <div className="orbe-luz orbe-1"></div>
      <div className="orbe-luz orbe-2"></div>

      <nav className="navegacao-blur">
        <div className="nav-wrapper-premium">
          <div className="box-logo-animada">
            <span>BOX</span>
          </div>
          <div className="assessment-title">
            <h1 className="titulo-premium-gradiente">Reviews do Imóvel</h1>
          </div>
        </div>
      </nav>

      <div className="container-master">
        <button 
          className="botao-sair-clean" 
          onClick={() => {
            navigate("/");
            if (typeof window !== "undefined") {
              window.location.href = "/"; 
            }
          }}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Sair</span>
        </button>

        <section className="card-estatisticas-glass">
          <div className="header-nota-impacto">
            <div className="nota-div">
                <h1 className="nota-uau">4.0</h1>
            </div>
            <div className="estrelas-premium">
               <i className="fas fa-star"></i>
               <i className="fas fa-star"></i>
               <i className="fas fa-star"></i>
               <i className="fas fa-star"></i>
               <i className="far fa-star"></i>
            </div>
            <p className="subtexto-verificado">
              <i className="fas fa-check-circle"></i> baseado em 23 avaliações
            </p>
          </div>

          <div className="container-barras-modernas">
            {dadosProgresso.map((item, i) => (
              <div className="item-barra-status" key={i} style={{ "--delay": `${i * 0.15}s` }}>
                <span className="label-status">{item.rotulo}</span>
                <div className="trilho-moderno">
                  <div
                    className="preenchimento-brilhante"
                    style={{ width: `${item.valor}%`, backgroundColor: item.cor }}
                  />
                </div>
                <span className="porcentagem-viva">{item.valor}%</span>
              </div>
            ))}
          </div>
        </section>

        <div className="feed-comentarios-animado">
          <CardFeedbackPremium 
            nome="Matheus" 
            data="1 dia atrás" 
            nota={5} 
            mensagem="Este imóvel é excelente, superou minhas expectativas. A localização é perfeita e o atendimento foi nota 10." 
            foto="https://i.pravatar.cc/100?img=5"
            delay="0.6s"
          />
          <CardFeedbackPremium 
            nome="Caio Felipe" 
            data="4 dias atrás" 
            nota={4} 
            mensagem="Gostei muito do espaço, estava tudo limpo e organizado. Recomendo fortemente!" 
            foto="https://i.pravatar.cc/100?img=12"
            delay="0.8s"
          />
        </div>

        <div className="footer-acao">
          <button 
            className="botao-escrever-glow" 
            onClick={() => navigate('/assessment')}
          >
            Escrever uma Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}

function CardFeedbackPremium({ nome, data, nota, mensagem, foto, delay }) {
  return (
    <div className="card-feedback-premium" style={{ animationDelay: delay }}>
      <div className="header-card-usuario">
        <div className="avatar-wrapper">
          <img src={foto} alt={nome} className="avatar-premium" />
        </div>
        <div className="info-post-meta">
          <div className="nome-data-container">
            <strong className="nome-usuario">{nome}</strong>
            <span className="tag-data">{data}</span>
          </div>
          <div className="estrelas-pequenas-gold">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`${i < nota ? "fas" : "far"} fa-star`}></i>
            ))}
            <span className="digito-decimal"> {nota}.0</span>
          </div>
        </div>
      </div>
      <p className="corpo-texto-feedback">{mensagem}</p>
    </div>
  );
}