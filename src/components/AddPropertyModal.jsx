import React from 'react'

// AddPropertyModal: modal para adicionar nova propriedade
// Comenta em PT-BR cada parte criada

export default function AddPropertyModal({ newProperty, setNewProperty, onSubmit, onClose }){
  // Função para atualizar campos do formulário
  const handle = (e) => {
    const { name, value } = e.target
    setNewProperty(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Adicionar Imóvel</h2>
          <button className="close-modal" onClick={onClose}><i className="fas fa-times"></i></button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input className="form-control" name="title" value={newProperty.title} onChange={handle} required />
          </div>

          <div className="form-group">
            <label>Endereço</label>
            <input className="form-control" name="address" value={newProperty.address} onChange={handle} required />
          </div>

          <div className="form-group">
            <label>Preço</label>
            <input className="form-control" name="price" value={newProperty.price} onChange={handle} />
          </div>

          <div style={{display:'flex',gap:10}}>
            <button className="btn btn-primary" type="submit">Adicionar</button>
            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
