import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssessmentScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = () => {
    const novaAvaliacao = {
      id: Date.now(),
      nome: "Você",
      nota: rating,
      mensagem: comentario,
      data: "agora"
    };

    const avaliacoes =
      JSON.parse(localStorage.getItem("avaliacoes")) || [];

    localStorage.setItem(
      "avaliacoes",
      JSON.stringify([novaAvaliacao, ...avaliacoes])
    );

    setIsVisible(true);

    setTimeout(() => {
      navigate("/comentarios");
    }, 2000);
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => navigate("/");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <div className="assessment-overlay">
      <nav className="assessment-nav">
        <div className="logo-box3">
          <span>BOX</span>
        </div>
        <h1 className="assessment-title">Avaliação do Imóvel</h1>
      </nav>

      <div className="assessment-content">
        {/* BOTÃO SAIR */}
        <button
          className="assessment-back-btn"
          onClick={() => navigate("/comentarios")}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Sair</span>
        </button>

        <h1 className="assessment-subtitle">
          Como foi sua experiência conosco?
        </h1>

        <div className="assessment-group">
          <label>Sua nota:</label>
          <div className="assessment-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={rating >= star ? "fas fa-star" : "far fa-star"}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        <div className="assessment-group">
          <label>Comentário:</label>
          <textarea
            className="assessment-textarea"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="O que podemos melhorar ou o que você mais gostou?"
          />
        </div>

        <button
          className="assessment-submit-btn"
          disabled={rating === 0 || comentario.trim() === ""}
          onClick={handleSubmit}
          style={{
            opacity: rating === 0 || comentario.trim() === "" ? 0.5 : 1,
            cursor:
              rating === 0 || comentario.trim() === ""
                ? "not-allowed"
                : "pointer"
          }}
        >
          Enviar Avaliação
        </button>

        {isVisible && (
          <div className="assessment-message">
            Obrigado! Avaliação enviada ⭐
          </div>
        )}
      </div>
    </div>
  );
}
