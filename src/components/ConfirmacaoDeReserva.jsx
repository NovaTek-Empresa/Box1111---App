import React, { useEffect, useState } from 'react'
import Pagamento from './Pagamento'
import ReactInputMask from "react-input-mask";

export default function ConfirmacaoDeReserva() {
  const [etapa, setEtapa] = useState(1)

  // Estados dos hóspedes
  const [adultos, setAdultos] = useState(1)
  const [bebes, setBebes] = useState(0)
  const [pets, setPets] = useState(0)

  useEffect(() => {
    document.body.classList.add('page-sem-layout')
    return () => document.body.classList.remove('page-sem-layout')
  }, [])


  const acaoBotaoClose = {
    1: () => window.location.href = '/', 
    2: () => setEtapa(1)                
  }

 
  const progressoBarra = etapa === 1 ? '50%' : '100%'

  const alterarQuantidade = (tipo, operacao) => {
    const setters = { adultos: setAdultos, bebes: setBebes, pets: setPets }
    const valores = { adultos, bebes, pets }
    const min = tipo === 'adultos' ? 1 : 0
    
    if (operacao === '+' ) {
      setters[tipo](v => v + 1)
    } else if (valores[tipo] > min) {
      setters[tipo](v => v - 1)
    }
  }

  return (
    <div>
 
      <div className="card-reserva">
        <button className="close-conf" onClick={() => acaoBotaoClose[etapa]()}>
          <i className={etapa === 1 ? "fas fa-times" : "fas fa-arrow-left"}></i>
        </button>
        <h2 id="title-reserv">Confirmação de Reserva</h2>
        
        <div 
          className="conf-progress" 
          style={{ width: progressoBarra, transition: 'width 0.3s ease', }} 
        />
      </div>

      <div className="conf-page">
        {/* ================= Etapa 1 ================= */}
        {etapa === 1 && (
          <>
            <div className="card card-info">
              <span className="card-label">Sua Reserva</span>
              <div className="reserva-content">
                <div className="reserva-thumb">
                  <span className="badge">5 fotos</span>
                </div>
                <div className="reserva-info">
                  <h3 id="lugar-info">Pindamongaba</h3>
                  <p className="cidade-info">Xique-Xique, BA</p>
                  <p className="valor-info">R$ 4.000,00</p>
                  <span className="sub-info">Valor total da estadia</span>
                </div>
              </div>
            </div>

            <div className="card card-etapa1">
              <h3>Etapa 1: Datas e Hóspedes</h3>
              <div className="datas">
                <div className="campo">
                  <label>Check-in</label>
                  <ReactInputMask className="btn-date" type="text" placeholder="DD/MM/AAAA" mask="99/99/9999" maskChar="" />
                </div>
                <div className="campo">
                  <label>Check-out</label>
                  <ReactInputMask className="btn-date" type="text" placeholder="DD/MM/AAAA" mask="99/99/9999" maskChar="" />
                </div>
              </div>

              <p className="noites">5 noites (Simulado)</p>

              <div className="contador">
                <span>Total de Adultos</span>
                <div className="acoes">
                  <button onClick={() => alterarQuantidade('adultos', '-')}>−</button>
                  <strong>{adultos}</strong>
                  <button onClick={() => alterarQuantidade('adultos', '+')}>+</button>
                </div>
              </div>

              <div className="contador">
                <span>Crianças até 2 anos</span>
                <div className="acoes">
                  <button onClick={() => alterarQuantidade('bebes', '-')}>−</button>
                  <strong>{bebes}</strong>
                  <button onClick={() => alterarQuantidade('bebes', '+')}>+</button>
                </div>
              </div>

              <div className="contador">
                <span>Animais de estimação</span>
                <div className="acoes">
                  <button onClick={() => alterarQuantidade('pets', '-')}>−</button>
                  <strong>{pets}</strong>
                  <button onClick={() => alterarQuantidade('pets', '+')}>+</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= Etapa 2 ================= */}
        {etapa === 2 && <Pagamento />}

        <div className="card card-footer">
          <div className="total">
            <span className='tp'>Total a pagar:</span>
            <label>R$ 3.200,00</label>
            
            {/* Se estiver na etapa 1, mostra o botão de ir para o pagamento */}
            {etapa === 1 && (
              <button className="btn-confirmar" onClick={() => setEtapa(2)}>
                Continuar para Pagamento
              </button>
            )}

            {/* Se estiver na etapa 2 (Pagamento), mostra o botão de finalizar */}
            {etapa === 2 && (
              <button className="btn-confirmar" onClick={() => alert('Reserva Finalizada!')}>
                Confirmar Reserva
              </button>
            )}
          </div>


          <span className="etapa">
            Etapa {etapa} de 2
          </span>
        </div>
      </div>
    </div>
  )
}