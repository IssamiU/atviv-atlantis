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

function DeletarHospedagem() {
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

  const handleDeletar = (id: number) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta hospedagem?')
    
    if (confirmar) {
      try {
        const hospedagensAtualizadas = hospedagens.filter(h => h.id !== id)
        localStorage.setItem('hospedagens', JSON.stringify(hospedagensAtualizadas))
        setHospedagens(hospedagensAtualizadas)
        alert('Hospedagem excluída com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir hospedagem:', error)
        alert('Erro ao excluir hospedagem!')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Excluir Hospedagem</h2>

        {hospedagens.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhuma hospedagem cadastrada</p>
          </div>
        ) : (
          <div className="space-y-4">
            {hospedagens.map((hospedagem, index) => (
              <div 
                key={hospedagem.id} 
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Hospedagem #{index + 1}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Cliente:</span>
                        <span className="ml-2 text-gray-600">
                          {encontrarNomeCliente(hospedagem.idCliente)}
                        </span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700">CPF:</span>
                        <span className="ml-2 text-gray-600">
                          {encontrarCPFCliente(hospedagem.idCliente)}
                        </span>
                      </div>
                      
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-700">Acomodação:</span>
                        <span className="ml-2 text-purple-600 font-semibold">
                          {hospedagem.nomeAcomodacao}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeletar(hospedagem.id)}
                    className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DeletarHospedagem