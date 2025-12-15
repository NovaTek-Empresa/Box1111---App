import React from "react";
import { useState } from "react";

export default function Pagamento() {
    const [forma, setForma] = useState(null);
    return (
        <div className="etapa2">
            <div className="titulo">
                <h2 id="titulo-pgt">Etapa 2: Dados e Pagamento</h2>
            </div>
            <div class-name='dados-hpd'>
                <div className="dados-text">
                    <h2 id="dados-pgt">1. Dados do Hóspede Principal</h2>
                </div>
                <label id="Nome-pgt">Nome</label>
                <div className="input-name">                
                    <input className="input-pgt" type="text" placeholder="Nome do Titular" />
                </div>
                <label id="Nome-pgt">Sobrenome</label>
                <div className="input-name">                
                    <input className="input-pgt" type="text" placeholder="Sobrenome do Titular" />
                </div>
                <div className="forma-text">
                    <h2 id="forma-pgt">2. Forma de pagamento</h2>
                    <h3 id="text-pgt">Escolha a forma de pagamento e preencha os dados abaixo:</h3>
                </div>
                <div className="btn-div">
                    <button className="btn-pgt" onClick={() => setForma("cartao")}>Cartão</button>
                    <button className="btn-pgt">Pix</button>
                    <button className="btn-pgt">Boleto</button>
                    <button className="btn-pgt">Dinheiro</button>
                </div>    
            </div>
            {forma === "cartao" && (
                <div className="campos-cartao">
                    <input type="text" placeholder="Nome no cartão" />
                    <input type="text" placeholder="Número do cartão" />
                </div>
            )}
        </div>

    )
}