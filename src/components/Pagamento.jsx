import React, { useState } from "react";

export default function Pagamento() {
    const [forma, setForma] = useState(null);

    return (
        <div className="etapa2">
            <div className="titulo">
                <h2 id="titulo-pgt">Etapa 2: Dados e Pagamento</h2>
            </div>

            <div className="dados-hpd">
                <h2 id="dados-pgt">1. Dados do Hóspede Principal</h2>
                    <div className="class-name">
                        <label id="Nome-pgt">Nome</label>
                    </div>
                    <div className="class-card">
                        <input className="forma-cartao-btn" type="text" placeholder="Nome do Titular" />
                    </div>
                    <div className="class-sobrenome">
                        <label id="sobrenome">Sobrenome</label>
                    </div>
                    <div className="class-card">
                        <input className="forma-cartao-btn" type="text" placeholder="Sobrenome do Titular" />
                    </div>
                    <div className="class-forma">
                        <h2 id="forma-pgt">2. Forma de pagamento</h2>
                    </div>
                    <div className="class-text">
                        <h3 id="text-pgt">Escolha a forma de pagamento:</h3>
                    </div>

                <div className="btn-div">
                    <button
                        className={`btn-pgt ${forma === "cartao" ? "ativo" : ""}`}
                        onClick={() => setForma("cartao")}
                    >
                        Cartão
                    </button>

                    <button
                        className={`btn-pgt ${forma === "pix" ? "ativo" : ""}`}
                        onClick={() => setForma("pix")}
                    >
                        Pix
                    </button>

                    <button
                        className={`btn-pgt ${forma === "boleto" ? "ativo" : ""}`}
                        onClick={() => setForma("boleto")}
                    >
                        Boleto
                    </button>

                    <button
                        className={`btn-pgt ${forma === "dinheiro" ? "ativo" : ""}`}
                        onClick={() => setForma("dinheiro")}
                    >
                        Dinheiro
                    </button>
                </div>
            </div>

            {forma === "cartao" && (
                <div className="campos-cartao">
                    <div className="details">
                        <label className="details-card">Detalhes do Cartão</label>
                    </div>
                    <div className="number-card">
                        <label className="number-text">Número do Cartão</label>
                        <input className="forma-cartao-btn" type="text" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="nome-card">
                        <label className="form-name-text">Nome do Dono do Cartão</label>
                        <input className="forma-cartao-btn" type="text" placeholder="Conforme impresso no cartão" />
                    </div>
                    <div>
                        <div className="name-cartao"><label className="endereco-cob">Data de Validade (MM/AA)</label> <label className="cvv-text">CVV</label></div>
                        <input className="btn-date" type="date" placeholder="MM/AA" /> <input className="btn-cvv" type="password" placeholder="123" />
                    </div>
                    <div className="end-cob">
                        <label className="endereco-cob">Endereço de Cobrança</label>
                    </div>
                    <div className="name-cartao">
                        <label className="endereco-cob">Endereço Completo</label>
                        <input className="forma-cartao-btn" type="text" placeholder="Rua, Número, Bairro, Cidade - UF" />
                    </div>
                    <div className="confirmacao">
                        <label className="confirmacao-text">3. Confirmação</label>
                        <div className="check-box">
                            <input className="check-btn" type="checkbox" />
                            <label className="termos">Aceito os <a id="termos" href="#">termos e condições</a> e as políticas de cancelamento e regra do imovel</label>
                        </div>
                    </div>
                </div>
            )}

            {forma === "pix" && <p>Pagamento via Pix</p>}
            {forma === "boleto" && <p>Pagamento via Boleto</p>}
            {forma === "dinheiro" && <p>Pagamento em Dinheiro</p>}
        </div>
    );
}
