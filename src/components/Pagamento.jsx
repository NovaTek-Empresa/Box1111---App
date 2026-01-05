import React, { useState } from "react";
import ReactInputMask from "react-input-mask";


export default function Pagamento() {
    const [forma, setForma] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState("cpf");
    const [documento, setDocumento] = useState("");
    const somenteNumeros = documento.replace(/\D/g, "");


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
                        <h3 id="text-pgt">Escolha a forma de pagamento e preencha os dados abaixo:</h3>
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
                        <ReactInputMask className="forma-cartao-btn" type="text" placeholder="0000 0000 0000 0000" mask="9999 9999 9999 9999" maskChar="" />
                    </div>
                    <div className="nome-card">
                        <label className="form-name-text">Nome do Dono do Cartão</label>
                        <input className="forma-cartao-btn" type="text" placeholder="Conforme impresso no cartão" />
                    </div>
                    <div className="div-cartao">
                        <div className="campo">
                            <label className="date-text">Data de Validade (MM/AA)</label>
                            <ReactInputMask className="btn-date" type="text" placeholder="MM/AA" mask="99/99" maskChar="" />
                        </div>
                        <div className="campo-cvv">
                            <div className="div-cvv">
                                <label className="cvv-text">CVV</label>
                            </div>
                            <ReactInputMask className="btn-cvv" type="text" placeholder="123" mask="999" maskChar="" maxLength={3} />
                        </div>
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

            {forma === "pix" && (
                <div className="campos-pix">
                    <div className="details">
                        <h3 className="details-card">Dados PIX</h3>
                        <div className="div-label-pix"><label className="details-pix">O PIX sera gerado no nome do titular abaixo.</label></div>
                    </div>
                    <div className="number-card">
                    <div className="linha-nomes">
                        <div>
                            <label className="text-px">Nome</label>
                            <input className="input-names" type="text" placeholder="Nome do titular" />
                        </div>

                        <div>
                            <label className="text-px">Sobrenome</label>
                            <input className="input-names2" type="text" placeholder="Sobrenome do Titular" />
                        </div>
                    </div>
                    </div>
                    <div className="nome-card">
                        <label className="form-name-text">Chave PIX (CPF/CNPJ, E-mail ou Telefone)</label>
                        <input className="forma-cartao-btn" type="text" placeholder="Ex: 000.000.000-00 ou email@exemplo.com" />
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


            {forma === "boleto" && (
                <div className="campos-pix">
                    <div className="details">
                        <h3 className="details-card">Dados para Boleto</h3>
                        <div className="div-label-pix">
                            <label className="details-pix">O Boleto será emitido para o seguinte nome e documento.</label>
                        </div>
                    </div>
                    <div className="number-card">
                    <div className="linha-nomes">
                        <div className="text-ll">
                            <label className="text-px">Nome Completo para Boleto</label>
                            <input className="input-boleto-name" type="text" placeholder="Nome Completo" />
                        </div>
                    </div>
                    </div>
                <div className="nome-card">
                    <label className="form-name-text">CPF/CNPJ para Boleto</label>
                    <div className="tipo-documento">
                        <div>
                            <button
                                type="button"
                                className={`btn-blt ${tipoDocumento === "cpf" ? "ativo" : ""}`}
                                onClick={() => {
                                    setTipoDocumento("cpf");
                                    setDocumento("");
                                }}
                            >
                                CPF
                            </button>
                        </div>
                            
                        <div className="div-blt1">
                        <button
                            type="button"
                            className={`btn-blt ${tipoDocumento === "cnpj" ? "ativo" : ""}`}
                            onClick={() => {
                                setTipoDocumento("cnpj");
                                setDocumento("");
                            }}
                        >
                            CNPJ
                        </button>
                        </div>
                    </div>

                    <ReactInputMask
                        className="forma-cartao-btn"
                        mask={tipoDocumento === "cpf" ? "999.999.999-99" : "99.999.999/9999-99"}
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        maskChar=""
                    >
                        {(props) => (
                            <input
                                {...props}
                                type="text"
                                placeholder={
                                    tipoDocumento === "cpf"
                                        ? "CPF: 000.000.000-00"
                                        : "CNPJ: 00.000.000/0000-00"
                                }
                            />
                        )}
                    </ReactInputMask>

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

            {forma === "dinheiro" && (
                <div className="campos-cartao">
                    <div className="details">
                        <h3 className="payment-text-h3">Pagamento em Dinheiro Físico</h3>

                    <div className="div-label-pix">
                        <label className="payment-text-label">
                            Atenção: Esta opção depende de confirmação e acordo direto com o vendedor/anfitrião.
                        </label>
                    </div>

                    <div className="mensagem-vendedor">
                            <label className="payment-text-label2">
                                Mensagem para o Vendedor (opcional)
                            </label>

                            <textarea
                                className="textarea-vendedor"
                                placeholder="Ex: Chegarei com o valor trocado. A que horas podemos fazer o acerto?"
                            />

                            <button className="btn-enviar-vendedor">
                                Enviar Mensagem para o Vendedor
                            </button>

                            <div className="confirmacao">
                                <label className="confirmacao-text">3. Confirmação</label>
                                <div className="check-box">
                                    <input className="check-btn" type="checkbox" />
                                    <label className="termos">Aceito os <a id="termos" href="#">termos e condições</a> e as políticas de cancelamento e regra do imovel</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
