import { useState, useEffect } from 'react'

interface Cliente {
  id: number
  nome: string
  nomeSocial: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  endereco: {
    rua: string
    numero: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
}

function EditarCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = () => {
    const dados = localStorage.getItem('clientesTitulares')
    if (dados) {
      setClientes(JSON.parse(dados))
    }
  }

  const handleSelecionar = (id: number) => {
    const cliente = clientes.find(c => c.id === id)
    if (cliente) {
      setClienteSelecionado({ ...cliente })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!clienteSelecionado) return

    try {
      const clientesAtualizados = clientes.map(c => 
        c.id === clienteSelecionado.id ? clienteSelecionado : c
      )

      localStorage.setItem('clientesTitulares', JSON.stringify(clientesAtualizados))
      setClientes(clientesAtualizados)

      alert('Cliente atualizado com sucesso!')
      setClienteSelecionado(null)
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      alert('Erro ao atualizar cliente!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Cliente</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o cliente
          </label>
          <select
            onChange={(e) => handleSelecionar(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">Escolha um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome} - CPF: {cliente.cpf}
              </option>
            ))}
          </select>
        </div>

        {clienteSelecionado && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={clienteSelecionado.nome}
                  onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, nome: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Social
                </label>
                <input
                  type="text"
                  value={clienteSelecionado.nomeSocial}
                  onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, nomeSocial: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Nascimento *
                </label>
                <input
                  type="date"
                  value={clienteSelecionado.dataNascimento}
                  onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, dataNascimento: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={clienteSelecionado.telefone}
                  onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, telefone: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={clienteSelecionado.email}
                  onChange={(e) => setClienteSelecionado({ ...clienteSelecionado, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Endereço</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.cep}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, cep: e.target.value } 
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.rua}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, rua: e.target.value } 
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.numero}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, numero: e.target.value } 
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.bairro}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, bairro: e.target.value } 
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.cidade}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, cidade: e.target.value } 
                    })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={clienteSelecionado.endereco.estado}
                    onChange={(e) => setClienteSelecionado({ 
                      ...clienteSelecionado, 
                      endereco: { ...clienteSelecionado.endereco, estado: e.target.value } 
                    })}
                    required
                    maxLength={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent uppercase"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Salvar Alterações
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EditarCliente