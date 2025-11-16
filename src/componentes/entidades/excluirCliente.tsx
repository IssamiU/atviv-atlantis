import { useState, useEffect } from 'react'

interface Cliente {
  id: number
  nome: string
  cpf: string
  tipo?: string
}

function ExcluirCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = () => {
    const todosClientes: Cliente[] = []

    const dadosTitulares = localStorage.getItem('clientesTitulares')
    if (dadosTitulares) {
      const titulares = JSON.parse(dadosTitulares)
      todosClientes.push(...titulares.map((c: Cliente) => ({...c, tipo: 'Titular'})))
    }
    
    const dadosDependentes = localStorage.getItem('clientesDependentes')
    if (dadosDependentes) {
      const dependentes = JSON.parse(dadosDependentes)
      todosClientes.push(...dependentes.map((c: Cliente) => ({ ...c, tipo: 'Dependente' })))
    }

    setClientes(todosClientes)
  }

  const handleExcluir = (id: number, tipo: string) => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cliente?')
    
    if (confirmar) {
      try {
        if (tipo === 'Titular') {
          const dadosTitulares = JSON.parse(localStorage.getItem('clientesTitulares') || '[]')
          const clientesAtualizados = dadosTitulares.filter((c: Cliente) => c.id !== id)
          localStorage.setItem('clientesTitulares', JSON.stringify(clientesAtualizados))
        } else {
          const dadosDependentes = JSON.parse(localStorage.getItem('clientesDependentes') || '[]')
          const clientesAtualizados = dadosDependentes.filter((c: Cliente) => c.id !== id)
          localStorage.setItem('clientesDependentes', JSON.stringify(clientesAtualizados))
        }
        
        carregarClientes()
        alert('Cliente excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir cliente:', error)
        alert('Erro ao excluir cliente!')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Excluir Cliente</h2>

        {clientes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum cliente cadastrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {clientes.map(cliente => (
              <div 
                key={cliente.id} 
                className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-semibold text-gray-900">{cliente.nome}</p>
                  <p className="text-sm text-gray-600">CPF: {cliente.cpf}</p>
                </div>
                <button
                  onClick={() => handleExcluir(cliente.id, cliente.tipo || '')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExcluirCliente