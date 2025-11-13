import { useState, useEffect } from 'react'

interface Hospedagem {
  id: number
  idCliente: number
  nomeAcomodacao: string
}

interface Cliente {
  id: number
  nome: string
  cpf: string
}

function ListagemHospedagem() {
  const [hospedagens, setHospedagens] = useState<Hospedagem[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = () => {
    try {
      const dadosHospedagens = localStorage.getItem('hospedagens')
      if (dadosHospedagens) {
        setHospedagens(JSON.parse(dadosHospedagens))
      }

      const dadosClientes = localStorage.getItem('clientesTitulares')
      if (dadosClientes) {
        setClientes(JSON.parse(dadosClientes))
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const encontrarNomeCliente = (idCliente: number) => {
    const cliente = clientes.find(c => c.id === idCliente)
    return cliente ? cliente.nome : 'Cliente não encontrado'
  }

  const encontrarCPFCliente = (idCliente: number) => {
    const cliente = clientes.find(c => c.id === idCliente)
    return cliente ? cliente.cpf : 'N/A'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Hospedagens Registradas</h2>
      
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Total: <span className="font-semibold text-gray-900">{hospedagens.length}</span> hospedagens
        </p>
      </div>

      {hospedagens.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">Nenhuma hospedagem encontrada</p>
        </div>
      ) : (
        <div className="space-y-4">
          {hospedagens.map((hospedagem, index) => (
            <div 
              key={hospedagem.id} 
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900">Hospedagem #{index + 1}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Cliente</p>
                  <p className="text-gray-900 font-semibold">{encontrarNomeCliente(hospedagem.idCliente)}</p>
                  <p className="text-sm text-gray-600">CPF: {encontrarCPFCliente(hospedagem.idCliente)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Acomodação</p>
                  <p className="text-purple-600 font-bold text-lg">{hospedagem.nomeAcomodacao}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListagemHospedagem