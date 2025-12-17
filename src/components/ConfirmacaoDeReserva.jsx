import React from 'react'

export default function ConfirmacaoDeReserva(){
    return (
      <div className="conf-page">
        
      {/* Titulo */}
      <div className="conf-title">
        <h2>Confirmação de Reserva</h2>
        <div className="conf-progress"/>
     </div>

        {/* Info da Reserva */}
          <div className="card card-reserva">
            <span className="card-label">Sua Reserva</span>

            <div className="reserva-content">
              <div class="reserva-thumb">
                <span className="badge">5 fotos</span>
              </div>
              <div className="reserva-info">
                <h3>Pindamongaba</h3>
                <p className="cidade">Xique-Xique, BA</p>
                <p className="valor">R$4000,00</p>
               <span className="sub">Valor total da estadia</span> 
              </div>
            </div>


          {/* Etapa 1 */}
          <div className="card card-etapa1">
             <h3>Etapa 1: Datas e Hóspedes</h3>


          {/* Datas */}
          <div className="datas">
            <div className="campo">
              <label>Chekck-in</label>
              <input type="date"/>
            </div>

          <div className="campo">
            <label>Check-out</label>
            <input type="date"/>
          </div>
      </div>     
         <p className= "noites"> 5 noites (Simulado)</p>


        {/* Contadores */}
        <div className="contadores">
          <label>Hóspedes (Adultos)</label>
          <div className="controle">
            <button>-</button>
            <button className="plus">+</button>  
          </div>
        </div>
                <div className="contador">
          <label>Bebês (Opcional)</label>
          <div className="controle">
            <button>-</button>    
            <button className="plus">+</button>
          </div>
        </div>

        <div className="contador">
          <label>Pets (Opcional)</label>
          <div className="controle">
            <button>-</button>
            <button className="plus">+</button>
          </div>
        </div>


              {/* Footer */}
      <div className="conf-footer">
        <div className="total">
          <span>Total a pagar:</span>
          <strong>R$ 3.200,00</strong>
        </div>

        <button className="btn-confirmar">
          Continuar para Pagamento
        </button>

        <span className="etapa">Etapa 1 de 2</span>
      </div>
    </div>
  </div>
</div>
  )
}