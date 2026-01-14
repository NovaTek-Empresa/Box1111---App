import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AssessmentScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
      navigate("/");
    }, 2500);
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      navigate("/");
    };
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
        <button 
          className="assessment-back-btn" 
          onClick={() => navigate("/")}
        >
          <i className="fas fa-arrow-left"></i>
          <span>Sair</span>
        </button>

        <header>
          <h1 className="assessment-subtitle">Como foi sua experiência conosco?</h1>
        </header>

        <main>
          <div className="assessment-group">
            <label className="assessment-label">Sua nota:</label>
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
            <label className="assessment-label">Comentário:</label>
            <textarea
              placeholder="O que podemos melhorar ou o que você mais gostou?"
              className="assessment-textarea"
            />
          </div>

          <button
            className="assessment-submit-btn"
            onClick={handleSubmit}
            disabled={rating === 0}
            style={{ 
              opacity: rating === 0 ? 0.5 : 1,
              cursor: rating === 0 ? "not-allowed" : "pointer" 
            }}
          >
            Enviar Avaliação
          </button>

          {isVisible && (
            <div className="assessment-message">
              <span>Obrigado! Avaliação enviada. ⭐</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}