import { useState, useEffect } from 'react'

interface ClienteDependente {
  id: number
  idTitular: number
  nome: string
  nomeSocial: string
  dataNascimento: string
  cpf: string
  telefone: string
}

interface ClienteTitular {
  id: number
  nome: string
  cpf: string
}

function CadastroClienteDependente() {
  const [dependente, setDependente] = useState<ClienteDependente>({
    id: Date.now(),
    idTitular: 0,
    nome: '',
    nomeSocial: '',
    dataNascimento: '',
    cpf: '',
    telefone: ''
  })

  const [titulares, setTitulares] = useState<ClienteTitular[]>([])

  useEffect(() => {
    carregarTitulares()
  }, [])

  const carregarTitulares = () => {
    const dados = localStorage.getItem('clientesTitulares')
    if (dados) {
      setTitulares(JSON.parse(dados))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const dependentesExistentes = JSON.parse(localStorage.getItem('clientesDependentes') || '[]')
      dependentesExistentes.push(dependente)
      localStorage.setItem('clientesDependentes', JSON.stringify(dependentesExistentes))

      console.log('Dependente cadastrado:', dependente)
      alert('Cliente dependente cadastrado com sucesso!')

      setDependente({
        id: Date.now(),
        idTitular: 0,
        nome: '',
        nomeSocial: '',
        dataNascimento: '',
        cpf: '',
        telefone: ''
      })
    } catch (error) {
      console.error('Erro ao cadastrar dependente:', error)
      alert('Erro ao cadastrar dependente!')
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cadastro de Cliente Dependente</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente Titular *
            </label>
            <select
              value={dependente.idTitular}
              onChange={(e) => setDependente({ ...dependente, idTitular: Number(e.target.value) })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={0}>Selecione o titular</option>
              {titulares.map(titular => (
                <option key={titular.id} value={titular.id}>
                  {titular.nome} - CPF: {titular.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                value={dependente.nome}
                onChange={(e) => setDependente({ ...dependente, nome: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Social
              </label>
              <input
                type="text"
                value={dependente.nomeSocial}
                onChange={(e) => setDependente({ ...dependente, nomeSocial: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento *
              </label>
              <input
                type="date"
                value={dependente.dataNascimento}
                onChange={(e) => setDependente({ ...dependente, dataNascimento: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF *
              </label>
              <input
                type="text"
                value={dependente.cpf}
                onChange={(e) => setDependente({ ...dependente, cpf: e.target.value })}
                required
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                value={dependente.telefone}
                onChange={(e) => setDependente({ ...dependente, telefone: e.target.value })}
                required
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Cadastrar Dependente
          </button>
        </form>
      </div>
    </div>
  )
}

export default CadastroClienteDependente