import React, { useEffect } from 'react'

export default function ConfirmacaoDeReserva() {

  // 🔴 AO ENTRAR NA PÁGINA
  useEffect(() => {
    // adiciona uma classe no body para esconder header e footer
    document.body.classList.add('page-sem-layout')

    // 🔴 AO SAIR DA PÁGINA
    return () => {
      document.body.classList.remove('page-sem-layout')
    }
  }, [])

  return (
    <div className="conf-page"   >

      {/* Título */}
      <div className="conf-title">
        <h2 id="title-reserv">Confirmação de Reserva</h2>
        <div className="conf-progress" />
      </div>

      {/* Info da Reserva */}
      <div className="card card-info">
        <span className="card-label">Sua Reserva</span>

        <div className="reserva-content">
          <div className="reserva-thumb">
            <span className="badge">5 fotos</span>
          </div>

          <div className="reserva-info">
            <h3 id="lugar-info">Pindamongaba</h3>
            <p className="cidade-info">Xique-Xique, BA</p>
            <p className="valor-info">R$4000,00</p>
            <span className="sub-info">Valor total da estadia</span>
          </div>
        </div>
      </div>

      {/* Etapa 1 */}
      <div className="card card-etapa1">
        <h3>Etapa 1: Datas e Hóspedes</h3>

        {/* Datas */}
        <div className="datas">
          <div className="campo">
            <label>Check-in</label>
            <input type="date" />
          </div>

          <div className="campo">
            <label>Check-out</label>
            <input type="date" />
          </div>
        </div>

        <p className="noites">5 noites (Simulado)</p>

        {/* Contadores */}
        <div className="contadores">
          <label>Hóspedes (Adultos)</label>
          <input type="text" placeholder="Total de Adultos" />

          <label>Bebês (Opcional)</label>
          <input type="text" placeholder="Crianças até 2 anos" />

          <label>Pets (Opcional)</label>
          <input type="text" placeholder="Total de Pets" />
        </div>
      </div>

      {/* Rodapé da etapa (este continua, é interno da página) */}
      <div className="card card-footer">
        <div className="total">
          <span>Total a pagar:</span>
          <label>R$3.200,00</label>
        </div>

        <button className="btn-confirmar">
          Continuar para Pagamento
        </button>

        <span className="etapa">Etapa 1 de 2</span>
      </div>

    </div>
  )
}