import React from 'react'

export default function ConfirmacaoDeReserva(){
    return (
      <div className="conf-page">
        
      {/* Titulo */}
      <div className="conf-title">
        <h2 id="title-reserv">Confirmação de Reserva</h2>
        <div className="conf-progress"/>
     </div>

        {/* Info da Reserva */}
          <div className="card card-info">
            <span className="card-label">Sua Reserva</span>

            <div className="reserva-content">
              <div class="reserva-thumb">
                <span className="badge">5 fotos</span>
              </div>
              <div className="reserva-info">
                <h3 id="lugar-info">Pindamongaba</h3>
                <p className="cidade-info">Xique-Xique, BA</p>
                <p className="valor-info">R$4000,00</p>
               <span className="sub-info">Valor total da estadia</span> 
              </div>
            </div>


          {/* Etapa 1 */}
          <div className="card card-etapa1">
             <h3>Etapa 1: Datas e Hóspedes</h3>


          {/* Datas */}
          <div className="datas">
            <div className="campo">
              <label>Chekck-in</label>
              <input className="check-in" type="date"/>
            </div>

          <div className="campo">
            <label>Check-out</label>
            <input className="check-out"  type="date"/>
          </div>
      </div>     
         <p className= "noites"> 5 noites (Simulado)</p>


        {/* Contadores */}
        <div className="contadores">
          <label id="hóspedes">Hóspedes (Adultos)</label>
          <input id="total-adultos" type="text" placeholder="Total de Adultos"/>
          <button id="menos">-</button>
          <button id="mais">+</button>

          <label id="bebes">Bebês (Opcional)</label>
          <input id="total-bebes" type="text" placeholder="Crianças até 2 anos"/>
          <button id="menos">-</button>
          <button id="mais">+</button>

          <label id="pets">Pets (Opcional)</label>
          <input id="total-adultos" type="text" placeholder="Total de Adultos"/>
          <button id="menos">-</button>
          <button id="mais">+</button>
      </div>

              {/* Footer */}
      <div className="card card-footer">
        <div className="total">
          <span>Total a pagar:</span>
          <label id="valor-total">R$3.200,00</label>
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